import { test } from '../../fixtures/testHooks';
import { expect } from '@playwright/test';
import { ExamplePage } from '../../pages/examplePage';
import { SummaryPage } from '../../pages/summaryPage';
import { LoginPage } from '../../pages/Loginpage';
import { HomePage } from '../../pages/homePage';
import { env } from '../../config/env';
import { chromium, firefox,Browser, BrowserContext } from '@playwright/test';

test('Login to CRM @Login',async({page}) =>
{
await page.goto(env.App_URL);
await page.waitForLoadState('networkidle');
const loginPage = new LoginPage(page);
const username = env.username;
const password = env.password;
await page.waitForTimeout(5000);
await loginPage.login(username, password);
const homePage =  new HomePage(page);
await page.waitForLoadState('networkidle');

await page.waitForTimeout(5000);
if(await homePage.validateHomePageNavigation() )
{
console.log("true");
}
else
{
console.log("false");
}


//expect(await homePage.validateHomePageNavigation()).toBe(true);

}
);
