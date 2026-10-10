<?php
declare(strict_types=1);
/*
 * Formular-Endpunkt (Blueprint N, Q2): nimmt die Anfrage entgegen und stellt sie als E-Mail zu.
 * Keine Datenbank, kein Drittdienst, kein Formularinhalt in Logs, keine Speicherung von IP-Adressen.
 * Schutz: Honeypot, serverseitige Prüfung, Mengenbegrenzung über die Gesamtzahl pro Stunde (ohne Personenbezug).
 * Versand: standardmäßig über mail() des Hosters, optional über ein SMTP-Postfach (config.php, Eintrag „smtp“).
 * Zugangsdaten und Adressen: nur in config.php neben dieser Datei (siehe config.sample.php), nie im Repository.
 */

const MAX_PER_HOUR = 10;

$cfg = ['to' => 'kontakt@np-webdesign.de', 'from' => 'kontakt@np-webdesign.de', 'subject' => 'Anfrage über np-webdesign.de'];
if (is_file(__DIR__ . '/config.php')) {
    $extra = require __DIR__ . '/config.php';
    if (is_array($extra)) {
        $cfg = array_merge($cfg, $extra);
    }
}

header('Cache-Control: no-store');
header('X-Robots-Tag: noindex');
header('X-Content-Type-Options: nosniff');

$json = str_contains($_SERVER['HTTP_ACCEPT'] ?? '', 'application/json');

/** Antwort: JSON für das Skript, sonst Rücksprung auf die Seite (ohne JavaScript zeigt :target die Meldung) */
function finish(bool $ok, string $code, bool $json, int $status = 200): never
{
    if ($json) {
        http_response_code($status);
        header('Content-Type: application/json; charset=utf-8');
        echo json_encode(['ok' => $ok, 'code' => $code]);
        exit;
    }
    header('Location: /#' . ($ok ? 'anfrage-erhalten' : 'anfrage-fehler'), true, 303);
    exit;
}

/**
 * Versand über einen SMTP-Server mit Anmeldung (z. B. das Postfach beim E-Mail-Anbieter): STARTTLS (Port 587) oder SSL (465).
 * Zugangsdaten stehen nur in config.php auf dem Server. Gibt bei Fehlern false zurück, ohne Inhalte zu protokollieren.
 */
function smtp_send(array $c, string $from, string $to, string $subject, array $headers, string $body): bool
{
    $secure = $c['secure'] ?? 'tls';
    $port = (int) ($c['port'] ?? ($secure === 'ssl' ? 465 : 587));
    $ssl = ['verify_peer' => true, 'verify_peer_name' => true];
    if (!empty($c['cafile'])) {
        $ssl['cafile'] = $c['cafile']; // nur für Tests mit eigenem Zertifikat
    }
    $fp = @stream_socket_client(($secure === 'ssl' ? 'ssl://' : 'tcp://') . ($c['host'] ?? '') . ':' . $port, $errno, $errstr, 10, STREAM_CLIENT_CONNECT, stream_context_create(['ssl' => $ssl]));
    if ($fp === false) {
        return false;
    }
    stream_set_timeout($fp, 15);
    $read = static function () use ($fp): array {
        $text = '';
        while (($line = fgets($fp, 1024)) !== false) {
            $text .= $line;
            if (strlen($line) < 4 || $line[3] === ' ') {
                break;
            }
        }
        return [(int) substr($text, 0, 3), $text];
    };
    $cmd = static function (string $line, int $ok) use ($fp, $read): bool {
        fwrite($fp, $line . "\r\n");
        [$code] = $read();
        return $code === $ok;
    };
    $host = preg_replace('/[^a-z0-9.-]/i', '', substr(strrchr($from, '@') ?: '@localhost', 1)) ?: 'localhost';
    $done = false;
    do {
        if ($read()[0] !== 220) {
            break;
        }
        if (!$cmd('EHLO ' . $host, 250)) {
            break;
        }
        if ($secure === 'tls') {
            if (!$cmd('STARTTLS', 220) || !stream_socket_enable_crypto($fp, true, STREAM_CRYPTO_METHOD_TLS_CLIENT)) {
                break;
            }
            if (!$cmd('EHLO ' . $host, 250)) {
                break;
            }
        }
        if (!empty($c['user'])) {
            if (!$cmd('AUTH LOGIN', 334) || !$cmd(base64_encode((string) $c['user']), 334) || !$cmd(base64_encode((string) ($c['pass'] ?? '')), 235)) {
                break;
            }
        }
        if (!$cmd('MAIL FROM:<' . $from . '>', 250) || !$cmd('RCPT TO:<' . $to . '>', 250) || !$cmd('DATA', 354)) {
            break;
        }
        $head = array_merge(['To: ' . $to, 'Subject: ' . $subject, 'Date: ' . date('r'), 'Message-ID: <' . bin2hex(random_bytes(8)) . '@' . $host . '>'], $headers);
        $msg = implode("\r\n", $head) . "\r\n\r\n" . preg_replace('/\r\n|\r|\n/', "\r\n", $body);
        $msg = preg_replace('/^\./m', '..', $msg); // Punkt am Zeilenanfang verdoppeln
        $done = $cmd($msg . "\r\n.", 250);
    } while (false);
    @fwrite($fp, "QUIT\r\n");
    fclose($fp);
    return $done;
}

