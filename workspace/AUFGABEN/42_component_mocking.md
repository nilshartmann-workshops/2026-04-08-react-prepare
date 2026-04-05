# Komponenten mocken mit vi.mock()

## Dateien

- `src/plant-list/PlantCardList.browsertest.tsx` (anlegen)

## Aufgabe

Schreibe Tests für `PlantCardList`. Diese Komponente nimmt eine Liste von `Plant`-Objekten
entgegen und rendert für jede Pflanze eine `PlantCard`.
- Die echte `PlantCard`-Komponente benötigt einen `QueryClient` und den Zustand-Store
(`useFavoritesStore`). Beides wäre im Test aufwändige Infrastruktur, obwohl wir hier nur das
Verhalten von `PlantCardList` selbst testen wollen (klassischer Unit-Test)
- Du musst also `PlantCard` mocken. Das kannst du mit `vi.mock()` machen
  - React-Komponenten sind ja... normale Funktionen!
  - Also kannst du sie auch im Test wie eine normale Funktion mocken
  - Der Unterschied zum Mocken der Callback-Funktion im vorherigen Schritt ist "nur", dass wir hier ein ganzes Modul (`PlantCard`) mocken müssen - und nicht nur die einzelne Funktion.
  - Das geht grundsätzlich so (in deiner Testdatei):
    ```ts
    //                muss dem "echten" Pfad entsprechen, den du
    //                in der Testdatei auch zum importieren 
    //           v--  verwenden würdest
    vi.mock("./PlantCard.tsx", () => ({
        // 'default' ist hier eine Funktion!
        //   'default' ist der Name
        //   '({ name }: { name: string })' die Signatur mit TS-Typ
        //   '{ name: string }' wäre der TS-Typ für ein Props-Objekt
        //    mit "name" als Property.
        default({ name }: { name: string }) {
          return /* deine Mock-Komponente */
        }
    }));
    ```
    
- Beim `render` im Test kannst du folgende "Test-Pflanzen" verwenden:
  - ```typescript jsx
      const plants: Plant[] = [
        { id: "1", name: "Aloe Vera", location: "Küche", wateringInterval: 7 },
        { id: "2", name: "Orchidee", location: "Wohnzimmer", wateringInterval: 14 },
      ];
    ```

Deine Tests sollen prüfen, dass jede übergebene Pflanze gerendert wurde. Du kannst zum Beispiel prüfen:
 - Die Anzahl der gerenderten Karten (bzw. das, was du in deiner Mock-Komponente renderst) sollte der Anzahl der übergebenen Pflanzen sein
 - Die Namen der Pflanzen sind im gerenderten Output sichtbar (`getByText`)


## Material

- `vi.mock()`: https://vitest.dev/api/vi.html#vi-mock
- Locators: https://vitest.dev/guide/browser/locators
