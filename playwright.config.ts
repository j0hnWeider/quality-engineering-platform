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
  reporter: [
    ['html'],
    ['list']
  ],
  use: {
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },
  projects: [
  {
    name: 'api',
    testMatch: /api\/.*\.spec\.ts/,   // só arquivos dentro de src/api/
    use: {
      ...devices['Desktop Chrome'],
      baseURL: process.env.BASE_URL || 'https://serverest.dev',
      extraHTTPHeaders: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    },
  },
  {
    name: 'ui',
    testMatch: /ui\/.*\.spec\.ts/,   // só arquivos dentro de src/ui/
    use: {
      ...devices['Desktop Chrome'],
      baseURL: process.env.UI_BASE_URL || 'https://front.serverest.dev',
    },
  },
],
});