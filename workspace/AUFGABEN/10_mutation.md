# Mutation – Pflanze anlegen

## Dateien

- `src/components/PlantForm.tsx`

## Aufgabe

Das Formular hat noch keinen funktionierenden Speichern-Button. Implementiere das Anlegen einer neuen Pflanze mit `useMutation`.

## Schritte

### 1. `useMutation` einrichten

Implementiere in `PlantForm` eine Mutation mit `useMutation`.
- Die `mutationFn` soll einen `POST`-Request an `http://localhost:7200/api/plants` schicken
- Der Payload muss ein Objekt mit den  aktuellen Formulardaten als JSON-Body sein (`{ name, location, wateringInterval }`)
- Du kannst `ky.post` verwenden (oder alternativ fetch, s.u.)

### 2. Button und Feedback

- **Optional** wenn noch Zeit ist:
  - Deaktiviere den Button während die Mutation läuft (`isPending`)
    - Um die Mutation künstlich zu verlangsamen, kannst du `?slow=2000` an die URL hängen
  - Zeige eine Fehlermeldung an, wenn die Mutation fehlschlägt (`error`)
     - Das Backend lehnt eine Pflanze ab, wenn `name` nur Großbuchstaben enthält. Teste den Fehlerfall.
  - Zeige eine Meldung an, wenn die Mutation erfolgreich war (`isSuccess`)

## Material

- `useMutation`: https://tanstack.com/query/latest/docs/framework/react/reference/useMutation

## Ausführen von POST Request

**Mit ky**
```typescript
    return ky
	.post("http://localhost:7200/api/plants", { // HTTP Methode
		// HTTP Heaer wird autom. gesetzt bei "json"
		// Payload wird automatisch serialisiert
		json:  {name, location, wateringInterval},
		retry: 0,
	})
	// Im Fehlerall fliegt automatisch ein Error
	.json();

```

**Mit fetch**
```typescript
  return fetch("http://localhost:7200/api/plants", {
  method:  "POST", // HTTP Methode setzen
  headers: {
    "content-type": "application/json"  // Content-Type-Header
  },
  body:    JSON.stringify({name, location, wateringInterval}) // Payload serialisieren
})
        .then(response => {
          if (!response.ok()) {
            // Fehlerbehandlung
            // TanStack Query erwartet, dass das Promise von `mutationFn` rejected wird im Fehlerfall
            throw new Error(response.statusText);
          }

          return response.json();
        })
```
