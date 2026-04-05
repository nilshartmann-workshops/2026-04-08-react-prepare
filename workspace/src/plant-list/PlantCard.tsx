import { useMutation, useQueryClient } from "@tanstack/react-query";
import dayjs from "dayjs";
import ky from "ky";

import { getDaysUntilWatering } from "../shared/date-utils.ts";
import { plantsQueryOptions } from "./plantsQueryOptions.ts";
import { selectIsFavorite, useFavoritesStore } from "./useFavoritesStore.ts";

type PlantCardProps = {
  id: string;
  name: string;
  location: string;
  wateringInterval: number;
  lastWatered?: string;
};

export default function PlantCard({
  id,
  name,
  location,
  wateringInterval,
  lastWatered,
}: PlantCardProps) {
  // Externer Selector aus der Store-Datei – wiederverwendbar und testbar
  const isFavorite = useFavoritesStore(selectIsFavorite(id));
  const toggleFavorite = useFavoritesStore((state) => state.toggleFavorite);

  const queryClient = useQueryClient();
  const { mutate: markAsWatered, isPending } = useMutation({
    async mutationFn() {
      return ky
        .put(`http://localhost:7200/api/plants/${id}/lastWatered`, {
          json: { lastWatered: new Date().toISOString() },
          retry: 0,
        })
        .json();
    },
    async onMutate() {
      // Laufende Refetches abbrechen, damit sie das optimistische Update nicht überschreiben
      await queryClient.cancelQueries(plantsQueryOptions());

      // Snapshot des aktuellen Cache-Inhalts für den Rollback-Fall
      const previousPlants = queryClient.getQueryData(
        plantsQueryOptions().queryKey,
      );

      // Cache optimistisch aktualisieren
      queryClient.setQueryData(plantsQueryOptions().queryKey, (plants) =>
        plants?.map((p) =>
          p.id === id ? { ...p, lastWatered: new Date().toISOString() } : p,
        ),
      );

      return { previousPlants };
    },
    onError(_error, _variables, context) {
      // Bei Fehler: Cache auf den Snapshot zurücksetzen
      queryClient.setQueryData(
        plantsQueryOptions().queryKey,
        context?.previousPlants,
      );
    },
    onSettled() {
      // Nach Abschluss (Erfolg oder Fehler): mit Server synchronisieren
      queryClient.invalidateQueries(plantsQueryOptions());
    },
  });

  const wateringInfo =
    wateringInterval === 1
      ? "Jeden Tag gießen!"
      : `Alle ${wateringInterval} Tage gießen`;

  const lastWateredMsg = lastWatered ? (
    <div>
      Zuletzt: {dayjs(lastWatered).locale("de").format("DD.MM.YYYY HH:mm.ss")}
    </div>
  ) : (
    <div>Noch nicht gegossen 🍂</div>
  );

  const daysUntilWatering = lastWatered
    ? getDaysUntilWatering(lastWatered, wateringInterval)
    : null;

  const wateringMsg = daysUntilWatering !== null && (
    <div>
      {daysUntilWatering > 0
        ? `Noch ${daysUntilWatering} Tage bis zum Gießen`
        : daysUntilWatering === 0
          ? "Heute gießen!"
          : `Überfällig seit ${Math.abs(daysUntilWatering)} Tag(en)`}
    </div>
  );

  return (
    <div className={"PlantCard"}>
      <header>
        <h2>{name}</h2>
        <div>📍{location}</div>
        <button onClick={() => toggleFavorite(id)}>
          {isFavorite ? "💚 Favorit" : "🤍 Favorit"}
        </button>
      </header>
      <section>
        <div>{wateringInfo}</div>
        {lastWateredMsg}
        {wateringMsg}
        <button
          type={"button"}
          disabled={isPending}
          onClick={() => markAsWatered()}
        >
          💧 Jetzt gegossen
        </button>
      </section>
    </div>
  );
}
