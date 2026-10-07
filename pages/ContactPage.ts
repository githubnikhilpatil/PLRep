import { Page, Locator } from '@playwright/test';

export class ContactPage{

readonly page: Page;
readonly pageTitle: Locator;

constructor( page:Page) {
this.page =page;
this.pageTitle = page.getByRole('link',{name:'Home' });

}


}