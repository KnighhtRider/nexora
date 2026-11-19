import { expect, test } from "./fixtures";

const viewports = [
  { width: 375, height: 812 },
  { width: 768, height: 1024 },
  { width: 1280, height: 800 },
  { width: 1440, height: 900 },
  { width: 1920, height: 1080 },
] as const;

for (const viewport of viewports) {
  test(`@visual design-system gallery and shell at ${viewport.width}px`, async ({ page }) => {
    await page.setViewportSize(viewport);
    const response = await page.goto("/design-system");

    expect(response?.status()).toBe(200);
    await expect(page).toHaveTitle("Design System | The Intelligence Behind Business.");
    await expect(page.getByRole("heading", { level: 1 })).toHaveCount(1);
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute("content", /noindex/);
    await expect(page.locator("main#main")).toBeVisible();

    await expect(page).toHaveScreenshot(`design-system-${viewport.width}.png`, {
      fullPage: true,
      animations: "disabled",
    });
  });
}
