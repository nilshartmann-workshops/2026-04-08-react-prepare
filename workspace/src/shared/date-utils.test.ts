import { afterEach, beforeEach, expect, it, vi } from "vitest";

import { getDaysUntilWatering } from "./date-utils.ts";

beforeEach(() => {
  // Systemzeit einfrieren, damit Tests immer dasselbe Ergebnis liefern
  vi.useFakeTimers();
  vi.setSystemTime(new Date(2025, 11, 20)); // 20.12.2025 (Monate sind 0-basiert!)
});

afterEach(() => {
  vi.useRealTimers();
});

it("gibt verbleibende Tage zurück, wenn Gießen noch aussteht", () => {
  // Zuletzt gegossen am 18.12., Intervall 7 Tage → noch 5 Tage Zeit
  expect(getDaysUntilWatering("2025-12-18", 7)).toBe(5);
});

it("gibt negative Tage zurück, wenn Gießen überfällig ist", () => {
  // Zuletzt gegossen am 10.12., Intervall 7 Tage → 3 Tage überfällig
  expect(getDaysUntilWatering("2025-12-10", 7)).toBe(-3);
});
