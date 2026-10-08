import { Page, Locator } from '@playwright/test';
import {GenericUtilityHelper} from '../utils/GenericUtilityHelper';
import { Contact } from '../entities/Contact';

export class ContactPage{

readonly page: Page;
readonly pageTitle: Locator;
readonly Contacts: Locator;
readonly Create: Locator;
readonly FirstName: Locator;
readonly LastName: Locator;
readonly SaveContact : Locator;


constructor( page:Page) {
this.page =page;
this.pageTitle = page.getByRole('heading',{name:'New Contact', exact: true });
this.Contacts =page.getByRole('link', { name: 'Contacts', exact: true });
this.Create =page.getByRole('button', { name: 'Create', exact: true });

this.FirstName = page.getByRole('textbox', { name: 'First Name' });
this.LastName = page.getByRole('textbox', { name: 'Last Name' });
this.SaveContact = page.getByRole('button',{name : 'Save',exact:true} );

}

public async Create_New_Contact(contact?: Contact):  Promise<{ success: boolean; UserName: string }> 
{

await this.Create.waitFor({
        state: 'visible'
    });
if (await this.Create.isVisible()) {
    await this.Create.click();
    }
    await this.pageTitle.waitFor({state: 'visible'});
    const firstname = contact?.firstName ?? GenericUtilityHelper.generateRandomString(4);
    const lastname = contact?.lastName ?? GenericUtilityHelper.generateRandomString(4);
    await this.FirstName.fill(firstname);
    await this.LastName.fill(lastname);

    await this.page.getByLabel('Category').selectOption(contact?.category ?? 'Lead');
    await this.page.getByLabel('Status').selectOption(contact?.status ?? 'Active');
    await this.page.getByText('Do not Call', { exact: true })
        .locator('..')
        .getByRole('checkbox').setChecked(contact?.isDoNotCall ?? true);
    await this.page.getByText('Do not Text', { exact: true })
        .locator('..')
        .getByRole('checkbox').setChecked(contact?.isDoNotText ?? true);
    
    await this.page.getByText('Do not Email', { exact: true })
        .locator('..')
        .getByRole('checkbox').setChecked(contact?.isDoNotEmail ?? true);
  
    await this.page.getByRole('spinbutton', { name: 'Day' }).fill(String(contact?.birthDay ?? 10));
    await this.page.locator('select', { hasText: 'Month' }).selectOption(String(contact?.birthMonth ?? 6));
    await this.page.getByRole('spinbutton', { name: 'Year' }).fill(String(contact?.birthYear ?? 1982));

    await this.page.getByText('Referred By', { exact: true })
        .locator('..').getByRole('button').click();
    const referredBy = contact?.referredBy ?? 'Sam';
    await this.page.getByRole('textbox', { name: 'Search' }).fill(referredBy);
    await this.page.getByRole('button', { name: referredBy }).nth(1).click();

await this.SaveContact.click();

const savedContact = this.page.getByRole('heading', {
    name: `${firstname} ${lastname}`,
    exact: true
});
await savedContact.waitFor({ state: 'visible',timeout: 5000});
const rating = contact?.rating ?? 4;
if( await  this.page.getByText('First Name', { exact: true })
    .locator('..')
    .getByRole('button').innerText()  == firstname  &&

await  this.page.getByText('Last Name', { exact: true })
    .locator('..')
    .getByRole('button').innerText()  == lastname  
)
{
   await this.page.getByRole('button', { name: `Rate ${rating} stars` }).click();
 
  return {
        success: true,
        UserName: `${firstname} ${lastname}`
    };
}else
{
    return {
        success: false,
        UserName:""
    }
}

}

}