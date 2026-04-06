import { delay, http, HttpResponse } from "msw";
import { setupWorker } from "msw/browser";

import { Plant } from "../types.ts";

const defaultPlants: Plant[] = [
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

export const worker = setupWorker(
  http.get("http://localhost:7200/api/plants", async () => {
    await delay(125);
    return HttpResponse.json(defaultPlants);
  }),
);
