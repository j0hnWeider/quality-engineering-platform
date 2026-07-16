import { FullConfig } from '@playwright/test';
import fs from 'fs';
import path from 'path';

async function globalSetup(config: FullConfig) {
  const allureResultsDir = path.resolve(process.cwd(), 'allure-results');
  if (!fs.existsSync(allureResultsDir)) {
    fs.mkdirSync(allureResultsDir, { recursive: true });
  }

  const environmentProperties = {
    'Browser': 'Chromium',
    'Environment': process.env.ENVIRONMENT || 'QA',
    'API_Base_URL': process.env.API_BASE_URL || 'https://serverest.dev',
    'UI_Base_URL': process.env.UI_BASE_URL || 'https://www.saucedemo.com',
    'Node_Version': process.version,
    'Execution_Date': new Date().toISOString(),
    'OS': process.platform,
    'CI': process.env.CI || 'false',
    'GITHUB_RUN_ID': process.env.GITHUB_RUN_ID || 'N/A',
    'GITHUB_SHA': process.env.GITHUB_SHA || 'N/A',
    'GITHUB_REF': process.env.GITHUB_REF || 'N/A',
  };

  const envContent = Object.entries(environmentProperties)
    .map(([key, value]) => `${key}=${value}`)
    .join('\n');

  const envFilePath = path.join(allureResultsDir, 'environment.properties');
  fs.writeFileSync(envFilePath, envContent);

  console.log('✅ Allure environment properties criado:', envFilePath);
}

export default globalSetup;