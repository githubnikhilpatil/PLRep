import { test } from '@playwright/test';

export function registerLoginHooks() {
  test.beforeEach(async ({ page }) => {
    const loginUrl = process.env.PLAYWRIGHT_LOGIN_URL;
    const username = process.env.PLAYWRIGHT_LOGIN_USER;
    const password = process.env.PLAYWRIGHT_LOGIN_PASS;
    if (!loginUrl || !username || !password) return;

    await page.goto(loginUrl);

    const userInput = page.locator('input[name="username"], input[name="email"], input[type="email"]');
    const passInput = page.locator('input[name="password"], input[type="password"]');

    if ((await userInput.count()) && (await passInput.count())) {
      await userInput.fill(username);
      await passInput.fill(password);
      const submit = page.locator('button[type="submit"], input[type="submit"]');
      if (await submit.count()) {
        await submit.first().click();
        await page.waitForLoadState('networkidle');
      }
    }
  });
}
