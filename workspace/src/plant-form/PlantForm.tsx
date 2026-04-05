import { useMutation } from "@tanstack/react-query";
import ky, { HTTPError } from "ky";
import { useState } from "react";

import IntervalSelector from "./IntervalSelector.tsx";

export default function PlantForm() {
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [wateringInterval, setWateringInterval] = useState(1);

  const { mutate, isPending, error } = useMutation({
    async mutationFn() {
      try {
        return await ky
          .post("http://localhost:7200/api/plants", {
            json: { name, location, wateringInterval },
            retry: 0,
          })
          .json();
      } catch (e) {
        if (e instanceof HTTPError) {
          // ky wirft HTTPError bei nicht-erfolgreichen HTTP-Status-Codes.
          // Der Response-Body enthält oft eine aussagekräftigere Fehlermeldung.
          const body = await e.response.json<{ error?: string }>();
          throw new Error(body.error ?? e.message);
        }
        throw e;
      }
    },
  });

  return (
    <form>
      <div className={"FormControl"}>
        <label>Name der Pflanze</label>
        <input value={name} onChange={(e) => setName(e.target.value)} />
      </div>
      <div className={"FormControl"}>
        <label>Standort</label>
        <input value={location} onChange={(e) => setLocation(e.target.value)} />
      </div>

      <IntervalSelector
        interval={wateringInterval}
        onIntervalChange={(newWateringInterval) =>
          setWateringInterval(newWateringInterval)
        }
      />

      {error && <p className={"error-message"}>{error.message}</p>}

      <div className={"FormButtons"}>
        <button
          type={"button"}
          className={"primary"}
          disabled={isPending}
          onClick={() => mutate()}
        >
          Pflanze hinzufügen 🌱
        </button>
      </div>
    </form>
  );
}
