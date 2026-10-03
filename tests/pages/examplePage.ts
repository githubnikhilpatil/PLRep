import { Page, Locator } from '@playwright/test';

export class ExamplePage {
  readonly page: Page;
  readonly title: Locator;
  readonly aboutUsLink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.title = page.locator('h1');
    this.aboutUsLink = page.getByRole('link', { name: /about us/i });
  }
/**
   * Navigates to New Configured Url
   */
  async goto() {
    await this.page.goto('https://example.com');
  }

  async navigateToAboutUs() {
    await this.aboutUsLink.click();
  }
}
