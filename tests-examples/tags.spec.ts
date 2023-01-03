import test from "@playwright/test";

test("Test @run", async ({ page }) => {
  await page.goto("https://github.com/signup");
});

test("Test @notrun", async ({ page }) => {
  await page.goto("https://github.com/login");
});
