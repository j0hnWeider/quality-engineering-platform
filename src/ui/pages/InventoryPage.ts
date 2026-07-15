import { Page, Locator } from '@playwright/test';

export class InventoryPage {
  readonly page: Page;
  readonly title: Locator;
  readonly cartLink: Locator;
  readonly addToCartButtons: Locator;
  readonly removeButtons: Locator;
  readonly sortDropdown: Locator;

  constructor(page: Page) {
    this.page = page;
    this.title = page.locator('.title');
    this.cartLink = page.locator('.shopping_cart_link');
    this.addToCartButtons = page.locator('button.btn_inventory');
    this.removeButtons = page.locator('button.btn_secondary');
    this.sortDropdown = page.locator('[data-test="product-sort-container"]');
  }

  async addItemToCart(index: number = 0) {
    await this.addToCartButtons.nth(index).click();
  }

  async removeItemFromCart(index: number = 0) {
    await this.removeButtons.nth(index).click();
  }

  async getCartBadgeCount(): Promise<number> {
    const badge = this.page.locator('.shopping_cart_badge');
    if (await badge.isVisible()) {
      return parseInt(await badge.textContent() || '0');
    }
    return 0;
  }

  async sortBy(option: string) {
    await this.sortDropdown.selectOption(option);
  }
}