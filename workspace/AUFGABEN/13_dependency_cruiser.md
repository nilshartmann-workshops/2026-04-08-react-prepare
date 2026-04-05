# Dependency Cruiser: Abhängigkeiten anzeigen

- `npx dependency-cruiser --init`
- `npx depcruise src --include-only "^src" --output-type dot | dot -T svg > dependency-graph.svg`


# Andere Architekturfragen

- Services? Wie würde man sowas machen? Überhaupt machen?
- Systemgrenzen mit `zod` sichern
  - Gilt auch z.B. für Formulare, Werte aus der URL oder aus Local/Session-Storage
  - 