import { useState } from "react";

/**
 * useTabBar – Headless Hook
 *
 * Verwendung im Anwendungscode (App.tsx):
 *
 *   const { getTabProps, getPanelProps } = useTabBar("list");
 *
 *   <div className="TabBar">
 *     <Tab {...getTabProps("list")}>Pflanzen</Tab>
 *     <Tab {...getTabProps("form")}>Neue Pflanze</Tab>
 *     <Panel {...getPanelProps("list")}><PlantList /></Panel>
 *     <Panel {...getPanelProps("form")}><PlantForm /></Panel>
 *   </div>
 *
 * Unterschied zu den anderen Varianten:
 * - Der Hook lebt im *Anwendungscode* – nicht intern in einer Komponente
 * - Kein eigenes JSX – Rendering liegt vollständig beim Konsumenten
 * - Maximale Flexibilität: welche Elemente gerendert werden, entscheidet der Aufrufer
 */

// 💬 Warum "initialTabId" und nicht "activeTabId"?
//    → Der Hook ist "uncontrolled": er verwaltet den State selbst.
//      Der Aufrufer gibt nur den Startwert vor, nicht den laufenden Wert.
//      Eine "controlled" Variante würde activeTabId + onTabChange als Parameter nehmen.
export function useTabBar(initialTabId: string) {
  const [activeTabId, setActiveTabId] = useState(initialTabId);

  return {
    activeTabId,

    // 💬 Getter-Funktionen statt direkter Props-Weitergabe:
    //    Der Aufrufer schreibt {...getTabProps("list")} – der Hook entscheidet,
    //    welche Props notwendig sind. Das entkoppelt den Aufrufer von den internen Details.
    getTabProps: (tabId: string) => ({
      tabId,
      activeTabId,
      onTabChange: setActiveTabId,
    }),

    getPanelProps: (tabId: string) => ({
      tabId,
      activeTabId,
    }),
  };
}
