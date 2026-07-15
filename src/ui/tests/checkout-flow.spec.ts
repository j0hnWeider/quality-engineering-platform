/**
 * Teste de UI - Fluxo de login com criação dinâmica de conta
 * 
 * Objetivo: validar que um usuário administrador consegue fazer login
 * e é redirecionado para a página correta.
 */

import { test, expect, APIRequestContext } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { faker } from '@faker-js/faker';

let apiContext: APIRequestContext;
let testEmail: string;
let testPassword: string;

test.describe('Fluxo de Compra - UI', () => {
  test.beforeAll(async ({ playwright }) => {
    // Cria contexto de API para criar a conta
    apiContext = await playwright.request.newContext({
      baseURL: process.env.BASE_URL || 'https://serverest.dev',
      extraHTTPHeaders: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    });

    // Gera credenciais únicas
    testEmail = `qa_ui_${faker.string.alphanumeric(8)}@teste.com`;
    testPassword = '123456';

    // Cria conta administradora
    const createUserResponse = await apiContext.post('/usuarios', {
      data: {
        nome: 'QA UI Automacao',
        email: testEmail,
        password: testPassword,
        administrador: 'true',
      },
    });

    if (createUserResponse.status() !== 201) {
      console.warn(`Falha ao criar usuário: ${createUserResponse.status()}`);
      // Fallback para credenciais conhecidas
      testEmail = 'johnqateste@gmail.com';
      testPassword = 'john123';
    } else {
      console.log(`✅ Conta criada: ${testEmail}`);
    }
  });

  test.afterAll(async () => {
    await apiContext.dispose();
  });

  test('CT-UI-01: Usuário deve fazer login e ver lista de produtos', async ({ page }) => {
    const loginPage = new LoginPage(page);
    
    // Acessa a página de login
    await loginPage.goto();

    // Realiza login com as credenciais criadas
    await loginPage.login(testEmail, testPassword);

    // Aguarda o redirecionamento para a página administrativa
    await page.waitForURL(/.*admin.*|.*produtos.*/, { timeout: 15000 });

    // Validação: o título da página deve conter "Bem Vindo" (para administradores)
    await expect(page.locator('h1')).toContainText('Bem Vindo', { timeout: 10000 });
  });
});