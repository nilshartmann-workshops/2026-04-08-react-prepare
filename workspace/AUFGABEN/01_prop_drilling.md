# TabBar – Variante 1: Props (Prop Drilling)

## Dateien

- `src/components/TabBar.tsx`
- `src/components/App.tsx`

## Vorbereitung

- In der `eslint.config.js`-Datei bitte die Konstanten `enableImportRules` auf `false` setzen
  - Die sorgt dafür, dass die `import`-Statements sortiert sind.
  - Im "echten Leben" kann man das machen, hier im Workshop ist es eher irritierend
- Im `workspace`-Verzeichnis den Vite Devserver starten: `npm run dev`

## Aufgabe

Implementiere eine `TabBar`-Komponente nach dem **Prop-Drilling**-Pattern.

- Der aktive Tab-Zustand (`activeTabId`) soll in der `App`-Komponente per `useState` verwaltet werden.
- Alle Informationen, die `Tab` und `Panel` benötigen, werden als Props von außen hereingereicht ("durchgereicht").
- Die `App`-Komponente soll zwei `Tab`s darstellen: `Pflanzen` und `Neue Pflanze`
  - Die `Panel`-Komponente für `Pflanzen` ist `PlantList`
  - Die `Panel`-Komponente für `Neue Pflanzen` ist `PlantForm`
  - Hinweis: beide Komponenten (`PlantList` und `PlantForm`) sind mehr oder weniger Platzhalter. Die sehen wir uns später noch genauer an und vervollständigen sie. Hier geht es jetzt erstmal nur darum, zwei Komponenten für unsere Tabs zu haben

## Schritte

1. Ergänze die fehlenden Props in `TabBarProps`, `TabProps` und `PanelProps` (die todo-Kommentare in der Datei beschreiben, was fehlt)
2. Implementiere die Logik in `TabBar`, `Tab` und `Panel` – ein Panel soll nur sichtbar sein, wenn sein Tab aktiv ist; der aktive Tab-Button soll deaktiviert (`disabled`) sein
   - **Hinweis:** Eine Komponente kann `null` zurückgeben, um nichts zu rendern – das ist ein gängiges Pattern für bedingtes Rendering in React.
3. Lege in `App` einen State für den aktiven Tab an und baue die `TabBar` mit zwei Tabs ("Pflanzen", "Neue Pflanze") und den zugehörigen Panels zusammen
4. Reiche den State und die Update-Funktion als Props an `Tab` und `Panel` weiter – das ist das Prop-Drilling-Pattern
5. 🧐 Wenn das Umschalten zwischen den Tabs bei dir funktioniert:
  - Füll ein Feld im `PlantForm`-Formular aus
  - Wechsel zurück zur Liste und dann wieder zum Formular: Was passiert mit deiner Eingabe?
  - Welche Möglichkeiten kennst du, damit der Formularinhalt beim Wechseln zwischen den Tabs erhalten bleibt? 

## Material

- React
  - `useState`: https://react.dev/reference/react/useState
  - Props an Komponenten übergeben: https://react.dev/learn/passing-props-to-a-component
  - Bedingtes Rendering: https://react.dev/learn/conditional-rendering
  - `children`-Prop: https://react.dev/learn/passing-props-to-a-component#passing-jsx-as-children
- TypeScript
  - `ReactNode`-Typ (für `children`): importieren aus `"react"`
