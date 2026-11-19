import AxeBuilder from "@axe-core/playwright";

import { expect, test } from "./fixtures";

test("home returns 200 with one H1 and no console errors", async ({ page }) => {
  const response = await page.goto("/");

  expect(response?.status()).toBe(200);

  const headings = page.getByRole("heading", { level: 1 });
  await expect(headings).toHaveCount(1);
  await expect(headings).toHaveText("Intelligence that moves business forward.");

  await expect(page.locator("main#main")).toBeVisible();
  await expect(page).toHaveTitle("NEXORA AI");
});

test("@a11y home has no serious or critical axe violations", async ({ page }) => {
  await page.goto("/");

  const results = await new AxeBuilder({ page }).analyze();
  const blocking = results.violations.filter(
    (violation) => violation.impact === "serious" || violation.impact === "critical",
  );

  expect(
    blocking.map(
      (violation) =>
        `${violation.id} (${violation.impact}): ${violation.help} → ${violation.nodes
          .map((node) => node.target.join(" "))
          .join(", ")}`,
    ),
  ).toEqual([]);
});
