# Zod – API-Response validieren

## Dateien

- `src/types.ts`
- `src/components/PlantList.tsx`

## Aufgabe

Aktuell vertrauen wir darauf, dass das Backend immer das zurückliefert, was wir erwarten. In der Praxis kann das schiefgehen – z.B. durch API-Änderungen oder fehlerhafte Daten.

Ziel dieser Übung: Die API-Response an der Systemgrenze mit **Zod** validieren. Das Schema dient gleichzeitig als lebende Dokumentation, Runtime-Validierung und TypeScript-Typ-Quelle.

## Schritte

### 1. Zod-Schema in `types.ts` definieren

- Achtung! **Wir verwenden zod v4**. Der Import des `z`-Objektes muss so aussehen:
    * ```typescript
      import { z } from "zod/v4"; // <--- Achtung "/v4" benutzen!
      ```
- Ersetze den manuell geschriebenen `Plant`-Typ durch ein Zod-Schema `PlantSchema`.
    - **Typen:**
        - alles `string`
        - `lastWatered` soll ein optionaler string sein
        - `wateringInterval` ist eine Zahl (mindestens `1`)
    - Vergiss nicht, `PlantSchema` zu exportieren (wird in Schritt 2 gebraucht).
    - Leite den TypeScript-Typ daraus ab: `export type Plant = z.infer<typeof PlantSchema>;`
        - Der vorherige `Plant`-Type wird damit überflüssig.

### 2. API-Response in `PlantList` validieren

Passe die `queryFn` an: Validiere die gelesenen Daten mit `z.array(PlantSchema).parse(data)`, bevor du sie zurückgibst.

🤔 Was passiert, wenn die API unerwartet antwortet – z.B. ein Feld fehlt oder hat den falschen Typ? Teste es, indem du das Schema vorübergehend verschärfst (z.B.
`wateringInterval` auf `max(1)`).

### 3. TypeScript-Typen prüfen

Führe `npm run check:ts` aus um sicherzustellen, dass der abgeleitete `Plant`-Typ überall korrekt verwendet wird.

## Material

- zod: https://zod.dev/
    - zod v4: https://zod.dev/v4
    - Why `zod/v4` in import: https://github.com/colinhacks/zod/issues/4371
- basic usage: https://zod.dev/basics
- define schemas: https://zod.dev/api
- iso dates: https://zod.dev/api#iso-dates
- infering typescript types: https://zod.dev/basics?id=inferring-types
- parse function: https://zod.dev/basics?id=parsing-data

