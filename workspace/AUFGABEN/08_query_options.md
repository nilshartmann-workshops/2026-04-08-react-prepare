# queryOptions – Query-Definition wiederverwenden

## Dateien

- `src/components/plantsQueryOptions.ts` (neu anlegen)
- `src/components/PlantList.tsx`
- `src/components/FavoritePlantList.tsx`

## Aufgabe

Die Pflanzenliste soll in zwei Komponenten verwendet werden. Damit wir die Query-Beschreibung (`queryKey` und `queryFn`) nicht doppeln müssen, lagern wir die Konfiguration in ein eigenes Modul aus.

## Schritte

### 1. `plantsQueryOptions` extrahieren

- Lege eine neue Datei `src/components/plantsQueryOptions.ts` an und exportiere daraus eine Funktion `plantsQueryOptions`, die ein `queryOptions`-Objekt zurückgibt
  - Das Objekt, das du an `queryOptions` übergibst, ist die Query-Konfiguration, so wie sie aktuell in `PlantList` verwendet wird.

### 2. `PlantList` anpassen

- Ersetze die inline-Query-Definition durch das Objekt, das von deiner `plantsQueryOptions`-Funktion erzeugt wird.

### 3. `FavoritePlantList` – selbst laden

- `FavoritePlantList` soll die Liste der Kommentare nun ebenfalls (wie `PlantList`) selbst laden.
- Baue das Property `plants` aus `FavoritePlantList` aus und verwende auch dort `useSuspenseQuery`, um die Daten zu laden.
- Wenn deine Anwendung funktioniert, kannst du im Netzwerkverkehr schauen, welche Queries ausgeführt werden
    - Wechsel dazu auch mit der TabBar zwischen Liste und Formular hin- und her

## Material

- `queryOptions`: https://tanstack.com/query/latest/docs/framework/react/reference/queryOptions
- Blog Post mit Hintergründen zu `queryOptions`: https://tkdodo.eu/blog/the-query-options-api
- 