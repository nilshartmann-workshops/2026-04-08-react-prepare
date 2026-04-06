# Performance – Überblick & Demo

## Performance Ebenen

- 🤔Wo geht Performance verloren? Was ist relevant für unsere Anwendung?

| Ebene | Beispiel | Werkzeug |
|-------|---------|----------|
| **Render-Anzahl** | Komponente rendert öfter als nötig | React DevTools Profiler |
| **Render-Dauer** | Ein Render dauert zu lange | React DevTools Profiler |
| **Bundle-Größe** | Zu viel JS wird initial geladen | Vite Bundle Analyzer, Network Tab |
| **Backend-Latenz** | API-Requests dauern zu lange | Network Tab, Backend Profiling |
| **Request-Parallelisierung** | Requests werden sequenziell statt parallel ausgeführt | Network Tab (Wasserfalldiagramm) |
| **Bildgrößen / CSS** | Große unkomprimierte Assets | Lighthouse, Network Tab |

**Thesen**
- React ist meistens schnell Genug
- Meistens ist das Backend das Bottleneck, nicht React 
  - zu viele Daten (oder zu wenig Daten) in einem Request
  - Langsame Verarbeitung
- Nicht "auf Vorrat" optimieren! Optimierung kostet:
  - Code wird komplexer
  - Code wird u.U. sogar langsamer (Caching-Overhead!)
---

## `useMemo` / `useCallback` / `React.memo`

- Sinnvoll wenn: teure Berechnungen, stabile Referenzen für `useEffect`/`memo`-Deps
- Meist übertrieben: React ist von Haus aus schnell, unnötige Memo-Wrapper kosten auch etwas
- **React Compiler** (relativ neu): automatische Memoization, macht `useMemo`/`useCallback` in vielen Fällen überflüssig
  - Tipp: ausprobieren!

---

## Demo: Lazy Loading + Prefetching

### Vorereitung: Build machen

```bash
npm run build
npm run preview
```
### Ablauf

`React.lazy()` + dynamische `import()`-Aufrufe → Vite baut separate JS-Chunks für
`PlantList` und `PlantForm`. Diese werden erst geladen wenn der Tab geklickt wird.

```tsx
const PlantList = lazy(() => import("./plant-list/PlantList.tsx"));
const PlantForm = lazy(() => import("./plant-form/PlantForm.tsx"));
```

**Hinweis**: React Router und TanStack Router bieten das **out-of-the-box**!

### Prefetching mit TanStack Query

Daten können geladen werden bevor die Komponente sichtbar ist:

```tsx
const queryClient = useQueryClient();
queryClient.prefetchQuery(plantsQueryOptions());
```

**Hinweis** Router bieten das out-of-the-box und sogar noch weiter optimiert:
    - Laden der Daten schon **bevor** die Komponente sichtbar wird
    - z.B. bei "Mouse over"

---

## Weiterführende Links

- React.lazy: https://react.dev/reference/react/lazy
- React Compiler: https://react.dev/learn/react-compiler
- TanStack Query prefetchQuery: https://tanstack.com/query/latest/docs/reference/QueryClient#queryclientprefetchquery
