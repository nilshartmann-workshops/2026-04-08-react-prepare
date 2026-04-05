import { useSuspenseQuery } from "@tanstack/react-query";
import ky from "ky";

import { PlantSchema } from "../types.ts";
import PlantCard from "./PlantCard.tsx";

type PlantDetail = {
  plantId: string;
};

export default function PlantDetail({ plantId }: PlantDetail) {
  // Nur zeigen: Unterschiedliche Suspense Boundaries

  const { data: plant } = useSuspenseQuery({
    queryKey: ["plants", plantId],
    async queryFn() {
      const data = await ky
        .get(`http://localhost:7200/api/plants/${plantId}`, { retry: 0 })
        .json();
      return PlantSchema.parse(data);
    },
  });

  return (
    <PlantCard
      id={plant.id}
      name={plant.name}
      location={plant.location}
      wateringInterval={plant.wateringInterval}
      lastWatered={plant.lastWatered}
    />
  );
}
