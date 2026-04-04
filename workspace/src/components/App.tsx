import { useState } from "react";

import PlantForm from "./PlantForm.tsx";
import PlantList from "./PlantList.tsx";
import { Panel, Tab, TabBar } from "./TabBar.tsx";

export default function App() {
  // Wie kann eine TabBar-Komponente aussehen?
  //
  //  <TabBar>
  //   <Tab>...</Tab>
  //   <Tab>...</Tab>
  //   <Panel>...</Panel>
  //   <Panel>...</Panel>
  // </TabBar>

  const [activeTabId, setActiveTabId] = useState("list");

  // Erhalten des Formularzustands
  //  - Variante 1: State hierher schieben
  //  - Variante 2: Activity
  //  - Variante 3: globaler Zustand (sehen wir später)

  return (
    <div className={"AppContainer"}>
      <TabBar>
        <Tab
          tabId="list"
          activeTabId={activeTabId}
          onTabChange={setActiveTabId}
        >
          Pflanzen
        </Tab>
        <Tab
          tabId="form"
          activeTabId={activeTabId}
          onTabChange={setActiveTabId}
        >
          Neue Pflanze
        </Tab>
        <Panel tabId="list" activeTabId={activeTabId}>
          <PlantList />
        </Panel>
        <Panel tabId="form" activeTabId={activeTabId}>
          <PlantForm />
        </Panel>
      </TabBar>
    </div>
  );
}
