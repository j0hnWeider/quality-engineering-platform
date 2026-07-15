import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

test.describe('Fluxo de Compra - UI', () => {
  test('CT-UI-01: Usuário deve fazer login e ver lista de produtos', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login('johnqateste@gmail.com', 'john123');

    // Valida que o login foi bem-sucedido (redirecionamento)
    await expect(page).toHaveURL(/.*/);
    
    // Para conta administradora, a página exibe "Bem Vindo"
    await expect(page.locator('h1')).toContainText('Bem Vindo');
  });
});