import { useMutation, useQueryClient } from "@tanstack/react-query";
import ky, { HTTPError } from "ky";
import { useState } from "react";

import IntervalSelector from "./IntervalSelector.tsx";

export default function PlantForm() {
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [wateringInterval, setWateringInterval] = useState(1);

  const queryClient = useQueryClient();

  const { mutate, isPending, error, isSuccess } = useMutation({
    mutationFn() {
      return ky
        .post("http://localhost:7200/api/plants", {
          json: { name, location, wateringInterval },
          retry: 0,
        })
        .json();
    },
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ["plants"] });
    },
  });

  return (
    <form>
      <div className={"FormControl"}>
        <label htmlFor="name">Name der Pflanze</label>
        <input
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className={"FormControl"}>
        <label htmlFor="location">Standort</label>
        <input
          id="location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
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

      {isSuccess && <p className={"success-message"}>Pflanze angelegt!</p>}
    </form>
  );
}
