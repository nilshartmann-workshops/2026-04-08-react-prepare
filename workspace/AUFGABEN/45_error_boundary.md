# Error Boundaries testen

## Dateien

- `src/App.browsertest.tsx` (erweitern)

## Aufgabe

Ergänze einen weiteren Test in `App.browsertest.tsx`, der das Verhalten der
`PlantErrorBoundary`-Komponente prüft.

Wenn das Backend einen Fehler zurückgibt (z.B. HTTP 500), wirft TanStack Query eine Exception.
Die `PlantErrorBoundary` fängt diese und zeigt statt der Pflanzenliste einen Fallback an.

Verwende `worker.use()` um für diesen einen Test einen Fehler-Handler zu registrieren:

```ts
worker.use(
  http.get("http://localhost:7200/api/plants", () =>
    new HttpResponse(null, { status: 500 }),
  ),
);
```

**Wichtig:** TanStack Query wiederholt fehlgeschlagene Requests standardmäßig dreimal.
Im Test führt das zu langen Wartezeiten. Erstelle für diesen Test einen eigenen `QueryClient`
mit `retry: false`:

```ts
const queryClient = new QueryClient({
  defaultOptions: { queries: { retry: false, refetchOnWindowFocus: false } },
});
```

**Hinweis:** React schreibt Fehler aus Error Boundaries immer auf die Konsole –
auch wenn sie korrekt behandelt werden. Das lässt sich im Test mit `vi.spyOn` unterdrücken:

```ts
vi.spyOn(console, "error").mockImplementation(() => {});
```

Dein Test soll prüfen:
- Der Fallback-Text "Etwas ist schiefgelaufen." erscheint
- Der "Erneut versuchen"-Button ist vorhanden

## Material

- `react-error-boundary`: https://github.com/bvaughn/react-error-boundary
- `vi.spyOn`: https://vitest.dev/api/vi.html#vi-spyon
- TanStack Query `retry`: https://tanstack.com/query/latest/docs/framework/react/guides/query-retries

## Tests ausführen

```bash
npm run test
```
