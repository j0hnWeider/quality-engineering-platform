import { test, expect, APIRequestContext } from '@playwright/test';
import { ApiClient } from '../client/ApiClient';
import { faker } from '@faker-js/faker';

let apiContext: APIRequestContext;
let client: ApiClient;
let testEmail: string;
let testPassword: string;

test.describe('API - Produtos (Contratos e Segurança)', () => {
  test.beforeAll(async ({ playwright }) => {
    // Configura contexto da API
    apiContext = await playwright.request.newContext({
      baseURL: process.env.BASE_URL || 'https://serverest.dev',
      extraHTTPHeaders: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    });

    // Cria uma conta administradora nova para o teste
    testEmail = `qa_${faker.string.alphanumeric(8)}@teste.com`;
    testPassword = '123456';

    const createUserResponse = await apiContext.post('/usuarios', {
      data: {
        nome: 'QA Automacao',
        email: testEmail,
        password: testPassword,
        administrador: 'true',
      },
    });

    // Se a conta já existir, tenta fazer login com ela (pode ser que já exista)
    if (createUserResponse.status() === 400) {
      // Usuário já existe, então apenas usamos as credenciais
      console.log('Usuário já existia, prosseguindo com login');
    } else if (createUserResponse.status() !== 201) {
      throw new Error(`Falha ao criar usuário: ${createUserResponse.status()}`);
    }

    // Inicializa o ApiClient e faz login
    client = new ApiClient(apiContext, process.env.BASE_URL || 'https://serverest.dev');
    const token = await client.login(testEmail, testPassword);
    console.log(`Login realizado com sucesso para ${testEmail}`);
  });

  test.afterAll(async () => {
    // Opcional: deletar o usuário criado para limpeza
    // await client.delete(`/usuarios/${userId}`, true);
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