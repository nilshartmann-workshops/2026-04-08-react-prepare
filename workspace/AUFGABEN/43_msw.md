# Integrationstests mit MSW

## Dateien

- `src/plant-list/PlantList.browsertest.tsx` (anlegen)

## Aufgabe

Schreibe Tests für die `PlantList`-Komponente mit MSW (Mock Service Worker).

## Schritte

### 1. Backend beende

- `PlantList` lädt Pflanzendaten über TanStack Query. Im Test soll kein
echtes Backend laufen, stattdessen soll MSW den HTTP-Request mocken und 
Testdaten zurück.

- Damit du nicht "aus Versehen" gegen das echte Backend testest, bitte den Backend-Prozess beenden.

### 2. Richte zunächst MSW ein und definiere einen Handler für `GET /api/plants`:

```ts
import { delay, http, HttpResponse } from "msw";
// ...
const worker = setupWorker(
  http.get("http://localhost:7200/api/plants", async () => {
    await delay(125); // simuliert Netzwerkverzögerung
    // gewünschtes Ergebnis mit Test-Pflanzen mit HttpResponse.json zurückliefern
    // ...
  }),
);

// Vor dem ersten Test starten...
beforeAll(async () => await worker.start());

// und nach jedem Test zurücksetzen
afterEach(() => worker.resetHandlers());
```

### 3. Tests schreiben

Dein Test soll prüfen:
    - Während die Daten geladen werden, zeigt die App den Suspense-Fallback an
    - Nach dem Laden erscheinen die Pflanzennamen aus den Mock-Daten

Beim Rendern im Test muss `PlantList` in einen `QueryClientProvider` und eine `Suspense`-Boundary
eingebettet werden (in der echten App übernimmt das `App.tsx`):

```tsx
<QueryClientProvider client={createQueryClient()}>
  <Suspense fallback={<p>Lade Pflanzen...</p>}>
    <PlantList />
  </Suspense>
</QueryClientProvider>
```

## Material

- MSW: https://mswjs.io/docs
- Request Handlers: https://mswjs.io/docs/quick-start#2-request-handlers
  - im verlinkten Tutorial werden die Handler separat definiert, wir machen das direkt in der Testdatei
- API `http`, `HttpResponse`, `delay`: https://mswjs.io/docs/api/http
- API `setupWorker` (Browser): https://mswjs.io/docs/api/setup-worker
- `worker.resetHandlers()`: https://mswjs.io/docs/api/setup-worker/reset-handlers

## Tests ausführen

```bash
npm run test
```
