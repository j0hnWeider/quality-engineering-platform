import { test, expect, APIRequestContext } from '@playwright/test';
import { ApiClient } from '../client/ApiClient';
import { faker } from '@faker-js/faker';

let apiContext: APIRequestContext;
let client: ApiClient;

test.describe('API - Produtos (Contratos e Segurança)', () => {
  test.beforeAll(async ({ playwright }) => {
    // Cria um contexto manual para a API (não reutiliza a fixture)
    apiContext = await playwright.request.newContext({
      baseURL: process.env.BASE_URL || 'https://serverest.dev',
      extraHTTPHeaders: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    });
    client = new ApiClient(apiContext, process.env.BASE_URL || 'https://serverest.dev');
    await client.login('johnqateste@gmail.com', 'john123');
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
    
    if (body.produtos.length > 0) {
      const produto = body.produtos[0];
      expect(produto).toHaveProperty('nome');
      expect(produto).toHaveProperty('preco');
      expect(produto).toHaveProperty('descricao');
      expect(produto).toHaveProperty('quantidade');
      expect(typeof produto.preco).toBe('number');
    }
  });

  test('CT-API-02: Deve criar produto com sucesso (POST)', async () => {
    const produtoNome = faker.commerce.productName();
    const response = await client.post('/produtos', {
      nome: produtoNome,
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