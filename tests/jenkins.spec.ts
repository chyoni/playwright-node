import test, { expect } from "@playwright/test";
import { JENKINS_PASSWORD, JENKINS_USERNAME } from "./jenkins.env";

// ! 각 테스트마다 실행 전 먼저 선행되는 과정
test.beforeEach(async ({ page }) => {
  // ! browser size 조절
  await page.setViewportSize({
    width: 1600,
    height: 1200,
  });
  // ! URL http://127.0.0.1:8080/ 이동
  await page.goto("http://127.0.0.1:8080/");
});

test("Jenkins automation testing", async ({ page }) => {
  // ! 2초 대기
  await page.waitForTimeout(2000);
  // ! Welcome to Jenkins 라는 텍스트 노출 확인
  await expect(page.getByText("Welcome to Jenkins!")).toBeVisible();

  // ! Username 입력칸 클릭
  await page.getByPlaceholder("Username").click();
  // ! 입력칸에 username 입력
  await page.getByPlaceholder("Username").fill(JENKINS_USERNAME);
  // ! 2초 대기
  await page.waitForTimeout(2000);

  // ! Password 입력칸 클릭
  await page.getByPlaceholder("Password").click();
  // ! 입력칸에 password 입력
  await page.getByPlaceholder("Password").fill(JENKINS_PASSWORD);
  // ! 2초 대기
  await page.waitForTimeout(2000);

  // ! document가 전부 로드될 때까지 기다리는 이벤트 트리거
  const promise = page.waitForEvent("domcontentloaded");
  // ! Sign in 버튼 클릭
  await page.getByRole("button", { name: "Sign in" }).click();
  // ! 위 이벤트를 기다림
  await promise;

  // ! 로그인 후 우측 상단에 choichiwon이라는 텍스트가 적힌 링크 표시 확인
  await expect(page.getByRole("link", { name: "choichiwon" })).toBeVisible();
  // ! 2초 대기
  await page.waitForTimeout(2000);
  // ! 로그인 후 우측 상단에 choichiwon이라는 텍스트가 적힌 링크 클릭
  await page.getByRole("link", { name: "choichiwon" }).click();

  // ! 화면 navigate후 URL 정상 확인
  await expect(page).toHaveURL(
    `http://127.0.0.1:8080/user/${JENKINS_USERNAME}/`
  );
  // ! 화면의 문구가 적힌 엘리먼트 노출 확인
  await page.locator("#main-panel > div:nth-child(4)").isVisible();
  // ! 화면의 문구가 엘리먼트의 문구가 로그인 헀을 때 유저의 이름이 포함되었는지 확인
  await expect(page.locator("#main-panel > div:nth-child(4)")).toContainText(
    JENKINS_USERNAME
  );
  // ! 2초 대기
  await page.waitForTimeout(2000);

  // ! 좌측 사이드바에서 Configure 버튼 클릭
  await page
    .locator("#tasks > div:nth-child(4) > span > a > span.task-link-text")
    .click();
  // ! 화면 navigate후 URL 정상 확인
  await expect(page).toHaveURL(
    `http://127.0.0.1:8080/user/${JENKINS_USERNAME}/configure`
  );
  // ! 2초 대기
  await page.waitForTimeout(2000);

  // ! Configure 화면의 유저명 인풋에 value가 choichiwon임을 확인
  await expect(
    page.locator(
      "#main-panel > form > div:nth-child(1) > div:nth-child(1) > div.setting-main > input"
    )
  ).toHaveValue("choichiwon");
  // ! 2초 대기
  await page.waitForTimeout(2000);

  // ! 좌측 상단 홈 버튼 클릭
  await page.locator("#jenkins-name-icon").click();
  // ! 홈 버튼 클릭 시 정상 URL 확인
  await expect(page).toHaveURL("http://127.0.0.1:8080");
  // ! Jenkins Job list에서 build 버튼 클릭
  await page.locator("#job_thinkbig > td:nth-child(7)").click();

  // ! 화면 navigate 후 정상 URL 확인
  await expect(page).toHaveURL(/build/);
  // ! 2초 대기
  await page.waitForTimeout(2000);
  // ! 빌드 리스트에서 마지막 빌드의 값을 가져옴
  const lastBuild = await page
    .locator(
      "#buildHistory > div.row.pane-content > table > tbody > tr:nth-child(2) > td > div.pane.build-name > a"
    )
    .innerText();
  const lastBuildNumber = parseInt(lastBuild.split("#")[1]);

  // ! start build 버튼 클릭
  await page.locator("#yui-gen1-button").click();
  // ! 5초 대기
  await page.waitForTimeout(5000);
  // ! 현재 빌드중인 빌드의 넘버값을 가져옴
  const currentBuild = await page
    .locator(
      "#buildHistory > div.row.pane-content > table > tbody > tr:nth-child(2) > td > div.pane.build-name > a"
    )
    .innerText();

  // ! 현재 빌드의 넘버값은 이전에 가져온 마지막 빌드 넘버의 + 1 임을 assertion.
  expect(currentBuild).toEqual(`#${+(lastBuildNumber + 1)}`);
});
