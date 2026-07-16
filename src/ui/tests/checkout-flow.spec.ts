/**
 * Teste de UI - Fluxo de login no SauceDemo
 * 
 * Objetivo: validar que um usuário padrão consegue fazer login
 * e acessar a página de inventário.
 * 
 * Credenciais padrão do SauceDemo: standard_user / secret_sauce
 */

import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { AllureHelper } from '../../utils/allure-helper';

test.describe('Fluxo de Login - SauceDemo', () => {
  test('CT-UI-01: Usuario deve fazer login e ver lista de produtos', async ({ page }) => {
    // Enriquecendo o relatório Allure
    AllureHelper.addSeverity('critical');
    AllureHelper.addTags('ui', 'login', 'smoke');
    AllureHelper.addDescription('Valida que um usuário padrão consegue fazer login no SauceDemo e acessar a página de inventário.');
    AllureHelper.addTestCaseId('CT-UI-01');
    AllureHelper.addFeature('Interface de Usuário');
    AllureHelper.addStory('Login');
    AllureHelper.addParameter('Usuario', 'standard_user');
    AllureHelper.addLink('Documentação SauceDemo', 'https://www.saucedemo.com', 'website');

    const loginPage = new LoginPage(page);

    // Passo 1: Acessar a página de login
    await AllureHelper.addStep('Acessar a página de login', async () => {
      await loginPage.goto();
    });

    // Passo 2: Verificar que a página carregou
    await AllureHelper.addStep('Verificar que a página de login carregou', async () => {
      await expect(page.locator('#user-name')).toBeVisible({ timeout: 5000 });
    });

    // Passo 3: Realizar login com credenciais padrão
    await AllureHelper.addStep('Realizar login com credenciais padrão', async () => {
      await loginPage.login('standard_user', 'secret_sauce');
    });

    // Passo 4: Aguardar redirecionamento
    await AllureHelper.addStep('Aguardar redirecionamento para a página de inventário', async () => {
      await page.waitForURL(/.*inventory.html/, { timeout: 10000 });
    });

    // Passo 5: Validar título da página
    await AllureHelper.addStep('Validar que o título da página contém "Products"', async () => {
      await expect(page.locator('.title')).toContainText('Products', { timeout: 5000 });
    });

    // Passo 6: Validar visibilidade do carrinho
    await AllureHelper.addStep('Validar que o carrinho de compras está visível', async () => {
      await expect(page.locator('.shopping_cart_link')).toBeVisible({ timeout: 5000 });
    });

    // Evidência: screenshot da página após login
    const screenshot = await page.screenshot();
    AllureHelper.addAttachment('Página após login', screenshot, 'image/png');

    // Evidência: URL atual
    AllureHelper.addAttachment('URL atual', page.url(), 'text/plain');
  });
});