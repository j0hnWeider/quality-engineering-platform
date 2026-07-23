import { APIRequestContext, APIResponse } from '@playwright/test';

export class ApiClient {
  private request: APIRequestContext;
  private baseURL: string;
  private token: string | null = null;

  constructor(request: APIRequestContext, baseURL: string) {
    this.request = request;
    this.baseURL = baseURL;
  }

  /**
   * Define o token de autenticação manualmente (para uso em testes)
   */
  setToken(token: string): void {
    this.token = token;
  }

  /**
   * Realiza login e armazena o token de autenticação
   * @throws Error se o login falhar ou não retornar token
   */
  async login(email: string, password: string): Promise<string> {
    const response = await this.request.post(`${this.baseURL}/login`, {
      data: { email, password },
    });

    if (response.status() !== 200) {
      const errorBody = await response.text();
      throw new Error(`Login falhou (${response.status()}): ${errorBody}`);
    }

    const body = await response.json();
    const token = body.authorization || body.token;

    if (!token) {
      throw new Error(`Login não retornou token. Campos recebidos: ${Object.keys(body).join(', ')}`);
    }

    this.token = token;
    return token;
  }

  private getAuthHeader(): string | null {
    if (!this.token) return null;
    return this.token.startsWith('Bearer ') ? this.token : `Bearer ${this.token}`;
  }

  async get(endpoint: string, auth: boolean = false): Promise<APIResponse> {
    const headers: Record<string, string> = {};
    if (auth) {
      const authHeader = this.getAuthHeader();
      if (authHeader) headers['Authorization'] = authHeader;
    }
    return await this.request.get(`${this.baseURL}${endpoint}`, { headers });
  }

  async post(endpoint: string, data: any, auth: boolean = false): Promise<APIResponse> {
    const headers: Record<string, string> = {};
    if (auth) {
      const authHeader = this.getAuthHeader();
      if (authHeader) headers['Authorization'] = authHeader;
    }
    return await this.request.post(`${this.baseURL}${endpoint}`, { data, headers });
  }

  async put(endpoint: string, data: any, auth: boolean = false): Promise<APIResponse> {
    const headers: Record<string, string> = {};
    if (auth) {
      const authHeader = this.getAuthHeader();
      if (authHeader) headers['Authorization'] = authHeader;
    }
    return await this.request.put(`${this.baseURL}${endpoint}`, { data, headers });
  }

  async delete(endpoint: string, auth: boolean = false): Promise<APIResponse> {
    const headers: Record<string, string> = {};
    if (auth) {
      const authHeader = this.getAuthHeader();
      if (authHeader) headers['Authorization'] = authHeader;
    }
    return await this.request.delete(`${this.baseURL}${endpoint}`, { headers });
  }
}