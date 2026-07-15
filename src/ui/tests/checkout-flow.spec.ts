import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

test.describe('Fluxo de Compra - UI', () => {
  test('CT-UI-01: Usuário deve fazer login e ver lista de produtos', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login('fulano@qa.com', 'teste');

    await expect(page).toHaveURL(/.*/);
    await expect(page.locator('h1')).toContainText('Lista de Produtos');
  });
});