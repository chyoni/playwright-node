import test, { expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  // ! polling은 아래 예시처럼, 어떤 request를 요청하고 response로 200을 받을 때까지 기다린 후 assertion한다.
  await expect
    .poll(
      async () => {
        const response = await page.goto("https://github.com/signup");
        return response?.status();
      },
      {
        message: "Make sure page return code : 200",
        timeout: 10000,
      }
    )
    .toBe(200);
});

// ! Group tests
test.describe("two tests", () => {
  // ! Conditionally skip a group of tests
  test.skip(({ browserName }) => browserName !== "chromium", "Chromium only!");

  test("one", async ({ page }) => {
    await page
      .getByText("Welcome to GitHub!Let's begin the adventure")
      .isVisible();
  });

  test("two", async ({ page }) => {
    await expect(page.getByText("NO")).toBeVisible();
  });
});
