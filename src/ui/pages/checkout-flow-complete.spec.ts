/**
 * Testes de UI - Fluxo de checkout completo no SauceDemo
 * 
 * Objetivo: validar o fluxo completo de compra, desde o login até a finalização
 */

import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';
import { CartPage } from '../pages/CartPage';
import { CheckoutPage } from '../pages/CheckoutPage';

test.describe('Fluxo de Checkout Completo - SauceDemo', () => {
  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login('standard_user', 'secret_sauce');
    await page.waitForURL(/.*inventory.html/, { timeout: 10000 });
  });

  test('UI-06: Finalizar compra com sucesso', async ({ page }) => {
    const inventoryPage = new InventoryPage(page);
    const cartPage = new CartPage(page);
    const checkoutPage = new CheckoutPage(page);

    // Adiciona um produto ao carrinho
    await inventoryPage.addItemToCart(0);

    // Vai para o carrinho
    await inventoryPage.cartLink.click();
    await page.waitForURL(/.*cart.html/, { timeout: 5000 });

    // Prossegue para o checkout
    await cartPage.proceedToCheckout();
    await page.waitForURL(/.*checkout-step-one.html/, { timeout: 5000 });

    // Preenche dados do checkout
    await checkoutPage.fillCheckoutInfo('John', 'Weider', '12345');
    await checkoutPage.continueCheckout();
    await page.waitForURL(/.*checkout-step-two.html/, { timeout: 5000 });

    // Verifica o total
    const total = await checkoutPage.getTotal();
    expect(total).toContain('Total');

    // Finaliza a compra
    await checkoutPage.finishCheckout();
    await page.waitForURL(/.*checkout-complete.html/, { timeout: 5000 });

    // Valida mensagem de sucesso
    await expect(checkoutPage.successMessage).toContainText('Thank you for your order!');
  });

  test('UI-07: Finalizar compra com dados inválidos', async ({ page }) => {
    const inventoryPage = new InventoryPage(page);
    const cartPage = new CartPage(page);
    const checkoutPage = new CheckoutPage(page);

    // Adiciona um produto ao carrinho
    await inventoryPage.addItemToCart(0);

    // Vai para o carrinho
    await inventoryPage.cartLink.click();
    await page.waitForURL(/.*cart.html/, { timeout: 5000 });

    // Prossegue para o checkout
    await cartPage.proceedToCheckout();
    await page.waitForURL(/.*checkout-step-one.html/, { timeout: 5000 });

    // Cenário 1: Nome vazio
    await checkoutPage.fillCheckoutInfo('', 'Weider', '12345');
    await checkoutPage.continueCheckout();
    await expect(page.locator('[data-test="error"]')).toContainText('First Name is required');

    // Cenário 2: Sobrenome vazio
    await checkoutPage.fillCheckoutInfo('John', '', '12345');
    await checkoutPage.continueCheckout();
    await expect(page.locator('[data-test="error"]')).toContainText('Last Name is required');

    // Cenário 3: CEP vazio
    await checkoutPage.fillCheckoutInfo('John', 'Weider', '');
    await checkoutPage.continueCheckout();
    await expect(page.locator('[data-test="error"]')).toContainText('Postal Code is required');
  });
});