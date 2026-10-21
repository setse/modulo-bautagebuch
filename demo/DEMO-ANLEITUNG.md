# Modulo · Umfangreiche Demo-Daten

Alle Projekte, Firmen, Arbeiten und Illustrationen sind fiktiv. Referenzdatum: **2026-10-08**.

## Laden in die bestehende App

1. Modulo v0.8.0 oder neuer öffnen.
2. **Einstellungen → Daten & Sicherung → Sicherung importieren**.
3. **Modulo-Demo-Daten.zip** auswählen.
4. Im Projektwähler **DEMO-2601** öffnen und **Bauzeitenplaner** wählen.

Die vier Demo-Projekte werden zusätzlich angelegt. Bestehende Projekte werden nicht ersetzt. Importierte IDs werden neu vergeben. Ein erneuter Import legt weitere Kopien an. Für einzelne Importtests die ZIP zusätzlich in einen eigenen Ordner entpacken: **import-tests/**, **csv/** und **source-media/** sind enthalten. ZIP-Import übernimmt die vorhandenen App-Einstellungen; die Demo aktiviert keine automatische Transkription beim Import.

## Umfang

- 1005 Vorgänge, 67 Gewerke und 81 Firmen.
- 100 Bautagebucheinträge: Entwürfe, fertige Berichte, Mehrtageszeiträume und Jahreswechsel.
- 318 synthetische Testbilder in verschiedenen Seitenverhältnissen und Abschnitten.
- 25 Audio-Anlagen: MP3, WAV, M4A, OGG, WEBM, FLAC; langer MP3-Testclip; zusätzlich Stille.
- 6 feste Sollpläne, Änderungsverläufe und 3 Kopf-/Fußzeilenvorlagen.

- **DEMO-2601** — DEMO · Campus West – Sanierung in 12 Bauabschnitten: 309 Vorgänge / 60 Einträge.
- **DEMO-2602** — DEMO · Kita Sonnenhof – Umbau im laufenden Betrieb: 96 Vorgänge / 24 Einträge.
- **DEMO-2603** — DEMO · Quartier Süd – Lasttest mit 600 Vorgängen: 600 Vorgänge / 15 Einträge.
- **DEMO-2604** — DEMO · Leeres Startprojekt: 0 Vorgänge / 1 Einträge.

## Gezielt testen

1. Im Campus-Terminplan nach **TEST** suchen. Freitag-Übergabe verschieben: Änderungen der Nachfolger prüfen, übernehmen, anschließend Rückgängig.
2. **Fixtermin** suchen: der widersprüchliche Vorgänger erzeugt einen Hinweis, der fixierte Start bleibt bestehen.
3. **Trocknung** suchen: Wartezeit zählt ausdrücklich 7 Kalendertage.
4. **Freigabe noch offen** / **ohne terminierte Freigabe** suchen: Vorgänge bleiben ohne erfundenes Datum.
5. **Zieltermin** suchen: Terminüberschreitung erscheint als Hinweis.
6. **Paralleler Einsatz**: gleiche Firma darf überlappend arbeiten. Keine angenommene Kapazitätswarnung.
7. Sollplan 01/02 vergleichen, Gewerk/Bereich filtern, 3-/6-Wochen-Vorschau und Tag/Woche/Monat wechseln.
8. In DEMO-2602 den Samstag-Arbeitskalender prüfen; in DEMO-2603 Suche/Scrollen/Export mit 600 Vorgängen testen.
9. Im Bautagebuch **Fotoreicher Prüfbericht** öffnen. Bilder in mehreren Abschnitten, Hoch-/Querformat, manuelle Fotoseiten, lange Bildunterschriften sowie Kopf-/Fußzeilen prüfen.
10. An der Sprachnotiz Transkription starten; Stille soll ohne erfundenen Text enden. Ein manuell ergänztes Transkript testet die Ersatzprüfung und Originalwiederherstellung. Qwen kann den negativen/zukünftigen Text zur Prüfung gliedern.
11. **import-tests/Foto-gross-3200x2400.png** als neues Foto hinzufügen: Kompression und UI-Reaktionszeit testen.
12. Die gültige und ungültige CSV in **import-tests/** vergleichen. Ungültige Daten/Dauern/Einheiten/Prozente müssen den Import verhindern. Exportierte Listen liegen in **csv/**.
13. PDF-A3/A4, ausgewählte Bautagebucheinträge als PDF/Word, Sicherung und erneuten Import prüfen. Demo-Projekte danach über Projektdaten löschen.

Die Bilddateien sind beschriftete Illustrationen, keine realen Baustellenfotos. Die Sprachdateien basieren auf einer vorhandenen synthetischen deutschen TTS-Testaufnahme; Formate und langer Clip enthalten denselben Text. Manuelle Textzusätze sind gekennzeichnet. Es werden keine tatsächlich ausgeführten Parakeet-/Qwen-Läufe behauptet.

## Neu erzeugen

**npm run demo -- --anchor 2026-10-08** (Standard: heutiges lokales Datum).
**--seed eigener-name** erzeugt andere reproduzierbare IDs. **--output pfad** wählt einen Ausgabeordner. Vorhandene Demo-Ausgabedateien werden neu geschrieben; normale App-Daten werden nicht angefasst. Die Entwicklungsversion benötigt Playwright/Chromium; zusätzliche Audioformate werden mit dem bereits vorhandenen FFmpeg erzeugt.

**data/** ist eine isolierte Datenkopie für automatisierte Tests mit MODULO_TEST_DATA. Der normale Weg zum Testen in der sichtbaren App ist der ZIP-Import.
