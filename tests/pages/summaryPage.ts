import { Page, Locator } from '@playwright/test';

export class SummaryPage {
  readonly page: Page;
  readonly title: Locator;

  constructor(page: Page) {
    this.page = page;
    this.title = page.locator('h1');
  }

  async goto() {
    await this.page.goto('https://example.com');
  }
}
