# TanStack Query – Pflanzenliste laden

## Dateien

- `src/components/PlantList.tsx`

## Aufgabe

Bisher enthält `PlantList` ein hartkodiertes Array `allPlants`. Ersetze es durch einen echten API-Aufruf mit **TanStack Query**.

## Schritte

1. Implementiere in `PlantList` einen `useSuspenseQuery`
   - Setze einen `queryKey`
   - Implementiere die `queryFn`: 
     - Die URL lautet: http://localhost:7200/api/plants
       - Die API kannst du auch im Browser (oder mit curl) öffnen, um das Ergebnis zu sehen
     - Zum laden der Daten kannst du `ky` oder `fetch` verwenden (s.u.)
       - Falls du `ky` verwendest, Retry ausschalten: `{ retry: 0 }` als zweiten Parameter an ky.get übergeben
     - Das Backend liefert eine JSON-Response mit `Plant[]`-Objekten zurück. Das muss auch der Rückgabe-Typ von `queryFn` sein!
2. Entferne die statische Liste der Pflanzen (`allPlants`)
3. Übergib stattdessen die geladenen Daten an die Listen-Komponenten
4. Wenn du die Anwendung aufrufst, kannst du im Netzwerk-Tab deines Browsers sehen, wann und welche Queries ausgeführt werden

## Hintergrund: ky oder fetch

### ky

- Kleine Wrapper-Bibliothek um `fetch`
- Etwas vereinfachte API, z.B.:
  - kein `response.ok`-Check notwendig 
  - automatische Konvertierung des Ergebnisses aus JSON-String in JavaScript-Objekte
  - Explizite Methoden für alle HTTP Methoden
- Dokumentation: https://github.com/sindresorhus/ky

**Beispiel:**

```typescript jsx

async function queryFn() {
	// .json darf direkt aufgerufen werden (ohne zusätzliches await)
    // Angabe des TypeScript-Typs direkt möglich
    // keine Überprüfung auf Fehler notwendig (wenn Return Code 4xx oder 5xx ist,
    // wird ein Error geworfen)
	const plants = await ky("http://localhost:7200/api/plants")
        .json<Plant[]>();
	return plants;
}
```

- Achtung: **Retry**!
  - ky hat einen Retry-Mechnanismus eingebaut. Wenn es beim Lesen der Daten zu Fehlern kommt, versucht, ky es automatisch erneut.  (https://github.com/sindresorhus/ky?tab=readme-ov-file#retry)
  - Auch TanStack Query hat so einen Mechanismus eingebaut. Wenn man beide verwendet, kommt es also zu "Dopplungen" beim Retry
  - Empfehlung: wenn du ky mit TanStack Query verwendest, _in ky retry Abschalten_`:
  - `ky.get("....", { retry: 0 })`
  - Das kann man grundsätzlich auch global mit `ky.extend` bzw. `ky.create` machen 
    - siehe https://github.com/sindresorhus/ky?tab=readme-ov-file#kyextenddefaultoptions
    - bzw. https://github.com/sindresorhus/ky?tab=readme-ov-file#kycreatedefaultoptions

### fetch

- Standard API im Browser (keine externe Bibliothek notwendig)
- API ist sehr low-level
  - Rückgabewert muss explizit überprüft werden (HTTP Fehler führen nicht zu Errors)
  - Bei POST muss Payload manuell in JSON-String überführt werden, Content-Type-Header explizit gesetzt werden
- Dokumentation: https://developer.mozilla.org/de/docs/Web/API/Fetch_API

**Beispiel:**

```typescript jsx

async function queryFn() {
	const response = await fetch("http://localhost:7200/api/plants");
	// im richtigen Leben hier noch check, ob response.ok ist
	const plants = await repsonse.json(); // Payload auslesen
    return plants as Plant[];
}
```

## Material

- TanStack Query
  - `useSuspenseQuery`: https://tanstack.com/query/latest/docs/framework/react/reference/useSuspenseQuery
  - Query Function: https://tanstack.com/query/v5/docs/framework/react/guides/query-functions
  - Query Keys: https://tanstack.com/query/latest/docs/framework/react/guides/query-keys
  - Query Client und Query Client Provider (bei uns schon in `main.tsx` registriert):
    - https://tanstack.com/query/v5/docs/reference/QueryClient
    - https://tanstack.com/query/v5/docs/framework/react/reference/QueryClientProvider
- ky: https://github.com/sindresorhus/ky
