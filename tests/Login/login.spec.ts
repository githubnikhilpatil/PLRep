import { test } from '../../fixtures/testHooks';
import { expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { HomePage } from '../../pages/HomePage';
import { env } from '../../config/env';
import { chromium, firefox,Browser, BrowserContext } from '@playwright/test';
import { AllureHelper } from '../../utils/AllureHelper';

test('Login to CRM @Login',async({page}) =>
{
await AllureHelper.info(page,'navingating to Login page', 'Successful',true);
await page.goto(env.App_URL);
await page.waitForLoadState('networkidle');
const loginPage = new LoginPage(page);
const username = env.username;
const password = env.password;
await page.waitForTimeout(5000);
await loginPage.login(username, password);
const homePage =  new HomePage(page);
await page.waitForLoadState('networkidle');
await AllureHelper.info(page,'navingating to Home page', 'Successful',true);
await page.waitForTimeout(5000);
if(await homePage.validateHomePageNavigation() )
{
 await AllureHelper.validate(page,'validateHomePageNavigatione','Passed',true);
}
else
{
   await AllureHelper.validate(page,'validateHomePageNavigation','Fail',true);
}
}
);



test('Create New Customer @Customer',async({page}) =>
{
await AllureHelper.info(page,'navingating to Login page', 'Successful',true);
await page.goto(env.App_URL);
await page.waitForLoadState('networkidle');
const loginPage = new LoginPage(page);
const username = env.username;
const password = env.password;
await page.waitForTimeout(5000);
await loginPage.login(username, password);
const homePage =  new HomePage(page);
await page.waitForLoadState('networkidle');
await AllureHelper.info(page,'navingating to Home page', 'Successful',true);
await page.waitForTimeout(5000);





}

);