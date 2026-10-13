import { test } from '../../fixtures/testHooks';
import { expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { HomePage } from '../../pages/HomePage';
import {ContactPage} from '../../pages/ContactPage';
import { env } from '../../config/env';
import { chromium, firefox,Browser, BrowserContext } from '@playwright/test';
import { AllureHelper } from '../../utils/AllureHelper';
import { TestDataReader }  from '../../utils/TestDataReader';
import { ContactDataMapper } from '../../data-mapper/ContactDataMapper';


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
const password = env.password;
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
const password = env.password;
await loginPage.login(username, password);
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

test('Delete Created New Contact', {
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
const password = env.password;
await loginPage.login(username, password);
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