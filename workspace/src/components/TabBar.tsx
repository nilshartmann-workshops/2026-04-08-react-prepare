import { ReactNode } from "react";

/**
 * TabBar
 *
 * Verwendung (gewünschtes Ergebnis):
 *
 *   <TabBar ...>
 *     <Tab tabId="list" ...>Pflanzen</Tab>
 *     <Tab tabId="form" ...>Neue Pflanze</Tab>
 *
 *     <Panel tabId="list" ...>
 *       <PlantList />
 *     </Panel>
 *     <Panel tabId="form" ...>
 *       <PlantForm />
 *     </Panel>
 *   </TabBar>
 *
 * - ZIEL:
 *   - Nur das Panel des aktiven Tabs wird angezeigt
 *   - Beim Klick auf einen Tab wird dieser aktiv
 *   - Der aktive Tab-Button ist deaktiviert (disabled)
 * - TODO:
 *   - Ergänze die fehlenden Properties und implementiere die fehlende Logik.
 */

type TabBarProps = {
  // todo: children-Property
  children: ReactNode;
};

/**
 * TabBar
 *
 * Äußerer Container der gesamten Tab-Navigation.
 * Rendert alle Kinder (Tabs und Panels).
 */
export function TabBar({ children }: TabBarProps) {
  return <div className="TabBar">{children}</div>;
}

type TabProps = {
  tabId: string;
  // todo: fehlende Properties:
  // - activeTabId
  // - onTabChange
  // - children (für Button-Label)

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
  // todo:
  // - beim Klicken soll onTabChange aufgerufen werden
  // - Der Button soll disabled sein, wenn dieser Tab gerade aktiv ist

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

  // todo Props:
  //  - Welche Props brauchst du noch?
  //    - Das Panel soll einen Inhalt anzeigen
  //    - Der Inhalt soll nur sichtbar sein,
  //      wenn der zugehörige Tab (tabId) gerade
  //      aktiv ist
};

/**
 * Panel
 *
 * Inhalt der zu einem Tab gehört.
 * Wird nur angezeigt, wenn der zugehörige Tab aktiv ist.
 */
export function Panel({ tabId, activeTabId, children }: PanelProps) {
  // todo:
  //   Panel-Inhalt nur rendern, wenn der zugehörige Tab aktiv ist!

  if (activeTabId !== tabId) {
    return null;
  }

  return <div className="TabPanel">{children}</div>;
}
