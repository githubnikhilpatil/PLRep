import { Page, Locator } from '@playwright/test';

export class HomePage{

readonly page: Page;
readonly pageTitle1: Locator;
readonly Contacts: Locator;
readonly Companies: Locator;
readonly Deals: Locator;
readonly Tasks: Locator;
readonly Cases: Locator;
readonly Calls: Locator;
readonly Email: Locator;
readonly Documents: Locator;
readonly Campaigns: Locator;
readonly Forms: Locator;
readonly Reports: Locator;
readonly Products: Locator;
readonly Invoices: Locator;

readonly Create: Locator;


constructor( page:Page) {
this.page =page;
this.pageTitle1 = page.getByRole('link',{name:'Home', exact: true });
this.Contacts =page.getByRole('link', { name: 'Contacts', exact: true });
this.Companies =page.getByRole('link', { name: 'Companies', exact: true });
this.Deals =page.getByRole('link', { name: 'Deals', exact: true });
this.Tasks =page.getByRole('link', { name: 'Tasks', exact: true });
this.Cases =page.getByRole('link', { name: 'Cases' });
this.Calls =page.getByRole('link', { name: 'Calls' });
this.Email =page.getByRole('link', { name: 'Email' });
this.Documents =page.getByRole('link', { name: 'Documents' });
this.Forms =page.getByRole('link', { name: 'Campaigns' });
this.Campaigns =page.getByRole('link', { name: 'Forms' });
this.Reports =page.getByRole('link', { name: 'Reports' });
this.Products =page.getByRole('link', { name: 'Products' });
this.Invoices =page.getByRole('link', { name: 'Invoices' });
this.Create =page.getByRole('button', { name: 'Create' });
}
public async validateHomePageNavigation(): Promise<boolean> 
{
    if(await this.pageTitle1.isVisible({ timeout: 15_000 }))
    {
        return true;
    console.log('validated');
    }
    else
    {
        return false;
    console.log('not validated');
    }
}

}