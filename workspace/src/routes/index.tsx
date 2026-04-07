import { createFileRoute } from '@tanstack/react-router'
import { Suspense } from "react";
import PlantErrorBoundary from "../components/PlantErrorBoundary.tsx";
import PlantList from "../components/PlantList.tsx";

export const Route = createFileRoute('/')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <Suspense fallback={<p>Lade Pflanzen...</p>}>
      <PlantErrorBoundary>
        <PlantList />
      </PlantErrorBoundary>
    </Suspense>
  );
}
