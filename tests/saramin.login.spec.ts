import { test, expect } from "@playwright/test";

// ! 각 테스트마다 실행 전 먼저 선행되는 과정
test.beforeEach(async ({ page }) => {
  // ! browser size 조절
  await page.setViewportSize({
    width: 1600,
    height: 1200,
  });
  // ! URL http://127.0.0.1:8080/ 이동
  await page.goto("https://www.saramin.co.kr/zf_user/");
});

test("test", async ({ page }) => {
  page.once("dialog", (dialog) => {
    console.log(`Dialog message: ${dialog.message()}`);
    dialog.accept().catch(() => {});
  });

  // await page.once("dialog", async (dialog) => {
  //   await page.waitForTimeout(1500);
  //   dialog.accept();
  // }); //alert popup accept:확인, permiss:취소

  await page.getByRole("link", { name: "로그인" }).click();
  await page.waitForTimeout(1700);
  await page.getByRole("textbox", { name: "아이디" }).click();
  // ! 비밀번호 입력 안하고 로그인
  await page.getByRole("textbox", { name: "아이디" }).fill("rkrp3692");
  await page.waitForTimeout(1700);
  await page.getByRole("button", { name: "로그인" }).click();
  await page.waitForTimeout(1700);

  // ! 비밀번호 입력 잘못 (형식1 X 길이)
  await page.getByLabel("비밀번호").click();
  await page.getByLabel("비밀번호").fill("a");
  await page.waitForTimeout(1700);
  await page.getByRole("button", { name: "로그인" }).click();
  await page.waitForTimeout(1700);

  // ! 비밀번호 입력 잘못 (형식2 X 문자없이)
  await page.getByLabel("비밀번호").click();
  await page.getByLabel("비밀번호").fill("12345678");
  await page.waitForTimeout(1700);
  await page.getByRole("button", { name: "로그인" }).click();
  await page.waitForTimeout(1700);

  // ! 비밀번호 입력 잘못 (형식3 X 특수문자)
  await page.getByRole("textbox", { name: "아이디" }).click();
  await page.getByRole("textbox", { name: "아이디" }).fill("rkrp3692");
  await page.waitForTimeout(1700);
  await page.getByLabel("비밀번호").click();
  await page.getByLabel("비밀번호").fill("abcd1234");
  await page.waitForTimeout(1700);
  await page.getByRole("button", { name: "로그인" }).click();

  // ! 제대로 입력
  await page.getByRole("textbox", { name: "아이디" }).click();
  await page.getByRole("textbox", { name: "아이디" }).fill("rkrp3692");
  await page.waitForTimeout(1700);
  await page.getByLabel("비밀번호").click();
  await page.getByLabel("비밀번호").fill("tbell0518!");
  await page.waitForTimeout(1700);
  const loginSuccessNavigate = page.waitForEvent("domcontentloaded");
  await page.getByRole("button", { name: "로그인" }).click();
  await loginSuccessNavigate;

  // ! 로그인 화면 확인
  await expect(
    page.locator(
      "#content > div.wrap_my_home > div.wrap_title_box > h1 > strong"
    )
  ).toContainText("장진호");
  await page.waitForTimeout(1700);
});
