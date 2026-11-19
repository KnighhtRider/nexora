import { expect, test as base } from "@playwright/test";

/**
 * Console guard: any console error, page error or hydration warning fails the
 * test that produced it. Quiet bugs are the expensive ones.
 */
export const test = base.extend({
  page: async ({ page }, use) => {
    const problems: string[] = [];

    page.on("console", (message) => {
      if (message.type() === "error") {
        problems.push(`console.error: ${message.text()}`);
      }
    });
    page.on("pageerror", (error) => {
      problems.push(`pageerror: ${error.message}`);
    });
    page.on("requestfailed", (request) => {
      // Aborted requests during navigation are noise, not bugs.
      if (request.failure()?.errorText === "net::ERR_ABORTED") return;
      problems.push(`requestfailed: ${request.url()}`);
    });

    await use(page);

    expect(problems, "console / network errors during the test").toEqual([]);
  },
});

export { expect };
