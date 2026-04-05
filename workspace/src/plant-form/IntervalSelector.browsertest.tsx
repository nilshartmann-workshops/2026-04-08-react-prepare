import { expect, it, vi } from "vitest";
import { render } from "vitest-browser-react";

import IntervalSelector from "./IntervalSelector.tsx";

it("ruft onIntervalChange mit dem eingegebenen Wert auf", async () => {
  const onIntervalChangeMock = vi.fn();

  const screen = await render(
    <IntervalSelector onIntervalChange={onIntervalChangeMock} interval={123} />,
  );

  await expect.element(screen.getByText("123")).toBeInTheDocument();

  await screen.getByRole("spinbutton").fill("456");

  expect(onIntervalChangeMock).toHaveBeenCalledWith(456);
});

it("ruft onIntervalChange beim Klick auf einen Schnellwahl-Button auf", async () => {
  const onIntervalChangeMock = vi.fn();

  const screen = await render(
    <IntervalSelector onIntervalChange={onIntervalChangeMock} interval={1} />,
  );

  await screen.getByRole("button", { name: "Biweekly" }).click();

  expect(onIntervalChangeMock).toHaveBeenCalledWith(14);
});
