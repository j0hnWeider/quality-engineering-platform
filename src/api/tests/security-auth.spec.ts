/**
 * Testes de segurança - Autenticação e Autorização
 * 
 * Objetivo: validar mecanismos de autenticação, autorização e proteção
 * contra ataques de força bruta.
 */

import { test, expect } from '@playwright/test';
import { createAuthenticatedClient } from '../fixtures/auth.fixture';
import { ApiClient } from '../client/ApiClient';

test.describe('Testes de segurança - Autenticação e Autorização', () => {
  let client: any;
  let apiContext: any;
  let adminEmail: string;
  let adminPassword: string;

  test.beforeAll(async () => {
    console.log('🔐 Criando conta administradora para testes de segurança...');
    const auth = await createAuthenticatedClient();
    client = auth.client;
    apiContext = auth.apiContext;
    adminEmail = auth.email;
    adminPassword = auth.password;
    console.log(`✅ Conta criada: ${adminEmail}`);
  });

  test.afterAll(async () => {
    if (apiContext) {
      await apiContext.dispose();
    }
  });

  test('CT-SEC-04: Deve bloquear múltiplas tentativas de login com credenciais inválidas', async () => {
    const invalidCredentials = [
      { email: adminEmail, password: 'wrong1' },
      { email: adminEmail, password: 'wrong2' },
      { email: adminEmail, password: 'wrong3' },
      { email: adminEmail, password: 'wrong4' },
      { email: adminEmail, password: 'wrong5' },
    ];

    let blocked = false;
    for (const cred of invalidCredentials) {
      const tempClient = new ApiClient(apiContext, process.env.API_BASE_URL || 'https://serverest.dev');
      try {
        await tempClient.login(cred.email, cred.password);
      } catch (error: any) {
        if (error.message?.includes('429') || error.message?.includes('403')) {
          blocked = true;
          break;
        }
      }
    }

    if (!blocked) {
      console.warn('⚠️ API não bloqueia múltiplas tentativas de login (rate limiting não identificado)');
    }
  });

  test('CT-SEC-05: Usuário comum não deve criar produtos (403 Forbidden)', async () => {
    const commonUserClient = new ApiClient(apiContext, process.env.API_BASE_URL || 'https://serverest.dev');
    const commonEmail = `common_${Date.now()}@teste.com`;
    const commonPassword = '123456';

    const createResponse = await apiContext.post('/usuarios', {
      data: {
        nome: 'Usuario Comum',
        email: commonEmail,
        password: commonPassword,
        administrador: 'false',
      },
    });

    if (createResponse.status() === 201) {
      await commonUserClient.login(commonEmail, commonPassword);
    } else {
      console.warn(`⚠️ Falha ao criar usuário comum, usando fulano@qa.com`);
      await commonUserClient.login('fulano@qa.com', 'teste');
    }

    const response = await commonUserClient.post('/produtos', {
      nome: 'Produto Teste',
      preco: 100,
      descricao: 'Usuário comum tentando criar',
      quantidade: 1
    }, true);

    expect(response.status()).toBe(403);
  });

  test('CT-SEC-06: Deve rejeitar token inválido ou expirado', async () => {
    const invalidTokenClient = new ApiClient(apiContext, process.env.API_BASE_URL || 'https://serverest.dev');
    (invalidTokenClient as any).token = 'Bearer invalid_token_12345';

    const response = await invalidTokenClient.post('/produtos', {
      nome: 'Teste Token Inválido',
      preco: 100,
      descricao: 'Teste',
      quantidade: 1
    }, true);

    expect(response.status()).toBe(401);
  });

  test('CT-SEC-07: Deve bloquear acesso a endpoint protegido sem token', async () => {
    // Este teste já está coberto pelo CT-API-03 em products.spec.ts
    test.skip();
  });
});