/** Eingabe säubern: Steuerzeichen raus, Zeilenumbrüche nur im Nachrichtentext erlaubt */
function clean(mixed $v, int $max, bool $multiline = false): string
{
    $s = is_string($v) ? trim($v) : '';
    $s = preg_replace($multiline ? '/[^\P{C}\n]/u' : '/\p{C}/u', '', str_replace("\r\n", "\n", $s)) ?? '';
    return mb_substr($s, 0, $max);
}

if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
    http_response_code(405);
    header('Allow: POST');
    exit;
}

// Anfragen nur von der eigenen Seite
$origin = $_SERVER['HTTP_ORIGIN'] ?? '';
$ownHost = strtolower(explode(':', $_SERVER['HTTP_HOST'] ?? '')[0]);
if ($origin !== '' && strtolower((string) parse_url($origin, PHP_URL_HOST)) !== $ownHost) {
    finish(false, 'origin', $json, 403);
}

// Honeypot: Menschen sehen das Feld nicht. Bots bekommen scheinbar Erfolg, es wird nichts gesendet.
if (clean($_POST['website'] ?? '', 200) !== '') {
    finish(true, 'ok', $json);
}

$name = clean($_POST['name'] ?? '', 100);
$company = clean($_POST['unternehmen'] ?? '', 120);
$email = clean($_POST['email'] ?? '', 200);
$phone = clean($_POST['telefon'] ?? '', 40);
$topic = clean($_POST['anliegen'] ?? '', 40);
$message = clean($_POST['nachricht'] ?? '', 4000, true);

if (!in_array($topic, ['', 'Neue Website', 'Relaunch', 'Noch unsicher'], true)) {
    $topic = '';
}
if ($name === '' || mb_strlen($message) < 10 || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
    finish(false, 'invalid', $json, 422);
}

// Linkflut ist Spam: stilles „Erfolg“
if (preg_match_all('~https?://|www\.~i', $message . ' ' . $company) > 2) {
    finish(true, 'ok', $json);
}

// Mengenbegrenzung: nur Zeitstempel, keine IP-Adressen, keine Inhalte
$rateFile = sys_get_temp_dir() . '/np-kontakt-rate.json';
$fh = @fopen($rateFile, 'c+');
if ($fh !== false && flock($fh, LOCK_EX)) {
    $now = time();
    $stamps = json_decode((string) stream_get_contents($fh), true);
    $stamps = array_values(array_filter(is_array($stamps) ? $stamps : [], static fn ($t) => is_int($t) && $t > $now - 3600));
    if (count($stamps) >= MAX_PER_HOUR) {
        flock($fh, LOCK_UN);
        fclose($fh);
        finish(false, 'rate', $json, 429);
    }
    $stamps[] = $now;
    ftruncate($fh, 0);
    rewind($fh);
    fwrite($fh, json_encode($stamps));
    flock($fh, LOCK_UN);
    fclose($fh);
}

$lines = [
    'Neue Anfrage über np-webdesign.de',
    '',
    'Name:        ' . $name,
    'Unternehmen: ' . ($company !== '' ? $company : '–'),
    'E-Mail:      ' . $email,
    'Telefon:     ' . ($phone !== '' ? $phone : '–'),
    'Anliegen:    ' . ($topic !== '' ? $topic : '–'),
    '',
    $message,
    '',
    '— Gesendet über das Kontaktformular. Antworten geht direkt an die E-Mail-Adresse des Absenders.',
];
$headers = [
    'From: NP Webdesign <' . $cfg['from'] . '>',
    'Reply-To: ' . $email,
    'MIME-Version: 1.0',
    'Content-Type: text/plain; charset=UTF-8',
    'Content-Transfer-Encoding: 8bit',
];
$subject = '=?UTF-8?B?' . base64_encode($cfg['subject'] . ' – ' . $name) . '?=';

$sent = false;
if (is_array($cfg['smtp'] ?? null)) {
    $sent = smtp_send($cfg['smtp'], $cfg['from'], $cfg['to'], $subject, $headers, implode("\n", $lines));
} else {
    $sent = mail($cfg['to'], $subject, implode("\n", $lines), implode("\r\n", $headers), '-f' . $cfg['from']);
}
if (!$sent) {
    error_log('kontakt: Versand fehlgeschlagen'); // ohne Inhalt
    finish(false, 'mail', $json, 502);
}
finish(true, 'ok', $json);
