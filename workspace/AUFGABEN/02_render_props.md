# TabBar – Variante 2: Render Props

## Dateien

- `src/components/TabBarRenderProp.tsx` (neu anlegen)
- `src/components/App.tsx`

## Aufgabe

Implementiere eine zweite Variante der `TabBar` nach dem **Render Props**-Pattern.

Der Unterschied zu Variante 1: Die `TabBarRenderProp`-Komponente verwaltet den aktiven Tab-Zustand **selbst** – der Konsument muss keinen State anlegen.
Stattdessen übergibt der Konsument eine **Funktion als `children`** (Render Prop), die `activeTabId` und `onTabChange` als Parameter bekommt.

- Der aktive Tab-Zustand (`activeTabId`) wird von `TabBarRenderProp` intern per `useState` verwaltet
- Die `children`-Property ist eine **Funktion**, nicht mehr `ReactNode`
- Die Funktion bekommt `activeTabId` und `onTabChange` als Parameter und gibt JSX zurück
- `Tab` und `Panel` bleiben unverändert gegenüber Variante 1

Das gewünschte Ergebnis in `App.tsx` sieht so aus:

```tsx
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
```

## Schritte

1. Kopiere `TabBar.tsx` nach `TabBarRenderProp.tsx` und benenne die `TabBar`-Komponente in `TabBarRenderProp` um
2. Ändere den Typ von `children` in `TabBarRenderPropProps`: statt `ReactNode` soll `children` eine Funktion sein, die `activeTabId` und `onTabChange` als Parameter bekommt und `ReactNode` zurückgibt
3. Verlagere den `useState`-Aufruf für `activeTabId` aus `App` in die `TabBarRenderProp`-Komponente
4. Rufe in `TabBarRenderProp` die `children`-Funktion mit `activeTabId` und `setActiveTabId` auf
5. Ersetze in `App.tsx` die bisherige `TabBar`-Verwendung durch `TabBarRenderProp` – kein eigener State mehr nötig!

**Hinweis:** Eine Funktion als `children`-Prop ist das Render-Props-Pattern. Der Typ dafür sieht z.B. so aus:
```ts
children: (activeTabId: string, onTabChange: (tabId: string) => void) => ReactNode
```

## Material

- React
  - Render Props: https://react.dev/reference/react/cloneElement#passing-data-with-a-render-prop
  - `useState`: https://react.dev/reference/react/useState
- TypeScript
  - Funktionstypen: https://www.typescriptlang.org/docs/handbook/2/functions.html
