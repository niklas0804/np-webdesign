<?php
/* Optional. Bevorzugt als np-config.php EINEN Ordner ÜBER public_html ablegen (außerhalb des Web-Ordners, übersteht jedes Neuladen); alternativ als config.php neben kontakt.php. Nie ins Repository. */
return [
    'to' => 'kontakt@np-webdesign.de',   // Postfach, in dem die Anfragen ankommen
    'from' => 'kontakt@np-webdesign.de', // Absender: muss zu einem Postfach der eigenen Domain gehören (Zustellbarkeit)

    // Empfohlen, wenn das Postfach bei einem anderen Anbieter liegt als die Website (hier: IONOS):
    // Versand über das Postfach selbst, dann passen SPF und Absender zusammen. Host und Port laut Hilfe des Anbieters prüfen.
    // 'smtp' => [
    //     'host' => 'smtp.ionos.de',
    //     'port' => 587,          // 587 = STARTTLS (secure 'tls'), 465 = SSL (secure 'ssl')
    //     'secure' => 'tls',
    //     'user' => 'kontakt@np-webdesign.de',
    //     'pass' => 'Passwort des Postfachs',
    // ],
];
