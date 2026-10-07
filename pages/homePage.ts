import { Page, Locator } from '@playwright/test';

export class HomePage{

readonly page: Page;
readonly pageTitle: Locator;
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


constructor( page:Page) {
this.page =page;
this.pageTitle = page.getByRole('link',{name:'Home' });
this.Contacts =page.getByRole('link', { name: 'Contacts' });
this.Companies =page.getByRole('link', { name: 'Companies' });
this.Deals =page.getByRole('link', { name: 'Deals' });
this.Tasks =page.getByRole('link', { name: 'Tasks' });
this.Cases =page.getByRole('link', { name: 'Cases' });
this.Calls =page.getByRole('link', { name: 'Calls' });
this.Email =page.getByRole('link', { name: 'Email' });
this.Documents =page.getByRole('link', { name: 'Documents' });
this.Forms =page.getByRole('link', { name: 'Campaigns' });
this.Campaigns =page.getByRole('link', { name: 'Forms' });
this.Reports =page.getByRole('link', { name: 'Reports' });
this.Products =page.getByRole('link', { name: 'Products' });
this.Invoices =page.getByRole('link', { name: 'Invoices' });
}
public async validateHomePageNavigation(): Promise<boolean> 
{
    if(await this.pageTitle.isVisible({ timeout: 15_000 }))
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