import { Page, Locator } from '@playwright/test';

export class ExamplePage {
  readonly page: Page;
  readonly title: Locator;

  readonly aboutUsLink: Locator;
  readonly ourCentersLink: Locator;
  readonly logoutButton: Locator;


  constructor(page: Page) {
    this.page = page;
    this.title = page.locator('h1');

    this.aboutUsLink = page.getByRole('link', { name: /about us/i });
    this.ourCentersLink = page.getByRole('link', { name: /our centers/i });
    this.logoutButton = page.getByRole('button', { name: /logout/i });
  }
/**
   * Navigates to New Configured Url completely new revised
   */
  async goto() {
    await this.page.goto('https://example.com');
  }


  async navigateToAboutUs() {
    await this.aboutUsLink.click();
  }

  async navigateToOurCenters() {
    await this.ourCentersLink.click();
  }

  async logout() {
    await this.logoutButton.click();

  }
}
