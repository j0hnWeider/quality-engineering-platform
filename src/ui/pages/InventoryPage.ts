import { Page, Locator } from '@playwright/test';

export class InventoryPage {
  readonly page: Page;
  readonly title: Locator;
  readonly cartLink: Locator;
  readonly addToCartButtons: Locator;

  constructor(page: Page) {
    this.page = page;
    this.title = page.locator('.title');
    this.cartLink = page.locator('.shopping_cart_link');
    this.addToCartButtons = page.locator('button.btn_inventory');
  }

  async addFirstItemToCart() {
    await this.addToCartButtons.first().click();
  }
}