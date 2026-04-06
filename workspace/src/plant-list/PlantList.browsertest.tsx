import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { delay, http, HttpResponse } from "msw";
import { setupWorker } from "msw/browser";
import { Suspense } from "react";
import { afterEach, beforeAll, expect, it, vi } from "vitest";
import { render } from "vitest-browser-react";

import { Plant } from "../types.ts";
import PlantList from "./PlantList.tsx";
import PlantErrorBoundary from "../shared/PlantErrorBoundary.tsx";

const worker = setupWorker(
  http.get("http://localhost:7200/api/plants", async () => {
    const plants: Plant[] = [
      {
        id: "1",
        name: "Aloe Vera",
        location: "Schlafzimmer",
        wateringInterval: 12,
        lastWatered: "2025-06-16",
      },
      {
        id: "2",
        name: "Orchidee",
        location: "Wohnzimmer",
        wateringInterval: 20,
      },
    ];

    await delay(125);

    return HttpResponse.json(plants);
  }),
);

beforeAll(async () => await worker.start());
afterEach(() => {
  worker.resetHandlers();
  vi.restoreAllMocks();
});

function renderPlantList() {
  // Test-spezifische Konfiguration des QueryClient:
  //   retry: false, damit TanStack Query nicht 3x wiederholt bevor der Fehler geworfen wird
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false, refetchOnWindowFocus: false } },
  });

  // über die Sinnhaftigkeit hier (ErrorBoundary + Suspense) kann man diskutieren
  // besser wäre die Komponente zu testen, in der in der Anwendung ErrorBoundary
  // und Suspense-Boundary sitzt
  // (abgesehen von der App-Komponente haben wir sowas in der Beispiel-App aber nicht
  //  und die App-Komponente soll später noch getestet werden)

  return render(
    <QueryClientProvider client={queryClient}>
      <PlantErrorBoundary>
        <Suspense fallback={<p>Lade Pflanzen...</p>}>
          <PlantList />
        </Suspense>
      </PlantErrorBoundary>
    </QueryClientProvider>,
  );
}

it("zeigt den Suspense-Fallback und die geladenen Daten", async () => {
  const screen = await renderPlantList();

  await expect.element(screen.getByText(/Lade Pflanzen/)).toBeInTheDocument();

  await expect.element(screen.getByText(/Aloe Vera/)).toBeInTheDocument();
  await expect.element(screen.getByText(/Orchidee/)).toBeInTheDocument();
});

it("zeigt den Error-Boundary-Fallback bei einem Serverfehler", async () => {
  // React loggt Error-Boundary-Fehler immer auf der Konsole – hier unterdrücken
  vi.spyOn(console, "error").mockImplementation(() => {});

  worker.use(
    http.get(
      "http://localhost:7200/api/plants",
      () => new HttpResponse(null, { status: 500 }),
    ),
  );

  const screen = await renderPlantList();

  await expect
    .element(screen.getByText(/Etwas ist schiefgelaufen/))
    .toBeInTheDocument();
  await expect
    .element(screen.getByRole("button", { name: /Erneut versuchen/ }))
    .toBeInTheDocument();
});
