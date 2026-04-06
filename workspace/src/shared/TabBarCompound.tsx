import { createContext, ReactNode, useContext, useState } from "react";

/**
 * TabBarCompound
 *
 * Verwendung (gewünschtes Ergebnis):
 *
 *   <TabBarCompound>
 *     <Tab tabId="list">Pflanzen</Tab>
 *     <Tab tabId="form">Neue Pflanze</Tab>
 *
 *     <Panel tabId="list">
 *       <PlantList />
 *     </Panel>
 *     <Panel tabId="form">
 *       <PlantForm />
 *     </Panel>
 *   </TabBarCompound>
 *
 * - ZIEL:
 *   - Tab und Panel brauchen keine activeTabId/onTabChange-Props mehr
 *   - Sie lesen diese Werte direkt aus einem React Context
 *   - TabBarCompound verwaltet den State und stellt ihn über den Context bereit
 * - TODO:
 *   - Definiere den Context-Typ und erstelle den Context
 *   - Implementiere TabBarCompound mit internem State und Context.Provider
 *   - Implementiere Tab und Panel so, dass sie den Context konsumieren
 */

// todo: Definiere einen Typ für den Context-Wert
//   - activeTabId: string
//   - onTabChange: Funktion die eine tabId entgegennimmt
type TabBarContextValue = {
  activeTabId: string;
  onTabChange: (tabId: string) => void;
};

// todo: Erstelle den Context mit createContext
//   - Initialer Wert: null (kein aktiver Tab außerhalb von TabBarCompound)
const TabBarContext = createContext<TabBarContextValue | null>(null);

/**
 * Interner Hook für Tab und Panel.
 * Wirft einen Fehler, wenn er außerhalb von TabBarCompound verwendet wird.
 */
function useTabBar(): TabBarContextValue {
  const context = useContext(TabBarContext);
  if (!context) {
    throw new Error(
      "Tab und Panel müssen innerhalb von TabBarCompound verwendet werden",
    );
  }
  return context;
}

type TabBarCompoundProps = {
  children: ReactNode;
  defaultTabId?: string;
};

/**
 * TabBarCompound
 *
 * Äußerer Container der Tab-Navigation.
 * Verwaltet den aktiven Tab-Zustand und stellt ihn über einen Context bereit.
 */
export function TabBarCompound({
  children,
  defaultTabId = "list",
}: TabBarCompoundProps) {
  // todo:
  // - Lege einen internen State für activeTabId an
  // - Umschließe children mit <TabBarContext.Provider value={...}>
  const [activeTabId, setActiveTabId] = useState(defaultTabId);

  return (
    <TabBarContext.Provider
      value={{ activeTabId, onTabChange: setActiveTabId }}
    >
      <div className="TabBar">{children}</div>
    </TabBarContext.Provider>
  );
}

type TabProps = {
  tabId: string;
  children: ReactNode;
};

/**
 * Tab
 *
 * Ein einzelner Tab-Button in der Navigationsleiste.
 * Liest activeTabId und onTabChange aus dem Context.
 */
export function Tab({ tabId, children }: TabProps) {
  // todo: Lese activeTabId und onTabChange aus dem Context (useTabBar)
  const { activeTabId, onTabChange } = useTabBar();

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
  children: ReactNode;
};

/**
 * Panel
 *
 * Inhalt der zu einem Tab gehört.
 * Liest activeTabId aus dem Context.
 */
export function Panel({ tabId, children }: PanelProps) {
  // todo: Lese activeTabId aus dem Context (useTabBar)
  const { activeTabId } = useTabBar();

  if (activeTabId !== tabId) {
    return null;
  }

  return <div className="TabPanel">{children}</div>;
}
