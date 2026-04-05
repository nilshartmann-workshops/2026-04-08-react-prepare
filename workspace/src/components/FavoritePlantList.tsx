import { useSuspenseQuery } from "@tanstack/react-query";

import PlantCardList from "./PlantCardList.tsx";
import { plantsQueryOptions } from "./plantsQueryOptions.ts";
import { useFavoritesStore } from "./useFavoritesStore.ts";

export default function FavoritePlantList() {
  const { data: plants } = useSuspenseQuery(plantsQueryOptions());
  const { favoriteIds } = useFavoritesStore();
  const favoritePlants = plants.filter((p) => favoriteIds.includes(p.id));

  return (
    <div>
      <h2>Meine Favoriten</h2>
      {favoritePlants.length === 0 ? (
        <p>Noch keine Favoriten ausgewählt.</p>
      ) : (
        <PlantCardList plants={favoritePlants} />
      )}
    </div>
  );
}
