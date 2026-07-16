/**
 * Fixture de autenticação para testes de API
 * 
 * Cria uma conta administradora dinamicamente e retorna um cliente autenticado.
 * Esta abordagem garante que os testes sejam autossuficientes e não dependam
 * de credenciais fixas que podem expirar.
 */

import { APIRequestContext, request } from '@playwright/test';
import { ApiClient } from '../client/ApiClient';
import { faker } from '@faker-js/faker';

export interface AuthFixture {
  client: ApiClient;
  email: string;
  password: string;
  apiContext: APIRequestContext;
}

/**
 * Cria uma conta administradora via API e retorna um cliente autenticado
 * com retry em caso de falha temporária da API.
 */
export async function createAuthenticatedClient(): Promise<AuthFixture> {
  const maxRetries = 3;
  let lastError: Error | null = null;

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      // Cria um contexto de API
      const apiContext = await request.newContext({
        baseURL: process.env.API_BASE_URL || 'https://serverest.dev',
        extraHTTPHeaders: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
      });

      // Gera credenciais únicas
      const email = `qa_test_${faker.string.alphanumeric(10)}@teste.com`;
      const password = '123456';

      // Tenta criar a conta administradora
      const createResponse = await apiContext.post('/usuarios', {
        data: {
          nome: 'QA Teste',
          email,
          password,
          administrador: 'true',
        },
      });

      if (createResponse.status() !== 201) {
        const errorBody = await createResponse.text();
        throw new Error(`Falha ao criar conta (${createResponse.status()}): ${errorBody}`);
      }

      // Inicializa o cliente e faz login
      const client = new ApiClient(apiContext, process.env.API_BASE_URL || 'https://serverest.dev');
      await client.login(email, password);

      return {
        client,
        email,
        password,
        apiContext,
      };
    } catch (error: any) {
      lastError = error;
      console.warn(`Tentativa ${attempt} de ${maxRetries} falhou: ${error.message}`);
      if (attempt < maxRetries) {
        // Aguarda 1 segundo antes de tentar novamente
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
    }
  }

  throw new Error(`Falha ao criar cliente autenticado após ${maxRetries} tentativas: ${lastError?.message}`);
}