import { Page, Locator } from '@playwright/test';

export class ExamplePage {
  readonly page: Page;
  readonly title: Locator;
  readonly logoutButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.title = page.locator('h1');
    this.logoutButton = page.getByRole('button', { name: /logout/i });
  }
/**
   * Navigates to New Configured Url
   */
  async goto() {
    await this.page.goto('https://example.com');
  }

  async logout() {
    await this.logoutButton.click();
  }
}
