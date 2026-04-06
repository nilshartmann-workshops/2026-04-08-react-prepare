# MSW Best-Practice und Integrationstest

## Dateien

- `src/mocks/browser.ts` (neu)
- `src/test-extend.ts` (neu)
- `src/plant-form/PlantForm.tsx` (Erweiterung)
- `src/App.browsertest.tsx` (neu)

## Aufgabe

Das bisher verwendete MSW-Setup (`setupWorker` + `beforeAll`/`afterEach` direkt in der Testdatei)
funktioniert, hat aber einen Nachteil: Worker-Lifecycle und Handler-Reset müssen in jeder
Testdatei wiederholt werden.

MSW empfiehlt für Vitest Browser Mode ein Pattern mit `test.extend`, das den Worker automatisch
für jeden Test startet und danach zurücksetzt.

Zusätzlich soll ein Integrationstest für die `App`-Komponente entstehen, der den kompletten
Ablauf testet: Pflanzenliste laden → neue Pflanze anlegen → Liste aktualisiert sich automatisch.

## Schritte

### 1. Shared Worker einrichten (`src/mocks/browser.ts`)

Erstelle die Datei `src/mocks/browser.ts` mit einem `setupWorker` und einem Default-Handler
für `GET /api/plants`:

```ts
import { delay, http, HttpResponse } from "msw";
import { setupWorker } from "msw/browser";
import { Plant } from "../types.ts";

const defaultPlants: Plant[] = [
  { id: "1", name: "Aloe Vera", location: "Schlafzimmer", wateringInterval: 12, lastWatered: "2025-06-16" },
  { id: "2", name: "Orchidee", location: "Wohnzimmer", wateringInterval: 20 },
];

export const worker = setupWorker(
  http.get("http://localhost:7200/api/plants", async () => {
    await delay(125);
    return HttpResponse.json(defaultPlants);
  }),
);
```

### 2. Test-Erweiterung einrichten (`src/test-extend.ts`)

Erstelle `src/test-extend.ts` mit einem extended `test`, das den Worker automatisch
für jeden Test startet (`auto: true`) und danach zurücksetzt:

```ts
import { test as testBase } from "vitest";
import { worker } from "./mocks/browser.ts";

export const test = testBase.extend<{ worker: typeof worker }>({
  worker: [
    async ({}, use) => {
      await worker.start();
      await use(worker);
      worker.resetHandlers();
      worker.stop();
    },
    { auto: true },
  ],
});
```

### 3. `PlantForm` nach erfolgreichem Speichern die Liste aktualisieren lassen

Ergänze in `PlantForm.tsx` einen `onSuccess`-Callback in `useMutation`,
der den Pflanzen-Cache von TanStack Query invalidiert:

```ts
import { useMutation, useQueryClient } from "@tanstack/react-query";

const queryClient = useQueryClient();

const { mutate, isPending, error, isSuccess } = useMutation({
  mutationFn() { /* unverändert */ },
  onSuccess() {
    queryClient.invalidateQueries({ queryKey: ["plants"] });
  },
});
```

Nach dem erfolgreichen POST löst `invalidateQueries` einen erneuten GET-Request aus
und die Pflanzenliste zeigt automatisch die neue Pflanze.

### 4. Integrationstest schreiben (`src/App.browsertest.tsx`)

Schreibe einen Integrationstest, der den kompletten Ablauf testet.
Verwende `test` aus `./test-extend.ts` statt aus `vitest`:

```tsx
import { test } from "./test-extend.ts";

test("aktualisiert die Pflanzenliste nach dem Anlegen einer neuen Pflanze", async ({ worker }) => {
  // GET: erster Request → 2 Pflanzen, zweiter Request (nach invalidateQueries) → 3 Pflanzen
  let requestCount = 0;
  worker.use(
    http.get("http://localhost:7200/api/plants", async () => {
      requestCount++;
      const plants = requestCount === 1 ? [aloeVera, orchidee] : [aloeVera, orchidee, basilikum];
      await delay(125);
      return HttpResponse.json(plants);
    }),
    http.post("http://localhost:7200/api/plants", () =>
      HttpResponse.json(basilikum, { status: 201 })
    ),
  );

  // App in QueryClientProvider wrappen (retry: false für Tests)
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false, refetchOnWindowFocus: false } },
  });
  const screen = await render(
    <QueryClientProvider client={queryClient}><App /></QueryClientProvider>
  );

  // Suspense-Fallback und initiale Pflanzenliste
  await expect.element(screen.getByText(/Lade Pflanzen/)).toBeInTheDocument();
  await expect.element(screen.getByText("Aloe Vera")).toBeInTheDocument();

  // Tab wechseln, Formular ausfüllen, absenden
  await screen.getByRole("button", { name: "Neue Pflanze" }).click();
  await screen.getByLabelText("Name der Pflanze").fill("Basilikum");
  await screen.getByLabelText("Standort").fill("Küche");
  await screen.getByRole("button", { name: /Pflanze hinzufügen/ }).click();
  await expect.element(screen.getByText(/Pflanze angelegt/)).toBeInTheDocument();

  // Zurück zur Liste → neue Pflanze erscheint
  await screen.getByRole("button", { name: "Pflanzen" }).click();
  await expect.element(screen.getByText("Basilikum")).toBeInTheDocument();
});
```

## Material

- MSW Vitest Browser Mode Pattern: https://mswjs.io/docs/recipes/vitest-browser-mode
- `test.extend` (Vitest Fixtures): https://vitest.dev/guide/test-context#test-extend
- `invalidateQueries`: https://tanstack.com/query/latest/docs/reference/QueryClient#queryclientinvalidatequeries
