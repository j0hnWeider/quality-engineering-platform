import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

test.describe('Fluxo de Compra - UI', () => {
  test('CT-UI-01: Usuário deve fazer login e ver lista de produtos', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    
    // Usa credenciais fixas 
    await loginPage.login('johnqateste@gmail.com', 'john123');

    // Validação: após o login, a página exibe "Bem Vindo" (para admin)
    await expect(page.locator('h1')).toContainText('Bem Vindo');
  });
});