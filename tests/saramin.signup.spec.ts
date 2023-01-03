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
  await page.waitForTimeout(2000);
  // ! elements
  const idInput = page.locator("#id");
  const idInvalidMsg = page.locator("#idCheckMsg1");
  const idValidMsg = page.locator("#idCheckMsg2");
  const pwInput = page.locator("#password1");
  const pwInvalidMsg = page.locator("#password1_warning_txt");
  const pwValidMsg = page.locator("#password1_good_txt");
  const nameInput = page.locator("#user_nm");
  const nameInvalidMsg = page.locator("#user_nm_msg");
  const birthInput = page.locator("#birth_date");
  const birthInvalidMsg = page.locator("#cyr_msg");
  const phoneInput = page.locator("#sms_cellnum");

  await page.getByRole("link", { name: "로그인" }).click();
  await page.waitForTimeout(1700);
  await page.getByRole("link", { name: "회원가입" }).click();
  await page.waitForTimeout(1700);
  await page.getByRole("button", { name: "사람인 아이디 만들기" }).click();
  await page.waitForTimeout(1700);

  await idInput.click();
  await page.waitForTimeout(1700);
  await idInput.fill("a");
  await pwInput.click();
  await page.waitForTimeout(1700);
  // ! id validation (4 ~ 20자)
  await expect(idInvalidMsg).toContainText("4 ~ 20자의 영문");
  await page.waitForTimeout(1700);

  await idInput.click();
  await page.waitForTimeout(1700);
  await idInput.fill("ab3463htfa4");
  await pwInput.click();
  await page.waitForTimeout(1700);
  // ! id validation success
  await expect(idValidMsg).toContainText("사용가능한 ID");

  await pwInput.fill("12345678");
  await nameInput.click();
  await page.waitForTimeout(1700);
  await page.locator("#masking_password").click();
  // ! pw validation (3자리 이상 연속)
  await expect(pwInvalidMsg).toContainText("3자리 이상 연속되는");

  await page.waitForTimeout(1700);
  await pwInput.fill("a1b2c3d4");
  await nameInput.click();
  await page.waitForTimeout(1700);
  // ! pw validation (특수문자 없음)
  await expect(pwInvalidMsg).toContainText(
    "8~16자리 영문 대소문자, 숫자, 특수문자 중 3가지 이상"
  );
  await page.waitForTimeout(1700);

  await pwInput.fill("a1b2c3d4!!");
  await nameInput.click();
  await page.waitForTimeout(1700);
  // ! pw validation success
  await expect(pwValidMsg).toBeVisible();

  await page.waitForTimeout(1700);
  await nameInput.click();
  // await page.waitForTimeout(1700);
  await nameInput.fill("1");
  await birthInput.click();
  await page.waitForTimeout(1700);
  // ! name validation (숫자)
  await expect(nameInvalidMsg).toContainText(
    "이름에는 특수문자, 숫자는 사용하실 수"
  );
  await page.waitForTimeout(1700);
  await nameInput.click();
  await nameInput.fill("@@!!!#@#!#!@$!!");
  await birthInput.click();
  await page.waitForTimeout(1700);
  // ! name validation (특수문자)
  await expect(nameInvalidMsg).toContainText(
    "이름에는 특수문자, 숫자는 사용하실 수"
  );
  await page.waitForTimeout(1700);
  await nameInput.click();
  await nameInput.fill("qhadfs");
  await birthInput.click();
  await page.waitForTimeout(1700);
  // ! name validation ok
  await expect(nameInvalidMsg).toBeHidden();

  await page.waitForTimeout(1700);
  await birthInput.fill("1");
  await phoneInput.click();
  await page.waitForTimeout(1700);
  // ! 생년월일 validation
  await expect(birthInvalidMsg).toContainText(
    "YYYYMMDD 입력 형식을 확인해주세요."
  );
  await page.waitForTimeout(1700);

  await birthInput.fill("20000101");
  await phoneInput.click();
  await page.waitForTimeout(1700);
  // ! 생년월일 validation ok
  await expect(birthInvalidMsg).toBeHidden();
});
