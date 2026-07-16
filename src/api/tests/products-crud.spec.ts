/**
 * Testes de CRUD completo para produtos
 * 
 * Objetivo: validar operações de criação, atualização e exclusão
 * utilizando conta administradora dinâmica via fixture.
 */

import { test, expect } from '@playwright/test';
import { createAuthenticatedClient } from '../fixtures/auth.fixture';
import { faker } from '@faker-js/faker';
import { AllureHelper } from '../../utils/allure-helper';

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

  // --------------------------------------------------------------------
  // API-04: Criar produto com sucesso
  // --------------------------------------------------------------------
  test('API-04: Criar produto com sucesso', async () => {
    // Enriquecendo o relatório Allure
    AllureHelper.addSeverity('critical');
    AllureHelper.addTags('api', 'crud', 'smoke');
    AllureHelper.addDescription('Valida que um administrador pode criar um novo produto com sucesso.');
    AllureHelper.addTestCaseId('API-04');
    AllureHelper.addParameter('Endpoint', 'POST /produtos');
    AllureHelper.addFeature('CRUD de Produtos');
    AllureHelper.addStory('Criar Produto');

    const produtoNome = faker.commerce.productName();
    const preco = faker.number.int({ min: 10, max: 500 });
    const quantidade = faker.number.int({ min: 1, max: 10 });

    AllureHelper.addParameter('Nome do Produto', produtoNome);
    AllureHelper.addParameter('Preço', String(preco));
    AllureHelper.addParameter('Quantidade', String(quantidade));

    const response = await client.post('/produtos', {
      nome: produtoNome,
      preco: preco,
      descricao: faker.commerce.productDescription(),
      quantidade: quantidade
    }, true);

    expect(response.status()).toBe(201);
    const body = await response.json();
    expect(body.message).toContain('Cadastro realizado com sucesso');
    expect(body._id).toBeDefined();

    // Evidência: ID do produto criado
    AllureHelper.addAttachment('Produto Criado', JSON.stringify(body, null, 2), 'application/json');
  });

  // --------------------------------------------------------------------
  // API-05: Criar produto com dados inválidos
  // --------------------------------------------------------------------
  test('API-05: Criar produto com dados inválidos', async () => {
    AllureHelper.addSeverity('normal');
    AllureHelper.addTags('api', 'crud', 'validation');
    AllureHelper.addDescription('Valida que a API rejeita produtos com campos obrigatórios ausentes ou inválidos.');
    AllureHelper.addTestCaseId('API-05');
    AllureHelper.addFeature('CRUD de Produtos');
    AllureHelper.addStory('Validação de Dados');

    const testCases = [
      { nome: '', preco: 100, descricao: 'Teste', quantidade: 1, descricaoCaso: 'Nome vazio' },
      { nome: 'Produto Teste', preco: -100, descricao: 'Teste', quantidade: 1, descricaoCaso: 'Preço negativo' },
      { nome: 'Produto Teste', preco: 100, descricao: 'Teste', quantidade: -1, descricaoCaso: 'Quantidade negativa' },
    ];

    for (const caso of testCases) {
      await AllureHelper.addStep(`Testando: ${caso.descricaoCaso}`, async () => {
        const response = await client.post('/produtos', {
          nome: caso.nome,
          preco: caso.preco,
          descricao: caso.descricao,
          quantidade: caso.quantidade
        }, true);
        expect(response.status()).toBe(400);
      });
    }
  });

  // --------------------------------------------------------------------
  // API-08: Atualizar produto com sucesso
  // --------------------------------------------------------------------
  test('API-08: Atualizar produto com sucesso', async () => {
    AllureHelper.addSeverity('critical');
    AllureHelper.addTags('api', 'crud', 'smoke');
    AllureHelper.addDescription('Valida que um administrador pode atualizar um produto existente com sucesso.');
    AllureHelper.addTestCaseId('API-08');
    AllureHelper.addFeature('CRUD de Produtos');
    AllureHelper.addStory('Atualizar Produto');

    // 1. Cria um produto para atualizar
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
    AllureHelper.addParameter('ID do Produto', productId);

    // 2. Atualiza o produto
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

    AllureHelper.addAttachment('Produto Atualizado', JSON.stringify(updated, null, 2), 'application/json');
  });

  // --------------------------------------------------------------------
  // API-09: Atualizar produto inexistente
  // --------------------------------------------------------------------
  test('API-09: Atualizar produto inexistente', async () => {
    AllureHelper.addSeverity('minor');
    AllureHelper.addTags('api', 'crud', 'negative');
    AllureHelper.addDescription('Valida que a API retorna erro ao tentar atualizar um produto que não existe.');
    AllureHelper.addTestCaseId('API-09');
    AllureHelper.addFeature('CRUD de Produtos');
    AllureHelper.addStory('Atualizar Produto (Negativo)');

    const response = await client.put('/produtos/999999999', {
      nome: 'Produto Inexistente',
      preco: 100,
      descricao: 'Teste',
      quantidade: 1
    }, true);
    expect([400, 404]).toContain(response.status());
  });

  // --------------------------------------------------------------------
  // API-10: Excluir produto com sucesso
  // --------------------------------------------------------------------
  test('API-10: Excluir produto com sucesso', async () => {
    AllureHelper.addSeverity('critical');
    AllureHelper.addTags('api', 'crud', 'smoke');
    AllureHelper.addDescription('Valida que um administrador pode excluir um produto existente com sucesso.');
    AllureHelper.addTestCaseId('API-10');
    AllureHelper.addFeature('CRUD de Produtos');
    AllureHelper.addStory('Excluir Produto');

    // 1. Cria um produto para excluir
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
    AllureHelper.addParameter('ID do Produto', productId);

    // 2. Exclui o produto
    const deleteResponse = await client.delete(`/produtos/${productId}`, true);
    expect(deleteResponse.status()).toBe(200);
    const deleted = await deleteResponse.json();
    expect(deleted.message).toContain('Registro excluído com sucesso');

    AllureHelper.addAttachment('Produto Excluído', JSON.stringify(deleted, null, 2), 'application/json');
  });

  // --------------------------------------------------------------------
  // API-11: Excluir produto inexistente
  // --------------------------------------------------------------------
  test('API-11: Excluir produto inexistente', async () => {
    AllureHelper.addSeverity('minor');
    AllureHelper.addTags('api', 'crud', 'negative');
    AllureHelper.addDescription('Valida que a API retorna erro ao tentar excluir um produto que não existe.');
    AllureHelper.addTestCaseId('API-11');
    AllureHelper.addFeature('CRUD de Produtos');
    AllureHelper.addStory('Excluir Produto (Negativo)');

    const response = await client.delete('/produtos/999999999', true);
    expect([400, 404]).toContain(response.status());
  });
});