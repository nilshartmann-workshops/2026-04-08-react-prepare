import { expect, it, vi } from "vitest";
import { render } from "vitest-browser-react";

import { Plant } from "../types.ts";
import PlantCardList from "./PlantCardList.tsx";

// PlantCard wird gemockt, weil die echte Komponente QueryClient und Zustand-Store
// benötigt – das ist hier nicht Gegenstand des Tests.
vi.mock("./PlantCard.tsx", () => ({
  // v-- Funktionssignatur entspricht genau der Signatur der Komponente
  //     (hier etwas vereinfacht, weil wir im Test nur den Namen testen
  //      wollen)
  // v-- default, weil es ein default export ist
  default({ name }: { name: string }) {
    return <article>{name}</article>;
  },
}));

const plants: Plant[] = [
  { id: "1", name: "Aloe Vera", location: "Küche", wateringInterval: 7 },
  { id: "2", name: "Orchidee", location: "Wohnzimmer", wateringInterval: 14 },
];

it("rendert für jede Pflanze eine Karte", async () => {
  const screen = await render(<PlantCardList plants={plants} />);

  await expect.element(screen.getByRole("article")).toHaveLength(2);
});

it("gibt den Pflanzennamen an PlantCard weiter", async () => {
  const screen = await render(<PlantCardList plants={plants} />);

  await expect.element(screen.getByText("Aloe Vera")).toBeInTheDocument();
  await expect.element(screen.getByText("Orchidee")).toBeInTheDocument();
});
