import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("https://github.com/signup");
});

test("signup with invalid password", async ({ page }) => {
  await page
    .getByText("Welcome to GitHub!Let’s begin the adventure")
    .isVisible();

  await page.waitForTimeout(1500);
  await page.getByLabel("Enter your email e.g. monalisa@github.com").click();
  await page.waitForTimeout(1500);
  await page
    .getByLabel("Enter your email e.g. monalisa@github.com")
    .fill("chiwon99881@gmail.com");

  await page.waitForTimeout(1500);
  await page.getByRole("button", { name: "Continue" }).isDisabled();
  await page.waitForTimeout(1500);
  await page.getByText("Email is invalid or already taken").isVisible();

  await page.waitForTimeout(1500);
  await page
    .getByLabel("Enter your email e.g. monalisa@github.com")
    .fill("chiwon99881@abc.com");
  await page.waitForTimeout(1500);

  await page.getByRole("button", { name: "Continue" }).isEnabled();
  await page.getByRole("button", { name: "Continue" }).click();
  await page.waitForTimeout(1500);
  await page.getByText("Create a password").isVisible();
  await page.getByLabel("Create a password").fill("1234");
  // //! 너무 짧다는 패스워드 에러문구 표시
  await page.waitForTimeout(1500);
  await page.getByText("Password is too short").isVisible();
  // // ! Continue 버튼 비활성화
  await page.getByRole("button", { name: "Continue" }).isDisabled();

  await page.waitForTimeout(1500);
  await page.getByLabel("Create a password").fill("abcdefgh");
  await page.waitForTimeout(1500);
  // //! 패스워드 조합에 대한 에러문구 표시
  await page
    .getByText("Password needs a number and lowercase letter")
    .isVisible();
  // // ! Continue 버튼 비활성화
  await page.waitForTimeout(1500);
  await page.getByRole("button", { name: "Continue" }).isDisabled();
  await page.waitForTimeout(1500);
  await page.getByLabel("Create a password").fill("qwer1234!@");
  // ! 흔한 패스워드에 대한 에러문구 표시
  await page.getByText("Password may be compromised").isVisible();
  // ! Continue 버튼 비활성화
  await page.waitForTimeout(1500);
  await page.getByRole("button", { name: "Continue" }).isDisabled();
  await page.waitForTimeout(1500);
  await page.getByLabel("Create a password").fill("abcdefg12345!!@@");
  await page.waitForTimeout(1500);
  await page.getByText("Password is strong").isVisible();
  await page.waitForTimeout(1500);
  await page.getByRole("button", { name: "Continue" }).isEnabled();
  await page.getByRole("button", { name: "Continue" }).click();

  await page.getByText("Enter a username").isVisible();
});
