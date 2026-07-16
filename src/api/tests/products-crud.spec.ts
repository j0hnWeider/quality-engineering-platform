/**
 * Testes de CRUD completo para produtos
 * 
 * Objetivo: validar operações de criação, atualização e exclusão
 * utilizando conta administradora dinâmica via fixture.
 */

import { test, expect } from '@playwright/test';
import { createAuthenticatedClient } from '../fixtures/auth.fixture';
import { faker } from '@faker-js/faker';

test.describe('API - CRUD de Produtos', () => {
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

  test('API-04: Criar produto com sucesso', async () => {
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

  test('API-05: Criar produto com dados inválidos', async () => {
    let response = await client.post('/produtos', {
      nome: '',
      preco: 100,
      descricao: 'Teste',
      quantidade: 1
    }, true);
    expect(response.status()).toBe(400);

    response = await client.post('/produtos', {
      nome: 'Produto Teste',
      preco: -100,
      descricao: 'Teste',
      quantidade: 1
    }, true);
    expect(response.status()).toBe(400);

    response = await client.post('/produtos', {
      nome: 'Produto Teste',
      preco: 100,
      descricao: 'Teste',
      quantidade: -1
    }, true);
    expect(response.status()).toBe(400);
  });

  test('API-08: Atualizar produto com sucesso', async () => {
    const createResponse = await client.post('/produtos', {
      nome: faker.commerce.productName() + ' - ' + Date.now(),
      preco: 100,
      descricao: 'Produto para atualizar',
      quantidade: 5
    }, true);

    if (createResponse.status() !== 201) {
      const errorBody = await createResponse.text();
      console.error('Erro ao criar produto:', createResponse.status(), errorBody);
    }
    expect(createResponse.status()).toBe(201);

    const created = await createResponse.json();
    const productId = created._id;

    const updateResponse = await client.put(`/produtos/${productId}`, {
      nome: 'Produto Atualizado - ' + Date.now(),
      preco: 200,
      descricao: 'Descrição atualizada',
      quantidade: 10
    }, true);

    if (updateResponse.status() !== 200) {
      const errorBody = await updateResponse.text();
      console.error('Erro ao atualizar produto:', updateResponse.status(), errorBody);
    }
    expect(updateResponse.status()).toBe(200);

    const updated = await updateResponse.json();
    expect(updated.message).toContain('Registro alterado com sucesso');
  });

  test('API-09: Atualizar produto inexistente', async () => {
    const response = await client.put('/produtos/999999999', {
      nome: 'Produto Inexistente',
      preco: 100,
      descricao: 'Teste',
      quantidade: 1
    }, true);
    expect([400, 404]).toContain(response.status());
  });

  test('API-10: Excluir produto com sucesso', async () => {
    const createResponse = await client.post('/produtos', {
      nome: faker.commerce.productName(),
      preco: 100,
      descricao: 'Produto para excluir',
      quantidade: 5
    }, true);

    if (createResponse.status() !== 201) {
      const errorBody = await createResponse.text();
      console.error('Erro ao criar produto:', createResponse.status(), errorBody);
    }
    expect(createResponse.status()).toBe(201);

    const created = await createResponse.json();
    const productId = created._id;

    const deleteResponse = await client.delete(`/produtos/${productId}`, true);
    expect(deleteResponse.status()).toBe(200);
    const deleted = await deleteResponse.json();
    expect(deleted.message).toContain('Registro excluído com sucesso');
  });

  test('API-11: Excluir produto inexistente', async () => {
    const response = await client.delete('/produtos/999999999', true);
    expect([400, 404]).toContain(response.status());
  });
});