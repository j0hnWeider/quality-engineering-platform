/**
 * Testes de Contrato (Provider) - Produtos
 * 
 * Verifica se o provedor (Serverest) está de acordo com os contratos
 * definidos pelos consumidores. Esta verificação é feita diretamente
 * contra a API real.
 * 
 * Fluxo:
 * 1. Lê os arquivos pact gerados pelos consumer tests
 * 2. Executa as requisições reais contra o provider (Serverest)
 * 3. Compara as respostas com as expectativas definidas no contrato
 * 4. Gera relatório de verificação
 */

import { test, expect } from '@playwright/test';
import { Verifier } from '@pact-foundation/pact/src/dsl/verifier';
import { createAuthenticatedClient } from '../../api/fixtures/auth.fixture';
import { AllureHelper } from '../../utils/allure-helper';
import path from 'path';

const PROVIDER_BASE_URL = process.env.API_BASE_URL || 'https://serverest.dev';
const PACT_DIR = path.resolve(process.cwd(), 'src/contract/pacts');

test.describe('Verificação de Contrato (Provider) - Serverest', () => {
  let authToken: string;

  test.beforeAll(async () => {
    // Obtém token real para os estados do provider
    const auth = await createAuthenticatedClient();
    const token = auth.client['token'];
    authToken = token || '';
  });

  // --------------------------------------------------------------------
  // CT-PROVIDER-01: Verificar contrato de listagem de produtos
  // --------------------------------------------------------------------
  test('CT-PROVIDER-01: Provider deve atender contrato de GET /produtos', async () => {
    AllureHelper.addSeverity('critical');
    AllureHelper.addTags('contract', 'provider', 'verification');
    AllureHelper.addDescription(
      'Verifica se o provedor atende ao contrato definido para GET /produtos.'
    );
    AllureHelper.addFeature('Verificação de Contrato');
    AllureHelper.addStory('Provider - GET /produtos');

    const pactPath = path.join(PACT_DIR, 'QA_Forge_WebApp-Serverest_API.json');

    const verifier = new Verifier({
      providerBaseUrl: PROVIDER_BASE_URL,
      pactUrls: [pactPath],
      provider: 'Serverest_API',
      providerVersion: '1.0.0',
      publishVerificationResult: false,
      logLevel: 'info',
      // Estados do provider que serão configurados antes da verificação
      stateHandlers: {
        'produtos existem': async () => {
          // Estado já existe no ambiente de teste
          console.log('✅ Provider state: produtos existem');
        },
        'produto não existe': async () => {
          console.log('✅ Provider state: produto não existe');
        },
        'usuário não autenticado': async () => {
          console.log('✅ Provider state: usuário não autenticado');
        },
        [`produto com ID ${'a1b2c3d4e5f6'} existe`]: async () => {
          console.log('✅ Provider state: produto com ID específico existe');
        },
      },
      requestFilter: async (req: any) => {
        // Adiciona token de autenticação real para requisições autenticadas
        if (req.headers.Authorization) {
          req.headers.Authorization = authToken.startsWith('Bearer ')
            ? authToken
            : `Bearer ${authToken}`;
        }
        return req;
      },
    });

    try {
      const result = await verifier.verifyProvider();
      AllureHelper.addAttachment(
        'Resultado da Verificação',
        JSON.stringify(result, null, 2),
        'application/json'
      );
      expect(result).toBeDefined();
    } catch (error: any) {
      AllureHelper.addAttachment(
        'Erro na Verificação',
        error.message,
        'text/plain'
      );
      throw error;
    }
  });

  // --------------------------------------------------------------------
  // CT-PROVIDER-02: Verificação manual dos contratos
  // --------------------------------------------------------------------
  test('CT-PROVIDER-02: Validação manual de contrato - GET /produtos', async () => {
    AllureHelper.addSeverity('critical');
    AllureHelper.addTags('contract', 'provider', 'verification');
    AllureHelper.addDescription(
      'Valida manualmente se a resposta real do provider atende ao contrato esperado.'
    );
    AllureHelper.addFeature('Verificação de Contrato');
    AllureHelper.addStory('Provider - Validação Manual');

    // Faz requisição real ao provider
    const response = await fetch(`${PROVIDER_BASE_URL}/produtos`);
    expect(response.status).toBe(200);

    const body = await response.json();
    
    // Valida campos obrigatórios do contrato
    expect(body).toHaveProperty('quantidade');
    expect(typeof body.quantidade).toBe('number');
    expect(body.quantidade).toBeGreaterThanOrEqual(0);
    
    expect(body).toHaveProperty('produtos');
    expect(Array.isArray(body.produtos)).toBeTruthy();

    if (body.produtos.length > 0) {
      const primeiro = body.produtos[0];
      expect(primeiro).toHaveProperty('nome');
      expect(primeiro).toHaveProperty('preco');
      expect(primeiro).toHaveProperty('descricao');
      expect(primeiro).toHaveProperty('quantidade');
      expect(primeiro).toHaveProperty('_id');
      
      // Valida tipos dos campos
      expect(typeof primeiro.nome).toBe('string');
      expect(typeof primeiro.preco).toBe('number');
      expect(typeof primeiro.descricao).toBe('string');
      expect(typeof primeiro.quantidade).toBe('number');
      expect(typeof primeiro._id).toBe('string');
    }

    AllureHelper.addAttachment(
      'Resposta Real',
      JSON.stringify(body, null, 2),
      'application/json'
    );
  });

  // --------------------------------------------------------------------
  // CT-PROVIDER-03: Validação de erro 401 sem autenticação
  // --------------------------------------------------------------------
  test('CT-PROVIDER-03: Provider deve retornar 401 sem autenticação', async () => {
    AllureHelper.addSeverity('normal');
    AllureHelper.addTags('contract', 'provider', 'security');
    AllureHelper.addDescription(
      'Valida que o provider retorna 401 ao tentar criar produto sem token.'
    );
    AllureHelper.addFeature('Verificação de Contrato');
    AllureHelper.addStory('Provider - 401 Sem Auth');

    const response = await fetch(`${PROVIDER_BASE_URL}/produtos`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        nome: 'Produto Teste',
        preco: 100,
        descricao: 'Teste',
        quantidade: 1,
      }),
    });

    expect(response.status).toBe(401);

    const body = await response.json();
    expect(body).toHaveProperty('message');

    AllureHelper.addAttachment(
      'Resposta 401 Real',
      JSON.stringify(body, null, 2),
      'application/json'
    );
  });
});

