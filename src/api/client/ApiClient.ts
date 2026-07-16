import { APIRequestContext, APIResponse } from '@playwright/test';

/**
 * Cliente HTTP reutilizável para testes de API
 * 
 * Responsabilidades:
 * - Gerenciar token de autenticação
 * - Fornecer métodos para requisições HTTP (GET, POST, PUT, DELETE)
 * - Adicionar headers de autorização quando necessário
 */
export class ApiClient {
  private request: APIRequestContext;
  private baseURL: string;
  private token: string | null = null;

  constructor(request: APIRequestContext, baseURL: string) {
    this.request = request;
    this.baseURL = baseURL;
  }

  /**
   * Realiza login e armazena o token de autenticação
   * @param email - Email do usuário
   * @param password - Senha do usuário
   * @returns Token de autenticação
   */
  async login(email: string, password: string): Promise<string> {
    const response = await this.request.post(`${this.baseURL}/login`, {
      data: { email, password },
    });
    const body = await response.json();
    this.token = body.authorization;
    return this.token;
  }

  /**
   * Retorna o header de autorização com o token
   * Verifica se o token já contém o prefixo "Bearer " para evitar duplicação
   */
  private getAuthHeader(): string | null {
    if (!this.token) return null;
    return this.token.startsWith('Bearer ') ? this.token : `Bearer ${this.token}`;
  }

  /**
   * Requisição GET
   * @param endpoint - Endpoint da API (ex: /produtos)
   * @param auth - Se true, adiciona header de autorização
   * @returns Resposta da API
   */
  async get(endpoint: string, auth: boolean = false): Promise<APIResponse> {
    const headers: Record<string, string> = {};
    if (auth) {
      const authHeader = this.getAuthHeader();
      if (authHeader) headers['Authorization'] = authHeader;
    }
    return await this.request.get(`${this.baseURL}${endpoint}`, { headers });
  }

  /**
   * Requisição POST
   * @param endpoint - Endpoint da API (ex: /produtos)
   * @param data - Dados a serem enviados no body
   * @param auth - Se true, adiciona header de autorização
   * @returns Resposta da API
   */
  async post(endpoint: string, data: any, auth: boolean = false): Promise<APIResponse> {
    const headers: Record<string, string> = {};
    if (auth) {
      const authHeader = this.getAuthHeader();
      if (authHeader) headers['Authorization'] = authHeader;
    }
    return await this.request.post(`${this.baseURL}${endpoint}`, { data, headers });
  }

  /**
   * Requisição PUT
   * @param endpoint - Endpoint da API (ex: /produtos/1)
   * @param data - Dados a serem enviados no body
   * @param auth - Se true, adiciona header de autorização
   * @returns Resposta da API
   */
  async put(endpoint: string, data: any, auth: boolean = false): Promise<APIResponse> {
    const headers: Record<string, string> = {};
    if (auth) {
      const authHeader = this.getAuthHeader();
      if (authHeader) headers['Authorization'] = authHeader;
    }
    return await this.request.put(`${this.baseURL}${endpoint}`, { data, headers });
  }

  /**
   * Requisição DELETE
   * @param endpoint - Endpoint da API (ex: /produtos/1)
   * @param auth - Se true, adiciona header de autorização
   * @returns Resposta da API
   */
  async delete(endpoint: string, auth: boolean = false): Promise<APIResponse> {
    const headers: Record<string, string> = {};
    if (auth) {
      const authHeader = this.getAuthHeader();
      if (authHeader) headers['Authorization'] = authHeader;
    }
    return await this.request.delete(`${this.baseURL}${endpoint}`, { headers });
  }
}