# Unit-Tests mit Vitest

## Dateien

- `src/shared/date-utils.test.ts` (anlegen)

## Aufgabe

Schreibe Unit-Tests für die Funktion `getDaysUntilWatering` aus `src/shared/date-utils.ts`.

Die Funktion berechnet, wie viele Tage bis zum nächsten Gießen verbleiben:
- Parameter: `lastWatered` (Datum im Format `YYYY-MM-DD`) und `wateringInterval` (Intervall in Tagen)
- Rückgabe: positive Zahl = noch Zeit, negative Zahl = überfällig

**Herausforderung:** Die Funktion berechnet intern den heutigen Tag mit `new Date()`. Ein Test
darf nicht davon abhängen, wann er ausgeführt wird – du musst die Systemzeit mocken.

Erstelle mindestens zwei Testfälle:
1. Gießen steht noch aus → positiver Rückgabewert
2. Gießen ist überfällig → negativer Rückgabewert

## Material

- Vitest Dokumentation: https://vitest.dev/
- `vi.useFakeTimers` / `vi.setSystemTime`: https://vitest.dev/api/vi.html#vi-setsystemtime
- `afterEach` (Aufräumen nach jedem Test): https://vitest.dev/api/#aftereach

## Tests ausführen

```bash
npm run test:unit
```
