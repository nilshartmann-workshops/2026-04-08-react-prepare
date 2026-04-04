# TabBar – Variante 3: Compound Components (Context)

## Dateien

- `src/components/TabBarCompound.tsx` (neu anlegen)
- `src/components/App.tsx`

## Aufgabe

Implementiere eine dritte Variante der `TabBar` als **Compound Component** mit React Context.

Der Unterschied zu den vorherigen Varianten: `Tab` und `Panel` brauchen **keine** `activeTabId`- oder `onTabChange`-Props mehr. Sie lesen diese Werte direkt aus einem React Context heraus.

- `TabBarCompound` erstellt einen Context und stellt `activeTabId` sowie `onTabChange` darin bereit
- `Tab` und `Panel` konsumieren den Context mit `useContext`
- Das Ergebnis ist die sauberste Konsumenten-API der drei Varianten – keine Props müssen "durchgereicht" werden

Das gewünschte Ergebnis in `App.tsx`:

```tsx
<TabBarCompound>
  <Tab tabId="list">Pflanzen</Tab>
  <Tab tabId="form">Neue Pflanze</Tab>
  <Panel tabId="list"><PlantList /></Panel>
  <Panel tabId="form"><PlantForm /></Panel>
</TabBarCompound>
```

## Schritte

1. Kopiere `TabBarRenderProp.tsx` nach `TabBarCompound.tsx` als Ausgangsbasis
2. Erstelle einen Context mit `createContext` – der Context-Wert soll `activeTabId` und `onTabChange` enthalten
3. Implementiere `TabBarCompound`: verwalte `activeTabId` intern per `useState` und umschließe `children` mit dem `Context.Provider`
4. Passe `Tab` und `Panel` an: entferne `activeTabId`/`onTabChange` aus den Props und lese diese Werte stattdessen aus dem Context mit `useContext`
5. Ersetze in `App.tsx` die bisherige `TabBarRenderProp`-Verwendung durch `TabBarCompound`

**Hinweis:** Es ist eine gute Praxis, einen eigenen kleinen Hook zu schreiben (z.B. `useTabBar()`), der `useContext` aufruft und einen Fehler wirft, wenn er außerhalb des Providers verwendet wird. Das macht Fehler leichter erkennbar.

## Material

- React
  - `createContext` und `useContext`: https://react.dev/learn/passing-data-deeply-with-context
  - Context mit TypeScript: https://react.dev/learn/passing-data-deeply-with-context#use-cases-for-context
- TypeScript
  - Generics bei `createContext<T>`: https://www.typescriptlang.org/docs/handbook/2/generics.html
