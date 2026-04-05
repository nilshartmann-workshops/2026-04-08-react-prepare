import { useSuspenseQuery } from "@tanstack/react-query";
import { Suspense } from "react";

import FavoritePlantList from "./FavoritePlantList.tsx";
import PlantCardList from "./PlantCardList.tsx";
import PlantErrorBoundary from "./PlantErrorBoundary.tsx";
import { plantsQueryOptions } from "./plantsQueryOptions.ts";

export default function PlantList() {
  const { data: plants } = useSuspenseQuery(plantsQueryOptions());

  return (
    <div className={"PlantList"}>
      <div>
        <h2>Alle Pflanzen</h2>
        <PlantCardList plants={plants} />
      </div>

      <Suspense fallback={<p>Lade Favoriten...</p>}>
        <PlantErrorBoundary>
          <FavoritePlantList />
        </PlantErrorBoundary>
      </Suspense>
    </div>
  );
}
