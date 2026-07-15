/**
 * Teste de UI - Fluxo de login no SauceDemo
 * 
 * Objetivo: validar que um usuário padrão consegue fazer login
 * e acessar a página de inventário.
 * 
 * Credenciais padrão do SauceDemo: standard_user / secret_sauce
 */

import { test, expect } from '@playwright/test';

test.describe('Fluxo de Login - SauceDemo', () => {

  test('CT-UI-01: Usuario deve fazer login e ver lista de produtos', async ({ page }) => {
    test.setTimeout(30000);

    // Acessa a URL do SauceDemo diretamente
    await page.goto('https://www.saucedemo.com');

    // Verifica que a página de login carregou (campo de usuário visível)
    await expect(page.locator('#user-name')).toBeVisible({ timeout: 5000 });

    // Preenche as credenciais padrão
    await page.fill('#user-name', 'standard_user');
    await page.fill('#password', 'secret_sauce');
    await page.click('#login-button');

    // Aguarda o redirecionamento para a página de inventário
    await page.waitForURL(/.*inventory.html/, { timeout: 10000 });

    // Valida que o título da página contém "Products"
    await expect(page.locator('.title')).toContainText('Products', { timeout: 5000 });

    // Valida que o carrinho de compras está visível
    await expect(page.locator('.shopping_cart_link')).toBeVisible({ timeout: 5000 });
  });
});