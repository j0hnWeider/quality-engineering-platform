/**
 * Testes de UI - Fluxo do carrinho no SauceDemo
 * 
 * Objetivo: validar operações de adicionar/remover produtos do carrinho
 */

import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';
import { CartPage } from '../pages/CartPage';

test.describe('Fluxo do Carrinho - SauceDemo', () => {
  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login('standard_user', 'secret_sauce');
    await page.waitForURL(/.*inventory.html/, { timeout: 10000 });
  });

  test('UI-04: Adicionar produto ao carrinho', async ({ page }) => {
    const inventoryPage = new InventoryPage(page);
    
    // Adiciona o primeiro produto
    await inventoryPage.addItemToCart(0);
    
    // Verifica se o contador do carrinho aumentou
    const count = await inventoryPage.getCartBadgeCount();
    expect(count).toBe(1);
    
    // Verifica se o botão mudou para "Remove"
    await expect(page.locator('button.btn_secondary')).toBeVisible();
  });

  test('UI-05: Remover produto do carrinho', async ({ page }) => {
    const inventoryPage = new InventoryPage(page);
    const cartPage = new CartPage(page);
    
    // Adiciona um produto
    await inventoryPage.addItemToCart(0);
    
    // Vai para o carrinho
    await inventoryPage.cartLink.click();
    await page.waitForURL(/.*cart.html/, { timeout: 5000 });
    
    // Remove o produto
    await cartPage.removeItem(0);
    
    // Verifica que o carrinho está vazio
    const count = await cartPage.getItemCount();
    expect(count).toBe(0);
  });

  test('UI-10: Logout com sucesso', async ({ page }) => {
    // Abre o menu
    await page.click('#react-burger-menu-btn');
    await page.waitForTimeout(500);
    
    // Clica em logout
    await page.click('#logout_sidebar_link');
    
    // Verifica redirecionamento para página de login
    await page.waitForURL(/.*saucedemo.com\/$/, { timeout: 5000 });
    await expect(page.locator('.login_logo')).toBeVisible();
  });
});