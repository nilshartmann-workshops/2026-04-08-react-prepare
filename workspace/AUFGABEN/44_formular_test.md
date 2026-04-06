# Formular testen mit MSW

## Dateien

- `src/plant-form/PlantForm.tsx` (anpassen: `htmlFor`/`id` für Labels)
- `src/plant-form/PlantForm.browsertest.tsx` (anlegen)

## Aufgabe

Schreibe Tests für das `PlantForm`-Formular. 

## Schritte 

## 1. Labels im Formular korrigieren

- Im Formular sind die `label` und `input`-Element _nicht_ verknüpft. Das ist schlecht für Barrierefreiheit (Screenreader weiß nicht, welches Label zu welchem Textfeld gehört)
  - Verknüpfe im Formular die `label` und `input`-Elemente.
    - Jedes `input`-Element braucht eine `id`, das `label` wird dann darüber mit `htmlFor` zugeordnet

## 2. MSW konfigurieren

- Richte MSW ein (wie in der vergangenen Übung)
  - Du brauchst in `setupWorker()` keinen Hanlder zu konfigurieren, wir konfigurieren die Handler dieses Mal direkt im Test.

## 3. Schreibte zwei Tests:

1. Happy Path:
   - Alle Felder ausfüllen
   - Button klicken
   - Der Request wird vom Formular abgesendet (Mutation). 
     - Konfiguriere mit `worker.use()` einen `POST`-Handler:
       - er muss Pflanzendaten zurückliefern (nicht wichtig, dass die korrekt sind - wir machen mit dem Ergebnis nichts)
       - er muss als Status `201` (CREATED) zurückliefern
   - Prüfe, dass während der Request läuft, der Button disabled ist (`toBeDisabled()`)
   - Füge im Formular eine Meldung hinzu, wenn die Mutation erfolgreich war ("Pflanze angelegt!") (`mutation.isSuccess`)
   - Prüfe im Test, dass diese Meldung dargestellt wird
2. Fehlerfall:
   - Analog wie oben, aber:
   - dein MSW-Handler soll hier einen Fehler zurückleifern (z.B. Status 422)
   - dann soll die Fehlermeldung im Formular (`mutation.error` bzw. `mutation.isError`) ausgegeben werden

- Suche Felder und Button anhand ihrer Aria-Rollen (z.B. mit `getByLabelText` und Buttons mit `getByRole`).

## Material

- Label mit Input assoziieren: 
  - https://react.dev/reference/react-dom/components/input#providing-a-label-for-an-input
  - `htmlFor`: https://developer.mozilla.org/en-US/docs/Web/API/HTMLLabelElement/htmlFor
- Vitest Locators:
  - `getByLabelText`: https://vitest.dev/api/browser/locators.html#getbylabeltext
  - `getByRole`: https://vitest.dev/api/browser/locators.html#getbyrole
  - `getByText`: https://vitest.dev/api/browser/locators.html#getbytext
- Assertions:
  - `toBeDisabled()`: https://vitest.dev/guide/browser/assertion-api
  - `toBeInTheDocument()`: https://vitest.dev/api/browser/assertions.html#tobeinthedocument
- MSW: 
  -  Handler im Test hinzufügen `worker.use()`: https://mswjs.io/docs/api/setup-worker/use
  - Fehlercodes zurückliefern: https://mswjs.io/docs/api/http-response#httpresponsejsonbody-init


## Tests ausführen

```bash
npm run test
```
