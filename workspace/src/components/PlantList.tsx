import { useSuspenseQuery } from "@tanstack/react-query";
import ky from "ky";
import { z } from "zod/v4";

import { PlantSchema } from "../types.ts";
import FavoritePlantList from "./FavoritePlantList.tsx";
import PlantCardList from "./PlantCardList.tsx";

export default function PlantList() {
  const { data: plants } = useSuspenseQuery({
    queryKey: ["plants"],
    queryFn: async () => {
      const data = await ky
        .get("http://localhost:7200/api/plants", { retry: 0 })
        .json();
      return z.array(PlantSchema).parse(data);
    },
  });

  return (
    <div className={"PlantList"}>
      <div>
        <h2>Alle Pflanzen</h2>
        <PlantCardList plants={plants} />
      </div>

      <FavoritePlantList plants={plants} />
    </div>
  );
}
