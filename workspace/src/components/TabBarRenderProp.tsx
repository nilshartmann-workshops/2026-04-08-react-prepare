import { ReactNode, useState } from "react";

/**
 * TabBarRenderProp
 *
 * Verwendung (gewünschtes Ergebnis):
 *
 *   <TabBarRenderProp>
 *     {(activeTabId, onTabChange) => (
 *       <>
 *         <Tab tabId="list" activeTabId={activeTabId} onTabChange={onTabChange}>Pflanzen</Tab>
 *         <Tab tabId="form" activeTabId={activeTabId} onTabChange={onTabChange}>Neue Pflanze</Tab>
 *
 *         <Panel tabId="list" activeTabId={activeTabId}>
 *           <PlantList />
 *         </Panel>
 *         <Panel tabId="form" activeTabId={activeTabId}>
 *           <PlantForm />
 *         </Panel>
 *       </>
 *     )}
 *   </TabBarRenderProp>
 *
 * - ZIEL:
 *   - Der aktive Tab-Zustand wird von TabBarRenderProp selbst verwaltet
 *   - Der Konsument bekommt activeTabId und onTabChange als Parameter der children-Funktion
 * - TODO:
 *   - Ergänze den Typ für die children-Property
 *   - Implementiere TabBarRenderProp mit internem State
 */

type TabBarRenderPropProps = {
  // todo: children soll eine Funktion sein, die activeTabId und onTabChange
  //   als Parameter bekommt und ReactNode zurückgibt
  children: (
    activeTabId: string,
    onTabChange: (tabId: string) => void,
  ) => ReactNode;
};

/**
 * TabBarRenderProp
 *
 * Äußerer Container der Tab-Navigation.
 * Verwaltet den aktiven Tab-Zustand selbst.
 * Übergibt activeTabId und onTabChange an die children-Funktion.
 */
export function TabBarRenderProp({ children }: TabBarRenderPropProps) {
  // todo:
  // - Lege einen internen State für activeTabId an
  // - Rufe children mit activeTabId und der State-Update-Funktion auf
  const [activeTabId, setActiveTabId] = useState("list");

  return <div className="TabBar">{children(activeTabId, setActiveTabId)}</div>;
}

type TabProps = {
  tabId: string;
  activeTabId: string;
  onTabChange: (tab: string) => void;
  children: ReactNode;
};

/**
 * Tab
 *
 * Ein einzelner Tab-Button in der Navigationsleiste.
 * Ist deaktiviert, wenn er dem aktiven Tab entspricht.
 * Beim Klick wird er zum aktiven Tab.
 */
export function Tab({ tabId, activeTabId, onTabChange, children }: TabProps) {
  const isActive = activeTabId === tabId;

  return (
    <button
      onClick={() => onTabChange(tabId)}
      className={"Tab"}
      disabled={isActive}
    >
      {children}
    </button>
  );
}

type PanelProps = {
  tabId: string;
  activeTabId: string;
  children: ReactNode;
};

/**
 * Panel
 *
 * Inhalt der zu einem Tab gehört.
 * Wird nur angezeigt, wenn der zugehörige Tab aktiv ist.
 */
export function Panel({ tabId, activeTabId, children }: PanelProps) {
  if (activeTabId !== tabId) {
    return null;
  }

  return <div className="TabPanel">{children}</div>;
}
