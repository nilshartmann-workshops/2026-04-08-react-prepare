import { QueryClientProvider } from "@tanstack/react-query";
import { http, HttpResponse } from "msw";
import { setupWorker } from "msw/browser";
import { afterEach, beforeAll, expect, it } from "vitest";
import { render } from "vitest-browser-react";

import { createQueryClient } from "../create-query-client.tsx";
import PlantForm from "./PlantForm.tsx";

const worker = setupWorker();

beforeAll(async () => await worker.start());
afterEach(() => worker.resetHandlers());

function renderForm() {
  return render(
    <QueryClientProvider client={createQueryClient()}>
      <PlantForm />
    </QueryClientProvider>,
  );
}

it("sendet das Formular erfolgreich ab", async () => {
  worker.use(
    http.post("http://localhost:7200/api/plants", () =>
      HttpResponse.json({ id: "99" }, { status: 201 }),
    ),
  );

  const screen = await renderForm();

  await screen.getByLabelText("Name der Pflanze").fill("Basilikum");
  await screen.getByLabelText("Standort").fill("Küche");
  await screen.getByRole("button", { name: /Pflanze hinzufügen/ }).click();

  // Button ist während des Requests deaktiviert
  await expect
    .element(screen.getByRole("button", { name: /Pflanze hinzufügen/ }))
    .toBeDisabled();

  await expect
    .element(screen.getByText(/Pflanze angelegt/i))
    .toBeInTheDocument();
});

it("zeigt eine Fehlermeldung wenn das Speichern fehlschlägt", async () => {
  worker.use(
    http.post("http://localhost:7200/api/plants", () =>
      HttpResponse.json({ error: "Invalid name" }, { status: 422 }),
    ),
  );

  const screen = await renderForm();

  await screen.getByLabelText("Name der Pflanze").fill("BASILIKUM");
  await screen.getByLabelText("Standort").fill("Küche");
  await screen.getByRole("button", { name: /Pflanze hinzufügen/ }).click();

  await expect.element(screen.getByRole("paragraph")).toBeInTheDocument();
});
