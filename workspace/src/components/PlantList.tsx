import { useSuspenseQuery } from "@tanstack/react-query";
import ky from "ky";

import { Plant } from "../types.ts";
import FavoritePlantList from "./FavoritePlantList.tsx";
import PlantCardList from "./PlantCardList.tsx";

export default function PlantList() {
  const { data: plants } = useSuspenseQuery({
    queryKey: ["plants"],
    queryFn: () =>
      ky.get("http://localhost:7200/api/plants", { retry: 0 }).json<Plant[]>(),
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
