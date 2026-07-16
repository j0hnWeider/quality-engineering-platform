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
 */
export async function createAuthenticatedClient(): Promise<AuthFixture> {
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

  // Cria a conta administradora
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
    throw new Error(`Falha ao criar conta: ${createResponse.status()} - ${errorBody}`);
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
}