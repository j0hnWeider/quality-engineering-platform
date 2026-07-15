import { APIRequestContext, APIResponse } from '@playwright/test';

export class ApiClient {
  private request: APIRequestContext;
  private baseURL: string;
  private token: string | null = null;

  constructor(request: APIRequestContext, baseURL: string) {
    this.request = request;
    this.baseURL = baseURL;
  }

  async login(email: string, password: string): Promise<string> {
    const response = await this.request.post(`${this.baseURL}/login`, {
      data: { email, password },
    });
    const body = await response.json();
    this.token = body.authorization;
    return this.token;
  }

  async get(endpoint: string, auth: boolean = false): Promise<APIResponse> {
    const headers: Record<string, string> = {};
    if (auth && this.token) {
      headers['Authorization'] = `Bearer ${this.token}`;
    }
    return await this.request.get(`${this.baseURL}${endpoint}`, { headers });
  }

  async post(endpoint: string, data: any, auth: boolean = false): Promise<APIResponse> {
    const headers: Record<string, string> = {};
    if (auth && this.token) {
      headers['Authorization'] = `Bearer ${this.token}`;
    }
    return await this.request.post(`${this.baseURL}${endpoint}`, { data, headers });
  }

  async delete(endpoint: string, auth: boolean = false): Promise<APIResponse> {
    const headers: Record<string, string> = {};
    if (auth && this.token) {
      headers['Authorization'] = `Bearer ${this.token}`;
    }
    return await this.request.delete(`${this.baseURL}${endpoint}`, { headers });
  }
}