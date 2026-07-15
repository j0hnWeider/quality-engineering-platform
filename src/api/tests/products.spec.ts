import { test, expect, APIRequestContext } from '@playwright/test';
import { ApiClient } from '../client/ApiClient';
import { faker } from '@faker-js/faker';

let apiContext: APIRequestContext;
let client: ApiClient;
let testEmail: string;
let testPassword: string;

test.describe('API - Produtos (Contratos e Segurança)', () => {
  test.beforeAll(async ({ playwright }) => {
    apiContext = await playwright.request.newContext({
      baseURL: process.env.API_BASE_URL || 'https://serverest.dev',
      extraHTTPHeaders: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    });

    // Cria uma conta administradora dinamicamente
    testEmail = `qa_prod_${faker.string.alphanumeric(10)}@teste.com`;
    testPassword = '123456';

    const createResponse = await apiContext.post('/usuarios', {
      data: {
        nome: 'QA Produtos',
        email: testEmail,
        password: testPassword,
        administrador: 'true',
      },
    });

    if (createResponse.status() !== 201) {
      throw new Error(`Falha ao criar conta: ${createResponse.status()} - ${await createResponse.text()}`);
    }

    // Login com a conta criada
    client = new ApiClient(apiContext, process.env.API_BASE_URL || 'https://serverest.dev');
    await client.login(testEmail, testPassword);
  });

  test.afterAll(async () => {
    if (apiContext) {
      await apiContext.dispose();
    }
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