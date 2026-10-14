import { Page, Locator } from '@playwright/test';

export class BasePage {

    protected page: Page;

    // Common locators
    protected PageTitle: Locator;
    protected Create: Locator;
    protected Save: Locator;
    protected Cancel: Locator;
    protected Delete: Locator;
    

    constructor(page: Page) {

        this.page = page;

        this.PageTitle =
            page.locator('h1, h2').first();

        this.Create =
            page.getByRole('button', { name: 'Create', exact: true });

        this.Save =
            page.getByRole('button', { name: 'Save', exact: true });

        this.Cancel =
            page.getByRole('button', { name: 'Cancel', exact: true });

        this.Delete =
            page.getByRole('button', { name: 'Delete', exact: true });
    }

    async clickCreate(): Promise<void> {
        await this.Create.click();
    }

    async clickSave(): Promise<void> {
        await this.Save.click();
    }

    async getPageTitle(): Promise<string | null> {
        return await this.PageTitle.textContent();
    }
}