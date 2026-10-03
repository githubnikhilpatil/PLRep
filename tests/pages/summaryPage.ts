import { Page, Locator } from '@playwright/test';

export class SummaryPage {
  readonly page: Page;
  readonly title: Locator;
  readonly productRows: Locator;
  readonly productNames: Locator;
  readonly productQuantities: Locator;

  constructor(page: Page) {
    this.page = page;
    this.title = page.locator('h1');
    this.productRows = page.getByTestId('order-item');
    this.productNames = this.productRows.getByTestId('product-name');
    this.productQuantities = this.productRows.getByTestId('quantity');
  }

  async goto() {
    await this.page.goto('https://example.com');
  }

  async getTotalProductsOrdered(): Promise<number> {
    return this.productQuantities.evaluateAll((elements) =>
      elements.reduce((total, element) => {
        const value =
          element instanceof HTMLInputElement
            ? element.value
            : element.textContent ?? '';
        const quantity = Number.parseInt(value.trim(), 10);

        return total + (Number.isNaN(quantity) ? 0 : quantity);
      }, 0),
    );
  }
}