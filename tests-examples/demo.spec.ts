import { test, expect } from "@playwright/test";

test("test", async ({ page }) => {
  await page.goto("https://demo.playwright.dev/todomvc/");
  await page.goto("https://demo.playwright.dev/todomvc/#/");
  await page.getByPlaceholder("What needs to be done?").click();
  await page.getByPlaceholder("What needs to be done?").fill("데모 만들");
  await page.getByPlaceholder("What needs to be done?").press("Enter");
  await page.getByRole("button", { name: "Delete" }).click();
  await page.getByPlaceholder("What needs to be done?").dblclick();
  await page.getByPlaceholder("What needs to be done?").fill("데모 만들기");
  await page.getByPlaceholder("What needs to be done?").press("Enter");
  await page.getByPlaceholder("What needs to be done?").fill("");
  await page.getByPlaceholder("What needs to be done?").press("CapsLock");
});
