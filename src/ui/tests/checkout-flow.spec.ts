import { test, expect, APIRequestContext } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { faker } from '@faker-js/faker';

let apiContext: APIRequestContext;
let testEmail: string;
let testPassword: string;

test.describe('Fluxo de Compra - UI', () => {
  test.beforeAll(async ({ playwright }) => {
    // Cria um contexto de API para criar a conta administradora
    apiContext = await playwright.request.newContext({
      baseURL: process.env.BASE_URL || 'https://serverest.dev',
      extraHTTPHeaders: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    });

    // Gera credenciais únicas para o teste
    testEmail = `qa_ui_${faker.string.alphanumeric(8)}@teste.com`;
    testPassword = '123456';

    // Cria a conta administradora
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
    
    // Usa as credenciais criadas dinamicamente
    await loginPage.login(testEmail, testPassword);

    // Valida que o login foi bem-sucedido e a URL mudou para a página de admin
    await expect(page).toHaveURL(/.*admin.*|.*produtos.*/);
    
    // Opção 1: valida o título "Bem Vindo" (página admin)
    await expect(page.locator('h1')).toContainText('Bem Vindo');
    
    // Opção 2: alternativa mais robusta – valida que o botão de logout existe
    // await expect(page.locator('a:has-text("Logout")')).toBeVisible();
  });
});