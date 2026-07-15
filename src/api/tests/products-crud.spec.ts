/**
 * Testes de CRUD completo para produtos
 * 
 * Objetivo: validar operações de criação, atualização e exclusão
 */

import { test, expect, APIRequestContext } from '@playwright/test';
import { ApiClient } from '../client/ApiClient';
import { faker } from '@faker-js/faker';

let apiContext: APIRequestContext;
let client: ApiClient;
let createdProductId: string;

test.describe('API - CRUD de Produtos', () => {
  test.beforeAll(async ({ playwright }) => {
    apiContext = await playwright.request.newContext({
      baseURL: process.env.API_BASE_URL || 'https://serverest.dev',
      extraHTTPHeaders: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    });
    client = new ApiClient(apiContext, process.env.API_BASE_URL || 'https://serverest.dev');
    await client.login('johnqateste@gmail.com', 'john123');
  });

  test.afterAll(async () => {
    await apiContext.dispose();
  });

  test('API-04: Criar produto com sucesso', async () => {
    const response = await client.post('/produtos', {
      nome: faker.commerce.productName(),
      preco: faker.number.int({ min: 10, max: 500 }),
      descricao: faker.commerce.productDescription(),
      quantidade: faker.number.int({ min: 1, max: 10 })
    }, true);
    expect(response.status()).toBe(201);
    const body = await response.json();
    createdProductId = body._id;
    expect(body.message).toContain('Cadastro realizado com sucesso');
  });

  test('API-05: Criar produto com dados inválidos', async () => {
    // Cenário 1: Nome vazio
    let response = await client.post('/produtos', {
      nome: '',
      preco: 100,
      descricao: 'Teste',
      quantidade: 1
    }, true);
    expect(response.status()).toBe(400);

    // Cenário 2: Preço negativo
    response = await client.post('/produtos', {
      nome: 'Produto Teste',
      preco: -100,
      descricao: 'Teste',
      quantidade: 1
    }, true);
    expect(response.status()).toBe(400);

    // Cenário 3: Quantidade negativa
    response = await client.post('/produtos', {
      nome: 'Produto Teste',
      preco: 100,
      descricao: 'Teste',
      quantidade: -1
    }, true);
    expect(response.status()).toBe(400);
  });

  test('API-08: Atualizar produto com sucesso', async () => {
    // Primeiro cria um produto
    const createResponse = await client.post('/produtos', {
      nome: faker.commerce.productName(),
      preco: 100,
      descricao: 'Produto para atualizar',
      quantidade: 5
    }, true);
    expect(createResponse.status()).toBe(201);
    const product = await createResponse.json();
    const productId = product._id;

    // Atualiza o produto
    const updateResponse = await client.put(`/produtos/${productId}`, {
      nome: 'Produto Atualizado',
      preco: 200,
      descricao: 'Descrição atualizada',
      quantidade: 10
    }, true);
    expect(updateResponse.status()).toBe(200);
    const updated = await updateResponse.json();
    expect(updated.message).toContain('Registro alterado com sucesso');
  });

  test('API-09: Atualizar produto inexistente', async () => {
    const response = await client.put('/produtos/999999', {
      nome: 'Produto Inexistente',
      preco: 100,
      descricao: 'Teste',
      quantidade: 1
    }, true);
    expect(response.status()).toBe(404);
  });

  test('API-10: Excluir produto com sucesso', async () => {
    // Primeiro cria um produto
    const createResponse = await client.post('/produtos', {
      nome: faker.commerce.productName(),
      preco: 100,
      descricao: 'Produto para excluir',
      quantidade: 5
    }, true);
    expect(createResponse.status()).toBe(201);
    const product = await createResponse.json();
    const productId = product._id;

    // Exclui o produto
    const deleteResponse = await client.delete(`/produtos/${productId}`, true);
    expect(deleteResponse.status()).toBe(200);
    const deleted = await deleteResponse.json();
    expect(deleted.message).toContain('Registro excluído com sucesso');
  });

  test('API-11: Excluir produto inexistente', async () => {
    const response = await client.delete('/produtos/999999', true);
    expect(response.status()).toBe(404);
  });
});