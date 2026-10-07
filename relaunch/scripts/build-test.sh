#!/bin/sh
# Testversion für eine Subdomain bei Hostinger (z. B. test.np-webdesign.de) bauen und als ZIP packen.
# Die Live-Seite wird nicht angefasst: Ausgabe in dist-test und deploy/np-webdesign-test.zip.
#
# Aufruf:   sh scripts/build-test.sh [Benutzername]
# Passwort: wird zufällig erzeugt und am Ende angezeigt (oder vorher setzen: NP_TEST_PASSWORD=... sh scripts/build-test.sh)
# Hostinger-Pfad für den Passwortschutz: NP_TEST_PATH=/home/u123456789/domains/np-webdesign.de/public_html/test
set -e
cd "$(dirname "$0")/.."
USER_NAME="${1:-np-test}"
PASSWORD="${NP_TEST_PASSWORD:-$(openssl rand -base64 18 | tr -d '/+=' | cut -c1-16)}"
AUTH_PATH="${NP_TEST_PATH:-/home/uXXXXXXXXX/domains/np-webdesign.de/public_html/test}"

rm -rf dist-test
NP_TEST=1 npx astro build

# Suchmaschinen: robots.txt sperrt alles, die Sitemap der Live-Seite gehört nicht in die Testversion
printf 'User-agent: *\nDisallow: /\n' > dist-test/robots.txt
rm -f dist-test/sitemap.xml

# .htaccess: die normalen Einstellungen plus Passwortschutz und X-Robots-Tag (nur Testversion)
{
  cat public/.htaccess
  cat <<HT

# ===== NUR TESTVERSION: Passwortschutz und noindex =====
<IfModule mod_headers.c>
  Header always set X-Robots-Tag "noindex, nofollow, noarchive, nosnippet"
</IfModule>
AuthType Basic
AuthName "NP Webdesign Testversion"
# ACHTUNG: Pfad an dein Hosting anpassen (Ordner dieser Datei + /.htpasswd), siehe LIESMICH
AuthUserFile ${AUTH_PATH}/.htpasswd
Require valid-user
# ===== ENDE TESTVERSION =====
HT
} > dist-test/.htaccess

# .htpasswd (Apache-MD5, von Hostinger unterstützt)
printf '%s:%s\n' "$USER_NAME" "$(openssl passwd -apr1 "$PASSWORD")" > dist-test/.htpasswd

cp docs/testversion-hostinger.md dist-test/LIESMICH-TESTVERSION.md 2>/dev/null || true

mkdir -p deploy
rm -f deploy/np-webdesign-test.zip
( cd dist-test && zip -qr -X ../deploy/np-webdesign-test.zip . -x "*.gitkeep" )

echo
echo "Fertig: deploy/np-webdesign-test.zip"
echo "Benutzername: $USER_NAME"
echo "Passwort:     $PASSWORD"
