import { Page, Locator } from '@playwright/test';

export class CartPage {
  readonly page: Page;
  readonly checkoutButton: Locator;
  readonly cartItems: Locator;
  readonly removeButtons: Locator;
  readonly continueShoppingButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.checkoutButton = page.locator('[data-test="checkout"]');
    this.cartItems = page.locator('.cart_item');
    this.removeButtons = page.locator('button.cart_button');
    this.continueShoppingButton = page.locator('[data-test="continue-shopping"]');
  }

  async goto() {
    await this.page.goto('/cart.html');
  }

  async proceedToCheckout() {
    await this.checkoutButton.click();
  }

  async getItemCount(): Promise<number> {
    return await this.cartItems.count();
  }

  async removeItem(index: number = 0) {
    await this.removeButtons.nth(index).click();
  }
}