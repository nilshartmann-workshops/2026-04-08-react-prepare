import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { delay, http, HttpResponse } from "msw";
import { expect } from "vitest";
import { render } from "vitest-browser-react";

import App from "./App.tsx";
import { test } from "./test-extend.ts";
import { Plant } from "./types.ts";

const aloeVera: Plant = {
  id: "1",
  name: "Aloe Vera",
  location: "Schlafzimmer",
  wateringInterval: 12,
  lastWatered: "2025-06-16",
};

const orchidee: Plant = {
  id: "2",
  name: "Orchidee",
  location: "Wohnzimmer",
  wateringInterval: 20,
};

const basilikum: Plant = {
  id: "3",
  name: "Basilikum",
  location: "Küche",
  wateringInterval: 7,
};

test("aktualisiert die Pflanzenliste nach dem Anlegen einer neuen Pflanze", async ({
  worker,
}) => {
  let requestCount = 0;
  worker.use(
    http.get("http://localhost:7200/api/plants", async () => {
      requestCount++;
      const plants =
        requestCount === 1
          ? [aloeVera, orchidee]
          : [aloeVera, orchidee, basilikum];
      await delay(125);
      return HttpResponse.json(plants);
    }),
    http.post("http://localhost:7200/api/plants", () =>
      HttpResponse.json(basilikum, { status: 201 }),
    ),
  );

  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false, refetchOnWindowFocus: false } },
  });

  const screen = await render(
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>,
  );

  // Suspense-Fallback erscheint während des Ladens
  await expect.element(screen.getByText(/Lade Pflanzen/)).toBeInTheDocument();

  // Pflanzenliste wird angezeigt
  await expect.element(screen.getByText("Aloe Vera")).toBeInTheDocument();
  await expect.element(screen.getByText("Orchidee")).toBeInTheDocument();

  // Zum Formular wechseln (TabBarCompound rendert <button>, kein role="tab")
  await screen.getByRole("button", { name: "Neue Pflanze" }).click();

  // Formular ausfüllen und absenden
  await screen.getByLabelText("Name der Pflanze").fill("Basilikum");
  await screen.getByLabelText("Standort").fill("Küche");
  await screen.getByRole("button", { name: /Pflanze hinzufügen/ }).click();

  // Erfolgsbestätigung
  await expect
    .element(screen.getByText(/Pflanze angelegt/))
    .toBeInTheDocument();

  // Zurück zur Pflanzenliste
  await screen.getByRole("button", { name: "Pflanzen" }).click();

  // Neue Pflanze erscheint in der Liste (invalidateQueries hat den Refetch ausgelöst)
  await expect.element(screen.getByText("Basilikum")).toBeInTheDocument();
});
