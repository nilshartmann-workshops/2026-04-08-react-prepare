# Suspense und Error Boundary

## Dateien

- `src/components/PlantErrorBoundary.tsx` (neu anlegen)
- `src/components/App.tsx`
- `src/components/PlantList.tsx`

## Aufgabe

`useSuspenseQuery` unterbricht beim Laden das Rendern (Suspense) und wirft bei Fehlern einen Error. Baue für deine Anwendungen einen Ladeindikator und Fehler-Fallback, um entsprechendes Feedback für die Nutzer auszugeben.

## Schritte


### 1. Suspense-Boundary einziehen

Mit der Komponente `<Suspense>` von React kannst du einen Platzhalter anzeigen, während eine Komponente noch Daten lädt. 
    - Das kannst du irgendwo in der Hierarchie über der unterbrochenen Komponente tun (ähnlich wie bei einem Exception-Handler)
    - Wo macht das in unserer Anwendung fachlich für dich am meisten Sinn? 
    - Such die für dich passende Stelle und wrappe den Komponentenbaum mit `<Suspense>`
    - Um die Fallback-Komponente zu testen, kannst du `?slow=2000` an die URL im Query hängen (oder alternativ React Dev Tools verwenden)

### 2. `PlantErrorBoundary` erstellen

Um Fehler aufzufangen, die beim Rendern entstehen, verwendet man eine `ErrorBoundary`-Komponente (ählich wie ein `catch`-Block bei Funktionen).
- Lege die Komponente `src/components/PlantErrorBoundary.tsx` an.
- Verwende darin `ErrorBoundary` aus `react-error-boundary` und nutze den `onError`-Callback um den Fehler auf der Konsole auszugeben.
- Gib außerdem mit `fallbackRender` eine Komponente an, die eine Fehlermeldung für den Nutzer ausgibt.
- `fallbackRender` bekommt neben `error` auch `resetErrorBoundary` übergeben – damit kannst du einen "Erneut versuchen"-Button anbieten, der die Boundary zurücksetzt und die Komponente neu rendert.
- Auch hier gibt es mehrere Möglichkeiten, wo du die `PlantErrorBoundary`-Komponente einziehen kannst - so lange sie oberhalb der Komponente liegt, in der der Fehler auftritt.
- Um einen Fehler zu simulieren, kannst du den zod-Typen anpassen oder das Backend vorübergehend ausschalten.

## Material

- React Suspense: https://react.dev/reference/react/Suspense
- Error Boundaries: https://react.dev/reference/react/Component#catching-rendering-errors-with-an-error-boundary
  - react-error-boundary Komponente: https://github.com/bvaughn/react-error-boundary
- `ky` spezifische Error-Objekte: https://github.com/sindresorhus/ky/blob/main/readme.md#httperror
