# Architektur – Feature-basierte Struktur

## Dateien

- `src/plant-list/` (neuer Ordner)
- `src/plant-form/` (neuer Ordner)
- `src/shared/` (neuer Ordner)
- `src/App.tsx` (verschoben aus `src/components/`)
- `eslint.config.js`

## Aufgabe

Bisher liegen alle Dateien flach in `src/components/`. Bei wachsenden Projekten wird das schnell unübersichtlich – und es ist nicht erkennbar, welche Dateien zusammengehören oder welche Abhängigkeiten zwischen Bereichen erlaubt sind.

Ziel: Die App in **Feature-Ordner** aufteilen und mit `eslint-plugin-boundaries` sicherstellen, dass Features nicht voneinander abhängen.

## Vorbereitung

- In der `eslint.config.js` gibt es eine Einstellung, die sicherstellt, dass `import`-Angaben am Anfang einer Datei sortiert hingeschrieben werden.
- Das ist im echten Leben hilfreich, um z.B. unbenutzte Importe zu erkennen und "falsche" Diffs zu vermeiden
- Für unsere Übung hier ist das aber eher hinderlich, deswegen kannst du das `import`-Plugin von ESLint **deaktivieren**
  - In `eslint.config.js` `enableImportRules` auf `false` setzen (Zeile 13)

## Schritte

### 1. Ordnerstruktur anlegen

Erstelle folgende Ordner unterhalb von `src/`:

```
src/
  plant-list/    # alles rund um die Pflanzenliste
  plant-form/    # alles rund um das Formular
  shared/        # wirklich geteilte Komponenten und Utilities
```

Verschiebe die Dateien in die passenden Ordner. `App.tsx` bleibt direkt in `src/` – sie ist die Kompositions-Schicht, die beide Features zusammensetzt.

### 2. Import-Pfade anpassen

Passe alle relativen Imports an die neue Ordnerstruktur an. `npm run check:ts` hilft, fehlende Importe zu finden.

### 3. `eslint-plugin-boundaries` konfigurieren

Erweitere `eslint.config.js` um `eslint-plugin-boundaries`. Definiere die drei Element-Typen und lege fest:

- `plant-list` darf aus `plant-list` und `shared` importieren
- `plant-form` darf aus `plant-form` und `shared` importieren
- `shared` darf nur aus `shared` importieren
- In der Konfigurationsdatei findest du bereits entsprechenden TODOs

### 4. Regeln überprüfen

Um deine Regeln zu überprüfen, kannst du `eslint` ausführen. Dazu `npm run lint` im `workspace`-Verzeichnis ausführen
- Je nach Art und Konfiguration deiner IDE werden die Fehler auch dort schon angezeigt

### 4. Boundary-Verletzung provozieren

Füge temporär einen Import von `plant-list` in `plant-form` ein z.B. `import { plantsQueryOptions } from "../plant-list/plantsQueryOptions"` in `PlantForm.tsx`. Was passiert beim Lint?

## Material

- eslint-plugin-boundaries: https://github.com/javierbrea/eslint-plugin-boundaries

## Alternativen

- https://github.com/ts-arch/ts-arch
  - Kann Regeln definieren
  - und im Test überprüfen (analog zu ArchUnit in java)
- https://github.com/sverweij/dependency-cruiser
  - Kann auch Abhängigkeiten visualisieren
