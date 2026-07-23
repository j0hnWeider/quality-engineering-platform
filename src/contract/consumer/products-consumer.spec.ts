/**
 * Testes de Contrato (Consumer) - Produtos
 * 
 * Define as expectativas do consumidor (QA Forge ApiClient)
 * sobre o comportamento da API de produtos do provedor (Serverest).
 * 
 * Fluxo:
 * 1. Mock PactProvider é iniciado
 * 2. Definimos as interações esperadas (request + response esperada)
 * 3. Executamos o teste real contra o mock
 * 4. Pact verifica se a chamada real corresponde ao contrato definido
 * 5. O arquivo pact é gerado em src/contract/pacts/
 */

import { test, expect } from '@playwright/test';
import { APIRequestContext, request } from '@playwright/test';
import { createPact, MatchersV3 } from './pact-helper';
import { ApiClient } from '../../api/client/ApiClient';
import { AllureHelper } from '../../utils/allure-helper';

const CONSUMER_NAME = 'QA_Forge_WebApp';
const PROVIDER_NAME = 'Serverest_API';

test.describe('Contrato (Consumer) - Produtos', () => {
  let apiContext: APIRequestContext;
  let mockClient: ApiClient;
  let mockPort: number;
  const pact = createPact({ consumer: CONSUMER_NAME, provider: PROVIDER_NAME });

  test.beforeAll(async () => {
    apiContext = await request.newContext();
  });

  test.afterAll(async () => {
    await apiContext.dispose();
  });

  // --------------------------------------------------------------------
  // CT-CONTRACT-01: Listar produtos (GET /produtos)
  // --------------------------------------------------------------------
  test('CT-CONTRACT-01: Consumidor deve listar produtos com sucesso', async () => {
    AllureHelper.addSeverity('critical');
    AllureHelper.addTags('contract', 'consumer', 'products');
    AllureHelper.addDescription(
      'Verifica o contrato para listagem de produtos. O consumidor espera' +
      ' que a API retorne uma lista paginada com quantidade e array de produtos.'
    );
    AllureHelper.addFeature('Contrato - Produtos');
    AllureHelper.addStory('GET /produtos');

    await pact
      .addInteraction()
      .given('produtos existem')
      .uponReceiving('uma requisição para listar produtos')
      .withRequest('GET', '/produtos')
      .willRespondWith(200, (builder) => {
        builder
          .jsonBody({
            quantidade: MatchersV3.like(2),
            produtos: MatchersV3.eachLike({
              nome: MatchersV3.like('Produto Exemplo'),
              preco: MatchersV3.like(100.00),
              descricao: MatchersV3.like('Descrição do produto'),
              quantidade: MatchersV3.like(10),
              _id: MatchersV3.like('abc123def456'),
            }),
          })
          .headers({
            'Content-Type': MatchersV3.regex(
              /^application\/json(;.*)?$/,
              'application/json; charset=utf-8'
            ),
          });
      })
      .executeTest(async (mockServer) => {
        mockPort = mockServer.port;
        mockClient = new ApiClient(apiContext, mockServer.url);

        const response = await mockClient.get('/produtos');
        expect(response.status()).toBe(200);

        const body = await response.json();
        expect(body).toHaveProperty('quantidade');
        expect(body).toHaveProperty('produtos');
        expect(Array.isArray(body.produtos)).toBeTruthy();
        expect(body.produtos.length).toBeGreaterThanOrEqual(1);

        for (const produto of body.produtos) {
          expect(produto).toHaveProperty('nome');
          expect(produto).toHaveProperty('preco');
          expect(produto).toHaveProperty('descricao');
          expect(produto).toHaveProperty('quantidade');
          expect(produto).toHaveProperty('_id');
        }

        AllureHelper.addAttachment(
          'Resposta Mock',
          JSON.stringify(body, null, 2),
          'application/json'
        );
      });

    AllureHelper.addAttachment(
      'Contrato Gerado',
      `Pact gerado para ${CONSUMER_NAME} <-> ${PROVIDER_NAME}`,
      'text/plain'
    );
  });

  // --------------------------------------------------------------------
  // CT-CONTRACT-02: Criar produto (POST /produtos)
  // --------------------------------------------------------------------
  test('CT-CONTRACT-02: Consumidor deve criar produto com sucesso', async () => {
    AllureHelper.addSeverity('critical');
    AllureHelper.addTags('contract', 'consumer', 'products');
    AllureHelper.addDescription(
      'Verifica o contrato para criação de produto. O consumidor espera' +
      ' que ao enviar dados válidos, a API retorne 201 com mensagem de sucesso e ID.'
    );
    AllureHelper.addFeature('Contrato - Produtos');
    AllureHelper.addStory('POST /produtos');

    const novoProduto = {
      nome: 'Notebook Ultra',
      preco: 3500.00,
      descricao: 'Notebook de alta performance',
      quantidade: 50,
    };

    await pact
      .addInteraction()
      .given('produto não existe')
      .uponReceiving('uma requisição para criar um produto')
      .withRequest('POST', '/produtos', (builder) => {
        builder
          .jsonBody({
            nome: MatchersV3.like(novoProduto.nome),
            preco: MatchersV3.like(novoProduto.preco),
            descricao: MatchersV3.like(novoProduto.descricao),
            quantidade: MatchersV3.like(novoProduto.quantidade),
          })
          .headers({
            'Authorization': MatchersV3.like('Bearer token123'),
            'Content-Type': 'application/json',
          });
      })
      .willRespondWith(201, (builder) => {
        builder
          .jsonBody({
            message: MatchersV3.like('Cadastro realizado com sucesso'),
            _id: MatchersV3.like('a1b2c3d4e5f6'),
          })
          .headers({
            'Content-Type': MatchersV3.regex(
              /^application\/json(;.*)?$/,
              'application/json; charset=utf-8'
            ),
          });
      })
      .executeTest(async (mockServer) => {
        mockClient = new ApiClient(apiContext, mockServer.url);
        mockClient.setToken('Bearer token123'); // CORREÇÃO: define token manualmente

        const response = await mockClient.post('/produtos', novoProduto, true);
        expect(response.status()).toBe(201);

        const body = await response.json();
        expect(body.message).toContain('Cadastro realizado com sucesso');
        expect(body._id).toBeDefined();

        AllureHelper.addAttachment(
          'Produto Criado (Mock)',
          JSON.stringify(body, null, 2),
          'application/json'
        );
      });
  });

  // --------------------------------------------------------------------
  // CT-CONTRACT-03: Criar produto sem autenticação (401)
  // --------------------------------------------------------------------
  test('CT-CONTRACT-03: Consumidor deve receber 401 ao criar sem token', async () => {
    AllureHelper.addSeverity('normal');
    AllureHelper.addTags('contract', 'consumer', 'security');
    AllureHelper.addDescription(
      'Verifica o contrato para criação de produto sem autenticação.' +
      ' O consumidor espera status 401 quando não envia token.'
    );
    AllureHelper.addFeature('Contrato - Produtos');
    AllureHelper.addStory('POST /produtos (Sem Auth)');

    await pact
      .addInteraction()
      .given('usuário não autenticado')
      .uponReceiving('uma requisição para criar produto sem token')
      .withRequest('POST', '/produtos', (builder) => {
        builder.jsonBody({
          nome: 'Produto Hacker',
          preco: 1,
          descricao: 'Tentativa',
          quantidade: 1,
        });
      })
      .willRespondWith(401, (builder) => {
        builder
          .jsonBody({
            message: MatchersV3.like('Token de acesso ausente, inválido, expirado ou usuário do token não existe mais'),
          })
          .headers({
            'Content-Type': MatchersV3.regex(
              /^application\/json(;.*)?$/,
              'application/json; charset=utf-8'
            ),
          });
        })
      .executeTest(async (mockServer) => {
        mockClient = new ApiClient(apiContext, mockServer.url);

        const response = await mockClient.post('/produtos', {
          nome: 'Produto Hacker',
          preco: 1,
          descricao: 'Tentativa',
          quantidade: 1,
        }, false);
        expect(response.status()).toBe(401);

        const body = await response.json();
        expect(body).toHaveProperty('message');

        AllureHelper.addAttachment(
          'Resposta 401 (Mock)',
          JSON.stringify(body, null, 2),
          'application/json'
        );
      });
  });

  // --------------------------------------------------------------------
  // CT-CONTRACT-04: Atualizar produto (PUT /produtos/:id)
  // --------------------------------------------------------------------
  test('CT-CONTRACT-04: Consumidor deve atualizar produto com sucesso', async () => {
    AllureHelper.addSeverity('critical');
    AllureHelper.addTags('contract', 'consumer', 'products');
    AllureHelper.addDescription(
      'Verifica o contrato para atualização de produto existente.'
    );
    AllureHelper.addFeature('Contrato - Produtos');
    AllureHelper.addStory('PUT /produtos/:id');

    const productId = 'a1b2c3d4e5f6';
    const dadosAtualizados = {
      nome: 'Produto Atualizado',
      preco: 250.00,
      descricao: 'Descrição atualizada',
      quantidade: 30,
    };

    await pact
      .addInteraction()
      .given(`produto com ID ${productId} existe`)
      .uponReceiving('uma requisição para atualizar um produto')
      .withRequest('PUT', `/produtos/${productId}`, (builder) => {
        builder
          .jsonBody({
            nome: MatchersV3.like(dadosAtualizados.nome),
            preco: MatchersV3.like(dadosAtualizados.preco),
            descricao: MatchersV3.like(dadosAtualizados.descricao),
            quantidade: MatchersV3.like(dadosAtualizados.quantidade),
          })
          .headers({
            'Authorization': MatchersV3.like('Bearer token123'),
            'Content-Type': 'application/json',
          });
      })
      .willRespondWith(200, (builder) => {
        builder
          .jsonBody({
            message: MatchersV3.like('Registro alterado com sucesso'),
          })
          .headers({
            'Content-Type': MatchersV3.regex(
              /^application\/json(;.*)?$/,
              'application/json; charset=utf-8'
            ),
          });
      })
      .executeTest(async (mockServer) => {
        mockClient = new ApiClient(apiContext, mockServer.url);
        mockClient.setToken('Bearer token123'); // CORREÇÃO: define token manualmente

        const response = await mockClient.put(
          `/produtos/${productId}`,
          dadosAtualizados,
          true
        );
        expect(response.status()).toBe(200);

        const body = await response.json();
        expect(body.message).toContain('Registro alterado com sucesso');

        AllureHelper.addAttachment(
          'Produto Atualizado (Mock)',
          JSON.stringify(body, null, 2),
          'application/json'
        );
      });
  });

  // --------------------------------------------------------------------
  // CT-CONTRACT-05: Excluir produto (DELETE /produtos/:id)
  // --------------------------------------------------------------------
  test('CT-CONTRACT-05: Consumidor deve excluir produto com sucesso', async () => {
    AllureHelper.addSeverity('critical');
    AllureHelper.addTags('contract', 'consumer', 'products');
    AllureHelper.addDescription(
      'Verifica o contrato para exclusão de produto existente.'
    );
    AllureHelper.addFeature('Contrato - Produtos');
    AllureHelper.addStory('DELETE /produtos/:id');

    const productId = 'a1b2c3d4e5f6';

    await pact
      .addInteraction()
      .given(`produto com ID ${productId} existe`)
      .uponReceiving('uma requisição para excluir um produto')
      .withRequest('DELETE', `/produtos/${productId}`, (builder) => {
        builder.headers({
          'Authorization': MatchersV3.like('Bearer token123'),
        });
      })
      .willRespondWith(200, (builder) => {
        builder
          .jsonBody({
            message: MatchersV3.like('Registro excluído com sucesso'),
          })
          .headers({
            'Content-Type': MatchersV3.regex(
              /^application\/json(;.*)?$/,
              'application/json; charset=utf-8'
            ),
          });
      })
      .executeTest(async (mockServer) => {
        mockClient = new ApiClient(apiContext, mockServer.url);
        mockClient.setToken('Bearer token123'); // CORREÇÃO: define token manualmente

        const response = await mockClient.delete(
          `/produtos/${productId}`,
          true
        );
        expect(response.status()).toBe(200);

        const body = await response.json();
        expect(body.message).toContain('Registro excluído com sucesso');

        AllureHelper.addAttachment(
          'Produto Excluído (Mock)',
          JSON.stringify(body, null, 2),
          'application/json'
        );
      });
  });
});