import { HTTPError } from "ky";
import { ErrorBoundary } from "react-error-boundary";

type Props = { children: React.ReactNode };

export default function PlantErrorBoundary({ children }: Props) {
  return (
    <ErrorBoundary
      onError={(error) => {
        // ky wirft HTTPError bei nicht-erfolgreichen HTTP-Statuscodes.
        // Darüber kommt man an Status-Code und Response-Body heran –
        // nützlich zum Loggen (z.B. an Sentry).
        if (error instanceof HTTPError) {
          console.error(
            `[PlantErrorBoundary] HTTP ${error.response.status}: ${error.message}`,
          );
        } else {
          console.error("[PlantErrorBoundary] Fehler aufgetreten:", error);
        }
      }}
      fallbackRender={({ error, resetErrorBoundary }) => (
        <div className={"ErrorFallback"}>
          <p>Etwas ist schiefgelaufen.</p>
          <p>
            {error instanceof HTTPError
              ? `HTTP-Fehler ${error.response.status}`
              : error.message}
          </p>
          <button type={"button"} onClick={resetErrorBoundary}>
            Erneut versuchen
          </button>
        </div>
      )}
    >
      {children}
    </ErrorBoundary>
  );
}
