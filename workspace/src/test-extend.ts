import { test as testBase } from "vitest";

import { worker } from "./mocks/browser.ts";

export const test = testBase.extend<{ worker: typeof worker }>({
  worker: [
    // eslint-disable-next-line no-empty-pattern
    async ({}, use) => {
      await worker.start();
      await use(worker);
      worker.resetHandlers();
      worker.stop();
    },
    { auto: true },
  ],
});
