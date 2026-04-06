import { useQueryClient } from "@tanstack/react-query";
import { lazy, Suspense } from "react";

import { plantsQueryOptions } from "./plant-list/plantsQueryOptions.ts";
import PlantErrorBoundary from "./shared/PlantErrorBoundary.tsx";
import { Panel, Tab, TabBarCompound } from "./shared/TabBarCompound.tsx";

const PlantList = lazy(() => import("./plant-list/PlantList.tsx"));
const PlantForm = lazy(() => import("./plant-form/PlantForm.tsx"));

export default function App() {
  const queryClient = useQueryClient();
  queryClient.prefetchQuery(plantsQueryOptions());

  return (
    <div className={"AppContainer"}>
      <TabBarCompound defaultTabId="home">
        <Tab tabId="home">Home</Tab>
        <Tab tabId="list">Pflanzen</Tab>
        <Tab tabId="form">Neue Pflanze</Tab>
        <Panel tabId="home">
          <p>Willkommen bei der Pflanzen-App! 🌱</p>
        </Panel>
        <Panel tabId="list">
          <Suspense fallback={<p>Lade Pflanzen...</p>}>
            <PlantErrorBoundary>
              <PlantList />
            </PlantErrorBoundary>
          </Suspense>
        </Panel>
        <Panel tabId="form">
          <Suspense fallback={<p>Lade Formular...</p>}>
            <PlantForm />
          </Suspense>
        </Panel>
      </TabBarCompound>
    </div>
  );
}
