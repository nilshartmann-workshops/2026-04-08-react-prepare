# Rendern optimieren

## Dateien

- `src/components/useFavoritesStore.ts`
- `src/components/PlantCard.tsx`
- `src/components/FavoritePlantList.tsx` (neu anlegen)
- `src/components/PlantList.tsx`

## Aufgabe

In der jetzigen Version der Anwendung werden beim Klick auf "Favorit" mehr Komponenten als nötig neugerendert:

- **`PlantList`** rendert neu, obwohl sie die Favoritenliste gar nicht selbst darstellt, aber die selektierten Favoriten aus dem Store liest
- **Jede** `PlantCard` rendert neu, weil alle den gesamten Store abonnieren - nicht nur ihren eigenen Favoritenstatus

Ziel dieser Übung ist es, beide Probleme zu beheben.

## Herleitung: Renderings sichtbar machen

Bevor du optimierst, mach das Problem sichtbar, in dem du visualisiert, wann die betroffenen Komponenten neu gerendert werden. Dazu gibt es zwei Varianten:

**Variante A: React DevTools**

Wenn du kannst, bzw. die Berechtigung dafür hast, installiere die [React Developer Tools](https://react.dev/learn/react-developer-tools) als Browser-Extension.
Öffne die DevTools → Tab "Components" → Zahnrad-Icon → **"Highlight updates when components render"** aktivieren.
Beim Klick auf "Favorit" leuchten alle neu rendernden Komponenten kurz auf.

**Variante B: `console.log` mit Zeitstempel**

Alternativ temporär einen Log-Aufruf am Anfang der Komponenten (`PlantList`, `PlantCard`, `PlantCardList`) einfügen:

```tsx
console.log("PlantCard rendert:", id, new Date().toISOString());
```

Öffne die Browser-Konsole und klicke auf einen Favoriten-Button – du siehst alle Komponenten die neu rendern.

## Schritte

### 1. Externer Selector in der Store-Datei

Anstatt `isFavorite` als Funktion in der `PlantCard`-Komponente zu definieren und auf den kompletten Store zuzugreifen, exportiere eine **Selector-Funktion** `selectIsFavorite` direkt aus der Store-Datei (`useFavoritesStore.ts`).

### 2. `PlantCard` – Selector verwenden

- Ersetze den vollständigen Store-Aufruf durch den importierten Selector
- Deine Selector-Funktion kannst du als Argument an `useFavoritesStore` übergeben
- 🤔 Warum definieren wir die Selector-Funktion `selectIsFavorite` nicht direkt in der Komponente? Welche Vorteile gibt es, wenn wir sie in der Modul-Datei mit dem Store definieren?

### 3. `FavoritePlantList` als eigene Komponente

`PlantList` liest aktuell `favoriteIds` aus dem Store und rendert deshalb bei jedem Favoriten-Klick neu, auch wenn die _Gesamtliste_ der Pflanzen sich dabei nicht ändert.

- Erstelle die neue Komponente `FavoritePlantList` (`src/components/FavoritePlantList.tsx)
- Als Property bekommt sie die Liste _aller_ Pflanzen übergeben (`plants: Plant[]`)
- Lies die Liste der `favoriteIds` aus dem Store und zeigt die gefilterte Liste mit `PlantCardList` an

### 4. Aktualisiere `PlantList`

- In `PlantList` kannst du den Zugriff auf den Store entfernen und nur die beiden Listen Komponenten rendern:
  ```tsx
  export default function PlantList() {
    return (
      <div>
        <h2>Alle Pflanzen</h2>
        <PlantCardList plants={allPlants} />
        <FavoritePlantList plants={allPlants} />
      </div>
    );
  }
  ```
- Wenn alles funktioniert, prüfe erneut, welche Komponenten sich jetzt beim Ändern eines Favoriten neu rendern.

## Material

- React
  - React Developer Tools: https://react.dev/learn/react-developer-tools
  - Warum rendert React neu? https://react.dev/learn/render-and-commit
- Zustand
  - https://github.com/pmndrs/zustand?tab=readme-ov-file#selecting-multiple-state-slices
