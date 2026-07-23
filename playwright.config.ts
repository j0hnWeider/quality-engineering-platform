import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';
dotenv.config();

export default defineConfig({
  testDir: './src',
  timeout: 30000,
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 1,
  workers: process.env.CI ? 4 : undefined,

  // Referência ao arquivo global-setup (deve ser uma string com o caminho)
  globalSetup: './global-setup.ts',

  reporter: [
    ['html'], // relatório HTML padrão do Playwright
    ['list'], // saída no console
    ['allure-playwright', { outputFolder: 'allure-results' }] // Allure
  ],

  outputDir: 'test-results',

  use: {
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },

  projects: [
    {
      name: 'api',
      testMatch: /api\/.*\.spec\.ts/,
      use: {
        ...devices['Desktop Chrome'],
        baseURL: process.env.API_BASE_URL || 'https://serverest.dev',
        extraHTTPHeaders: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
      },
    },
    {
      name: 'ui',
      testMatch: /ui\/.*\.spec\.ts/,
      use: {
        ...devices['Desktop Chrome'],
        baseURL: process.env.UI_BASE_URL || 'https://www.saucedemo.com',
      },
    },
    {
      name: 'contract',
      testMatch: /contract\/.*\.spec\.ts/,
      use: {
        ...devices['Desktop Chrome'],
        baseURL: process.env.API_BASE_URL || 'https://serverest.dev',
        extraHTTPHeaders: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
      },
    },
  ],
});