# "Jetzt gegossen" – Mutation + Cache-Invalidierung

## Dateien

- `src/components/PlantCard.tsx`

## Aufgabe

Jede Pflanzenkarte soll einen "Jetzt gegossen"-Button bekommen. Ein Klick setzt das Gießdatum der Pflanze auf heute und aktualisiert anschließend die Liste.

## Schritte

### 1. Button hinzufügen

- Ergänze in `PlantCard` einen Button "Jetzt gegossen".
- Für die späteren Tests zeige bei "Zuletzt gegossen" auch die Uhrzeit an.
  - In `PlantCard.tsx` bei `format` `HH:mm.ss` ergänzen: 
    - ```typescript jsx
       <div>
        Zuletzt:{" "}
        {dayjs(lastWatered)
           .locale("de")
           .format("DD.MM.YYYY HH:mm.ss")
        }
      </div>
      ```

### 2. Mutation implementieren

- Füge eine `useMutation` hinzu, deren `mutationFn` einen `PUT`-Request an `http://localhost:7200/api/plants/:id/lastWatered` schickt. (Kein Payload notwendig)
- Wenn auf "Jetzt gegossen" geklickt wird, soll die Mutation ausgeführt werden
  - Fehler- und Wartezustand brauchst du hier nicht zu machen
- Was passiert, wenn du auf den Button drückst:
  - Im Netzwerk-Tab?
  - In der Anwendung?

### 3. Cache invalidieren

- Implementiere die `onSuccess`-Callback-Funktion von `useMutation` 
- Sorge dafür, dass der Pflanzen-Liste-Query invalidiert wird
- Wo bekommst du sicher den QueryKey dafür her?
- Was passiert, wenn du auf den Button drückst:
    - Im Netzwerk-Tab?
    - In der Anwendung?
    - Was passiert, wenn du eine Pflanze "gießt", die auch in der Liste der Favoriten angezeigt wird?
 
## Material

- `useMutation`: https://tanstack.com/query/latest/docs/framework/react/reference/useMutation
- `useQueryClient`: https://tanstack.com/query/latest/docs/framework/react/reference/useQueryClient
- Invalidations from Mutations: https://tanstack.com/query/latest/docs/framework/react/guides/invalidations-from-mutations
  - `invalidateQueries`: https://tanstack.com/query/latest/docs/reference/QueryClient#queryclientinvalidatequeries
