import { test } from '../../fixtures/testHooks';
import { expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { HomePage } from '../../pages/HomePage';
import {ContactPage} from '../../pages/ContactPage';
import {SignUpPage} from '../../pages/SignUpPage';
import { DealPage } from '../../pages/DealPage';
import { env } from '../../config/env';
import { chromium, firefox,Browser, BrowserContext } from '@playwright/test';
import { AllureHelper } from '../../utils/AllureHelper';
import { TestDataReader }  from '../../utils/TestDataReader';
import { ContactDataMapper } from '../../data-mapper/ContactDataMapper';
import { DealDataMapper } from '../../data-mapper/DealDataMapper';
import { GenericUtilityHelper  } from '../../utils/GenericUtilityHelper'
import { GmailHelper } from '../../utils/GmailHelper';




test.skip('Register New User',{
        tag: ['@TC0091']
    },async({page}) =>
{
   await AllureHelper.epic('CRM Application');

    await AllureHelper.feature('Register');

    await AllureHelper.story('Register New User');

await page.goto(env.App_URL);
await page.waitForLoadState('networkidle');
const loginPage = new LoginPage(page);
await loginPage.navigateToSignUp();
await page.waitForLoadState('networkidle');
await AllureHelper.info(page,'navingating to Sign Up Page', 'Successful',true);
const signupPage = new SignUpPage(page);
const Newuser = signupPage.signup();
await AllureHelper.info(page,'Sign Up Completed', 'Successful',true);

await page.waitForTimeout(10000);
 const verificationLink =
await GmailHelper.getVerificationLink(
            await Newuser,
            'Validate your FreeCRM account',
            'Click here to complete the account',
            120_000
        );
await page.goto(verificationLink);
await page.waitForLoadState('domcontentloaded');

await page.waitForTimeout(10000);

});




test('Login to CRM ',{
        tag: ['@TC0011']
    },async({page}) =>
{
   await AllureHelper.epic('CRM Application');

    await AllureHelper.feature('Login');

    await AllureHelper.story('User Login');

    await AllureHelper.tags(
        'customer',
        'create-customer',
        'regression'
    ); 

await AllureHelper.info(page,'navingating to Login page', 'Successful',true);
await page.goto(env.App_URL);
await page.waitForLoadState('networkidle');
const loginPage = new LoginPage(page);
const username = env.username;
const password = GenericUtilityHelper.decryptPassword( env.password);
await loginPage.login(username,  password);
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



test('Create New Contact', {
        tag: ['@TC0001']
    },async({page}) =>
{
await AllureHelper.epic('CRM Application');
await AllureHelper.feature('Contacts');
await AllureHelper.story('Create New Contact');
await AllureHelper.tags(
        'Contact',
        'create-Contact',
        'regression'
    );   
    
    
 const data =
         TestDataReader.getData('TC0001');

     const contact =
         ContactDataMapper.createContact(data);
    console.log('final contact data' ,contact ) ;

await AllureHelper.info(page,'navingating to Login page', 'Successful',true);
await page.goto(env.App_URL);
await page.waitForLoadState('networkidle');
const loginPage = new LoginPage(page);
const username = env.username;
const password = GenericUtilityHelper.decryptPassword( env.password);
await loginPage.login(username,  password);
const homePage =  new HomePage(page);
await page.waitForLoadState('networkidle');
await AllureHelper.info(page,'navingating to Home page', 'Successful',true);
await homePage.Contacts.waitFor({state:'visible'});

if (await homePage.Contacts.isVisible()) {
    await homePage.Contacts.click();
}
const contactPage = new ContactPage(page);
const result = await contactPage.Create_New_Contact(contact);

if ( result.success)
{
await AllureHelper.info(page,`New contact ${result.UserName}  is created`, 'Successful',true);
}else
{
await AllureHelper.info(page,'New contact is not created', 'Fail',true);
}

}

);

test.skip('Create New Deal', {
        tag: ['@TC0021']
    }, async ({ page }) => {
    await AllureHelper.epic('CRM Application');
    await AllureHelper.feature('Deals');
    await AllureHelper.story('Create New Deal');
    await AllureHelper.tags(
        'Deal',
        'create-Deal',
        'regression'
    );
    const data = TestDataReader.getData('TC0021');
    const deal = DealDataMapper.createDeal(data);
    console.log('final deal data', deal);

    await AllureHelper.info(page, 'navingating to Login page', 'Successful', true);
    await page.goto(env.App_URL);
    await page.waitForLoadState('networkidle');
    const loginPage = new LoginPage(page);
    await loginPage.login(env.username, env.password);

    const homePage = new HomePage(page);
    await page.waitForLoadState('networkidle');
    await AllureHelper.info(page, 'navingating to Home page', 'Successful', true);
    await homePage.Deals.waitFor({ state: 'visible' });
    await homePage.Deals.click();

    const dealPage = new DealPage(page);
    const result = await dealPage.Create_New_Deal(deal);

    expect(result.success).toBeTruthy();
    await AllureHelper.info(
        page,
        `New deal ${result.DealTitle} is created`,
        'Successful',
        true
    );
});



test.skip('Delete Created New Contact', {
        tag: ['@TC0002']
    },async({page}) =>
{
await AllureHelper.epic('CRM Application');
await AllureHelper.feature('Contacts');
await AllureHelper.story('Delete New Contact');
await AllureHelper.tags(
        'Contact',
        'delete-Contact',
        'regression'
    ); 
  const data =
         TestDataReader.getData('TC0002');

     const contact =
         ContactDataMapper.createContact(data);
    console.log('final contact data' ,contact ) ;      
await AllureHelper.info(page,'navingating to Login page', 'Successful',true);
await page.goto(env.App_URL);
await page.waitForLoadState('networkidle');
const loginPage = new LoginPage(page);
const username = env.username;
const password = GenericUtilityHelper.decryptPassword( env.password);
await loginPage.login(username,  password);
const homePage =  new HomePage(page);
await page.waitForLoadState('networkidle');
await AllureHelper.info(page,'navingating to Home page', 'Successful',true);
await homePage.Contacts.waitFor({state:'visible'});

if (await homePage.Contacts.isVisible()) {
    await homePage.Contacts.click();
}
const contactPage = new ContactPage(page);

const result = await contactPage.Create_New_Contact(contact);

if ( result.success)
{
await AllureHelper.info(page,`New contact ${result.UserName}  is created`, 'Successful',true);
}else
{
await AllureHelper.info(page,'New contact is not created', 'Fail',true);
}

if (await homePage.Contacts.isVisible()) {
    await homePage.Contacts.click();
}
await AllureHelper.info(page,'navingating to Contacts', 'Successful',true);
const createdcontact = page.getByRole('cell', { name: `${result.UserName}` }).locator('..');
await createdcontact.waitFor({state:'visible'});

await createdcontact.hover();
await createdcontact.getByLabel('Delete').click();

await page.getByRole('heading', { name: 'Delete' }).waitFor({
    state: 'visible'
});
await AllureHelper.info(page,'Deleting Contacts', 'Successful',true);
await page.locator('button').filter({ hasText: /^Delete$/ }).click();
await AllureHelper.info(page,'Contact deleted', 'Successful',true);

}

);