import { Page, Locator } from '@playwright/test';

export class ExamplePage {
  readonly page: Page;
  readonly title: Locator;

  constructor(page: Page) {
    this.page = page;
    this.title = page.locator('h1');
  }
/**
   * Navigates to New Configured Url
   */
  async goto() {
    await this.page.goto('https://example.com');
  }
}
