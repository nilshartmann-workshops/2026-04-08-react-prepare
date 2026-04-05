# Logging – Diskussion & Überblick

## Einstiegsfragen

- Was nutzt ihr aktuell für Logging/Monitoring?
- Wo gehen bei euch Fehler verloren (unbehandelte Promises, Error Boundaries ohne Reporting)?
- Was fehlt euch konkret (Fehleranalyse, Performance, fachliche Events)?

---

## Was gutes Logging ausmacht

- **Strukturiert** – JSON statt freier Text, damit Logs auswertbar sind
- **Log-Level** – error / warn / info / debug – nicht alles ist gleich wichtig
- **Kontext** – Wer war eingeloggt? Welche Route? Welche Aktion hat den Fehler ausgelöst?
- **Fehler nicht verschlucken** – kein `catch (e) { /* todo */ }` 
- keine personenbezogenen Daten in Logs

---

## Der React-spezifische Aufhänger: Error Boundary

`onError` in der Error Boundary ist der natürliche Ort für Fehler-Logging (haben wir schon gesehen):

```tsx
<ErrorBoundary
  onError={(error, info) => {
    logger.error("React Error Boundary", {
      message: error.message,
      stack: error.stack,
      componentStack: info.componentStack,
    });
  }}
>
```

---

## Optionen

- **Sentry** 
- **Eigener Logger + Backend-Endpoint** 
- **console.error strukturiert wrappen** 

---

## Minimales Beispiel: eigener Logger

```ts
// src/shared/logger.ts
const logger = {
  error(message: string, context?: Record<string, unknown>) {
    console.error(JSON.stringify({ level: "error", message, ...context, ts: new Date().toISOString() }));
    // hier: fetch an eigenen Log-Endpoint oder Sentry.captureException(...)
  },
  warn(message: string, context?: Record<string, unknown>) {
    console.warn(JSON.stringify({ level: "warn", message, ...context, ts: new Date().toISOString() }));
  },
};

export default logger;
```

---

## Weiterführende Links

- Sentry für React: https://docs.sentry.io/platforms/javascript/guides/react/
- React Error Boundary + Sentry: https://docs.sentry.io/platforms/javascript/guides/react/features/error-boundary/
