# Zustand – Favoriten-Store

## Dateien

- `src/components/useFavoritesStore.ts` (neu anlegen)
- `src/components/PlantCard.tsx`
- `src/components/PlantCardList.tsx`
- `src/components/PlantList.tsx`

## Aufgabe

Pflanzen sollen als Favorit markiert werden können. Der Favoritenstatus wird global in einem **Zustand-Store** verwaltet:

- Der Store hält ein `string[]` mit den IDs der Favoriten-Pflanzen
- `PlantCard` bekommt einen "Favorit"-Button, dessen Zustand (ist Favorit ja/nein) direkt aus dem Store kommt
- Beim Klick wird der Favoritenstatus umgeschaltet
- `PlantList` zeigt zwei Listen nebeneinander: alle Pflanzen (wie bisher) und (neu) nur die Favoriten

## Schritte
1. Lege `src/store/useFavoritesStore.ts` an:
   - State: `favoriteIds: string[]`
   - Action: `toggleFavorite(id: string)`: fügt die übergebene Id hinzu oder entfernt sie
     - **Hinweis:** Damit Zustand eine Änderung erkennt, muss `toggleFavorite` immer ein **neues Array** zurückgeben – niemals das bestehende Array mutieren ("immutable datastructure")
   - 🤔 Warum schreiben wir nur die Ids der Pflanzen, aber nicht die `Plant`-Objekte selbst in den Store?

2. Ergänze in `PlantCard` einen Favoriten-Button:
   - Lies den gesamten Store aus: `const store = useFavoritesStore()`
   - Ermittle, ob die `PlantCard` eine favorisierte Pflanze darstellen (`id` aus der Pflanze muss in `favoriteIds` aus dem Store enthalten sein)
   - Render den Button-Titel abhängig davon, ob die Pflanze favorisiert ist oder nicht
   - Wenn auf den Button geklickt wird, soll die Pflanze favorisiert werden bzw. als Favorit entfernt werden

3. Ergänze `PlantList` um eine zweite Liste für Favoriten:
   - Lies `favoriteIds` aus dem Store
   - Filtere `allPlants` nach den favorisierten IDs
   - Zeige beide Listen an jeweils mit der `PlantCardList`-Komponente an
     - Damit die Listen nebeneinander dargestellt werden, kannst du vorgefertige CSS-Klassen verwenden:
       - Die `PlantList`-Komponente braucht am obersten `div` die CSS-Klasse `PlantList`
       - Die beiden Überschriften und Listen jeweils in ein `div` wrappen:
         - ```typescript jsx
             function PlantList() {
               // ...
               return <div className="PlantList">
                 <div>
                   <h2>Alle Pflanzen</h2>
                   <PlantCardList {/* alle Pflanzen */} />
                 </div>
                 <div>
                   <h2>Favorisierte Pflanzen</h2>
                   <PlantCardList {/* favorisierte Pflanzen */} />
                 </div>
             </div>
            }
           ```


## Material

- Zustand: https://github.com/pmndrs/zustand
    - Erste Schritte: https://zustand.docs.pmnd.rs/getting-started/introduction
    - Creating Store: https://zustand.docs.pmnd.rs/reference/apis/create-store
    - Mit TypeScript (spezielle `create`-Funktion für Typsicherheit) https://github.com/pmndrs/zustand?tab=readme-ov-file#typescript-usage
