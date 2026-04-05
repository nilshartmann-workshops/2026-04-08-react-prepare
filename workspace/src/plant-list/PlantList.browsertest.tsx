import { QueryClientProvider } from "@tanstack/react-query";
import { delay, http, HttpResponse } from "msw";
import { setupWorker } from "msw/browser";
import { Suspense } from "react";
import { afterEach, beforeAll, expect, it } from "vitest";
import { render } from "vitest-browser-react";

import { createQueryClient } from "../create-query-client.tsx";
import { Plant } from "../types.ts";
import PlantList from "./PlantList.tsx";

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
afterEach(() => worker.resetHandlers());

it("zeigt den Suspense-Fallback und die geladenen Daten", async () => {
  const screen = await render(
    <QueryClientProvider client={createQueryClient()}>
      <Suspense fallback={<p>Lade Pflanzen...</p>}>
        <PlantList />
      </Suspense>
    </QueryClientProvider>,
  );

  await expect.element(screen.getByText(/Lade Pflanzen/)).toBeInTheDocument();

  await expect.element(screen.getByText(/Aloe Vera/)).toBeInTheDocument();
  await expect.element(screen.getByText(/Orchidee/)).toBeInTheDocument();
});
