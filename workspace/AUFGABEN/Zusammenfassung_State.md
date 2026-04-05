# Statemanagement

- Ziel: Renderings so weit wie möglich optimieren
  - Selector-Funktionen sind typisch

# Mehrere Arten von State:

- Lokal (`useState`)
- Global: Zustand und Context
- serverseitigen State (TanStack Query)
- State in der URL (Pfad, Suchparameter)
- plus: Cookies, Session Storage, Local Storage

# "Persistenz" von State
- Lobal und global: in neuem Tab und bei Page Reload weg
- serverseitiger State bleibt erhalten
- URL bleibt erhalten (teilweise)
- Cookies etc. teilweise erhalten
  - Nur serverseitiger State sorgt dafür, dass Informationen verlässlich dauerthaft erhalten bleiben, **auch über mehrere Geräte/Sessions**

# Am Whiteboard: was passt wohin
- Beispiele aus der Anwendung:
  - Aktiver Tab
  - Favoriten
- Beispiele, die nicht in der Anwendung vorhanden sind:
    - Sortier- und Filterkriterien einer Liste
    - Theme, Locale, Zeitzone
  
