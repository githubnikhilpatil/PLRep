import { Page, Locator } from '@playwright/test';

export class HomePage{

readonly page: Page;
readonly pageTitle: Locator;

constructor( page:Page) {
this.page =page;
this.pageTitle = page.getByRole('link',{name:'Home' });

}
public async validateHomePageNavigation(): Promise<boolean> 
{
    if(await this.pageTitle.isVisible())
        return true;
    else
        return false;
}

}