import PlantForm from "./PlantForm.tsx";
import PlantList from "./PlantList.tsx";
import { Panel, Tab } from "./TabBar.tsx";
import { useTabBar } from "./useTabBar.ts";

export default function App() {
  // 💬 Vergleich mit Variante 1–3:
  //    Kein Wrapper-Element (TabBar, TabBarRenderProp, TabBarCompound) –
  //    der Hook gibt nur State und Getter zurück, das Rendering liegt vollständig hier.
  const { getTabProps, getPanelProps } = useTabBar("list");

  return (
    <div className={"AppContainer"}>
      <div className="TabBar">
        <Tab {...getTabProps("list")}>Pflanzen</Tab>
        <Tab {...getTabProps("form")}>Neue Pflanze</Tab>
        <Panel {...getPanelProps("list")}>
          <PlantList />
        </Panel>
        <Panel {...getPanelProps("form")}>
          <PlantForm />
        </Panel>
      </div>

      {/* Variante 3: Compound Components + Context (zum Vergleich)
      <TabBarCompound>
        <Tab tabId="list">Pflanzen</Tab>
        <Tab tabId="form">Neue Pflanze</Tab>
        <Panel tabId="list"><PlantList /></Panel>
        <Panel tabId="form"><PlantForm /></Panel>
      </TabBarCompound>
      */}

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
