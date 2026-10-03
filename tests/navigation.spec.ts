import { test, expect } from '@playwright/test';
import { ExamplePage } from './pages/examplePage';
import { SummaryPage } from './pages/summaryPage';

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

test.afterEach(async ({ page }) => {
  try {
    await page.evaluate(() => {
      localStorage.clear();
      sessionStorage.clear();
    });

    await page.context().clearCookies();

    const logoutLink = page.locator('a[href*="logout"], button:has-text("Logout"), button:has-text("Sign out")');
    if (await logoutLink.count()) {
      await logoutLink.first().click();
    }
  } catch {
    // Ignore cleanup failures so tests don't fail during teardown1.
  }
});

test('navigate to example.com and check title via page object', async ({ page }) => {
  const example = new ExamplePage(page);
  await example.goto();
  await expect(example.title).toHaveText(/Example Domain/);
});

test('navigate to summary page and check title via page object', async ({ page }) => {
  const summary = new SummaryPage(page);
  await summary.goto();
  await expect(summary.title).toHaveText(/Example Domain/);
});

test('logout via page object', async ({ page }) => {
  test.skip(
    !process.env.PLAYWRIGHT_LOGIN_URL ||
      !process.env.PLAYWRIGHT_LOGIN_USER ||
      !process.env.PLAYWRIGHT_LOGIN_PASS,
    'Requires configured login credentials',
  );

  const example = new ExamplePage(page);
  await expect(example.logoutButton).toBeVisible();
  await example.logout();
  await expect(example.logoutButton).toBeHidden();
});

test('navigate to Our Centers via page object', async ({ page }) => {
  test.skip(
    !process.env.PLAYWRIGHT_LOGIN_URL ||
      !process.env.PLAYWRIGHT_LOGIN_USER ||
      !process.env.PLAYWRIGHT_LOGIN_PASS,
    'Requires configured login credentials',
  );

  const example = new ExamplePage(page);
  await expect(example.ourCentersLink).toBeVisible();
  await example.navigateToOurCenters();
  await expect(page.getByRole('heading', { name: /our centers/i })).toBeVisible();
});
