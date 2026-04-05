# Komponenten-Tests mit Vitest Browser Mode

## Dateien

- `src/plant-form/IntervalSelector.browsertest.tsx` (anlegen)

## Aufgabe

Schreibe Tests für die `IntervalSelector`-Komponente mit Vitest Browser Mode.

`IntervalSelector` ist eine [controlled component](https://react.dev/learn/sharing-state-between-components#controlled-and-uncontrolled-components):
Sie verwaltet keinen eigenen State, sondern erhält den aktuellen Wert über `interval` und
meldet Änderungen über `onIntervalChange` zurück.

Deine Tests sollen prüfen:
1. Wenn der Nutzer eine Zahl ins Eingabefeld tippt, wird `onIntervalChange` mit dem neuen Wert aufgerufen
2. Wenn der Nutzer auf einen Schnellwahl-Button klickt ("Weekly", "Biweekly", ...), wird `onIntervalChange` mit dem entsprechenden Wert aufgerufen

- Für das `onIntervalChange`-Property musst du im Test eine Mock-Funktion angeben, damit du im Test prüfen kannst, ob und mit welchen Argumenten sie aufgerufen wurde.
- Suche Elemente im DOM nach **ARIA-Rollen und sichtbarem Text** – nicht nach `data-testid`.
- Achte in den Tests darauf, dass `render` und `expect` asynchrone Funktionen sind. Du musst also mit `await` warten, bis sie abgeschlossen sind.

## Material

- `vi.fn()` für Mock-Funktionen: https://vitest.dev/api/vi.html#vi-fn
- Vitest Browser Mode: https://vitest.dev/guide/browser/
- `vitest-browser-react` (render, Queries): https://github.com/vitest-dev/vitest-browser-react
- `expect.element()`: https://vitest.dev/guide/browser/assertion-api
- Locators / Queries: https://vitest.dev/guide/browser/locators
    - Nach einem Button kannst du mit der aria-role `button` suchen: https://vitest.dev/api/browser/locators.html#getbyrole
    - getByLabelText: https://vitest.dev/api/browser/locators.html#getbylabeltext

## Tests ausführen

```bash
npm run test
```

- Wenn du die Tests ausführst, wird ein Browser (Chromium) geöffnet, in dem der Test ausgeführt wird
- Wenn du Änderungen am Source-Code machst, wird der Test automatisch neu ausgeführt
- Mit Ctrl+C im Terminal kannst du die Ausführung beenden
- 
