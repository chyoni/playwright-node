# Playwright with NodeJS

##  `Command`

```bash
# Running all tests
npx playwright test

# Running a single test file
npx playwright test test.spec.ts

# Run a set of test files
npx playwright test tests/todo-page/ tests/landing-page/

# Run files that have `landing` or `login` in the file name
npx playwright test landing login

# 브라우저를 띄우면서 chromium으로 테스트 실행
npx playwright test --headed --project=chromium

# Record and Playback 방식이라고 보면 된다.
npx playwright codegen "테스트 할 URL"

# Debugging all tests
npx playwright test --debug

# Debugging one test file
npx playwright test example.spec.ts --debug

# Tag tests
npx playwright test --grep @fast

# Example 
npx playwright test tags.spec.ts --headed --project=chromium --grep @notrun

# 만약, 여러개의 테스트에 대한 parallelization을 하지 않으려면
npx playwright test --workers=1
```


