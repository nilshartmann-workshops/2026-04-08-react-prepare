import PlantForm from "./PlantForm.tsx";
import PlantList from "./PlantList.tsx";
import { Panel, Tab, TabBarCompound } from "./TabBarCompound.tsx";

export default function App() {
  return (
    <div className={"AppContainer"}>
      <TabBarCompound>
        <Tab tabId="list">Pflanzen</Tab>
        <Tab tabId="form">Neue Pflanze</Tab>
        <Panel tabId="list">
          <PlantList />
        </Panel>
        <Panel tabId="form">
          <PlantForm />
        </Panel>
      </TabBarCompound>

      {/* Variante 2: Render Props (zum Vergleich)
      <TabBarRenderProp>
        {(activeTabId, onTabChange) => (
          <>
            <Tab tabId="list" activeTabId={activeTabId} onTabChange={onTabChange}>Pflanzen</Tab>
            <Tab tabId="form" activeTabId={activeTabId} onTabChange={onTabChange}>Neue Pflanze</Tab>
            <Panel tabId="list" activeTabId={activeTabId}><PlantList /></Panel>
            <Panel tabId="form" activeTabId={activeTabId}><PlantForm /></Panel>
          </>
        )}
      </TabBarRenderProp>
      */}

      {/* Variante 1: Prop Drilling (zum Vergleich)
      const [activeTabId, setActiveTabId] = useState("list");
      <TabBar>
        <Tab tabId="list" activeTabId={activeTabId} onTabChange={setActiveTabId}>Pflanzen</Tab>
        <Tab tabId="form" activeTabId={activeTabId} onTabChange={setActiveTabId}>Neue Pflanze</Tab>
        <Panel tabId="list" activeTabId={activeTabId}><PlantList /></Panel>
        <Panel tabId="form" activeTabId={activeTabId}><PlantForm /></Panel>
      </TabBar>
      */}
    </div>
  );
}
