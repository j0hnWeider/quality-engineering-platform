/**
 * Testes de API - Contratos e segurança
 * 
 * Objetivo: validar contrato da API e cenários básicos de segurança.
 */

import { test, expect } from '@playwright/test';
import { createAuthenticatedClient } from '../fixtures/auth.fixture';
import { faker } from '@faker-js/faker';

test.describe('API - Produtos (Contratos e Segurança)', () => {
  let client: any;
  let apiContext: any;

  test.beforeAll(async () => {
    const auth = await createAuthenticatedClient();
    client = auth.client;
    apiContext = auth.apiContext;
  });

  test.afterAll(async () => {
    await apiContext.dispose();
  });

  test('CT-API-01: Deve listar produtos com schema válido', async () => {
    const response = await client.get('/produtos');
    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(body).toHaveProperty('quantidade');
    expect(body).toHaveProperty('produtos');
    expect(Array.isArray(body.produtos)).toBeTruthy();
  });

  test('CT-API-02: Deve criar produto com sucesso (POST)', async () => {
    const response = await client.post('/produtos', {
      nome: faker.commerce.productName(),
      preco: faker.number.int({ min: 10, max: 500 }),
      descricao: faker.commerce.productDescription(),
      quantidade: faker.number.int({ min: 1, max: 10 })
    }, true);
    expect(response.status()).toBe(201);
    const body = await response.json();
    expect(body.message).toContain('Cadastro realizado com sucesso');
    expect(body._id).toBeDefined();
  });

  test('CT-API-03: [SEGURANÇA] Deve barrar criação sem token (401)', async () => {
    const response = await client.post('/produtos', {
      nome: 'Produto Hacker',
      preco: 1,
      descricao: 'Tentativa invasão',
      quantidade: 1
    }, false);
    expect(response.status()).toBe(401);
  });
});