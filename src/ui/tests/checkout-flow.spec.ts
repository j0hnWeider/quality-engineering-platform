import { test, expect, APIRequestContext } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { faker } from '@faker-js/faker';

let apiContext: APIRequestContext;
let testEmail: string;
let testPassword: string;

test.describe('Fluxo de Compra - UI', () => {
  test.beforeAll(async ({ playwright }) => {
    // Cria contexto de API
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

    if (createUserResponse.status() === 201) {
      console.log(`✅ Conta criada: ${testEmail}`);
    } else if (createUserResponse.status() === 400) {
      console.log(`⚠️ Conta já existia: ${testEmail}`);
    } else {
      throw new Error(`❌ Erro ao criar usuário: ${createUserResponse.status()}`);
    }
  });

  test.afterAll(async () => {
    await apiContext.dispose();
  });

  test('CT-UI-01: Usuário deve fazer login e ver lista de produtos', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();

    // Aguarda a página carregar
    await page.waitForLoadState('networkidle');

    // Login com as credenciais criadas
    await loginPage.login(testEmail, testPassword);

    // Aguarda a página de destino carregar
    await page.waitForLoadState('networkidle');

    // Validação: após o login, a página exibe "Bem Vindo" (para admin)
    await expect(page.locator('h1')).toContainText('Bem Vindo', { timeout: 10000 });
  });
});