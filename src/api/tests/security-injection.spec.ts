/**
 * ========================================================================
 * Testes de segurança - Injeção (SQL, XSS, Path Traversal)
 * ========================================================================
 * 
 * Objetivo: verificar se a API trata adequadamente entradas maliciosas
 * em campos que aceitam dados do usuário.
 * 
 * Payloads utilizados:
 * - SQL Injection: variações de cláusulas OR, UNION, comentários
 * - XSS: tags script, eventos onerror, pseudo-protocolos
 * - Path Traversal: tentativas de acessar arquivos do sistema
 */

import { test, expect, APIRequestContext } from '@playwright/test';
import { ApiClient } from '../client/ApiClient';

let apiContext: APIRequestContext;
let client: ApiClient;

/**
 * Conjunto de payloads maliciosos organizados por categoria
 */
const MALICIOUS_PAYLOADS = {
  sqlInjection: [
    "' OR '1'='1",
    "' OR 1=1 --",
    "' UNION SELECT null, username, password FROM users --",
    "'; DROP TABLE users; --",
    "' OR '1'='1' /*",
    "admin'--",
    "1' OR '1' = '1",
    "1' OR 1=1; --",
  ],
  xss: [
    "<script>alert('XSS')</script>",
    "<img src=x onerror=alert('XSS')>",
    "javascript:alert('XSS')",
    "<svg/onload=alert('XSS')>",
    "<body onload=alert('XSS')>",
    "<iframe src='javascript:alert(1)'>",
    "\"><script>alert('XSS')</script>",
    "';alert('XSS');//",
  ],
  pathTraversal: [
    "../../../etc/passwd",
    "..\\..\\..\\windows\\win.ini",
    "../../../../../../etc/shadow",
    "....//....//....//etc/passwd",
    "%2e%2e%2fetc%2fpasswd",
  ],
};

/**
 * Status HTTP considerados como rejeição válida para entradas maliciosas
 */
const REJECTION_STATUSES = [400, 401, 422, 403];

test.describe('Testes de segurança - Injeção', () => {

  // Autenticação prévia com conta administradora
  test.beforeAll(async ({ playwright }) => {
    apiContext = await playwright.request.newContext({
      baseURL: process.env.BASE_URL || 'https://serverest.dev',
      extraHTTPHeaders: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    });
    client = new ApiClient(apiContext, process.env.BASE_URL || 'https://serverest.dev');
    await client.login('johnqateste@gmail.com', 'john123');
  });

  test.afterAll(async () => {
    await apiContext.dispose();
  });

  // ======================================================================
  // CT-SEC-01: SQL Injection no campo de busca
  // ======================================================================
  test('CT-SEC-01: Deve rejeitar SQL Injection no campo de busca de produtos', async () => {
    for (const payload of MALICIOUS_PAYLOADS.sqlInjection) {
      const response = await client.get(`/produtos?nome=${encodeURIComponent(payload)}`);
      
      // Verificação de status: não deve retornar erro interno 500
      expect(response.status()).not.toBe(500);

      // Verificação de corpo: não deve conter mensagens de erro de banco de dados
      const body = await response.text();
      expect(body).not.toContain('SQL');
      expect(body).not.toContain('mysql');
      expect(body).not.toContain('syntax');
      expect(body).not.toContain('error');
      expect(body).not.toContain('stack trace');
    }
  });

  // ======================================================================
  // CT-SEC-02: XSS em campos de criação de produto
  // ======================================================================
  test('CT-SEC-02: Deve rejeitar XSS ao criar produto', async () => {
    for (const payload of MALICIOUS_PAYLOADS.xss) {
      const response = await client.post('/produtos', {
        nome: payload,
        preco: 100,
        descricao: 'Teste XSS',
        quantidade: 1
      }, true);

      // Se a API criar o produto (status 201), verifica se o conteúdo foi escapado
      if (response.status() === 201) {
        const body = await response.json();
        expect(body.nome).not.toContain('<script>');
        expect(body.nome).not.toContain('onerror=');
        expect(body.nome).not.toContain('javascript:');
        expect(body.nome).not.toContain('<img');
        expect(body.nome).not.toContain('<svg');
        expect(body.nome).not.toContain('<body');
        expect(body.nome).not.toContain('<iframe');
      } else {
        // Se rejeitou, status deve estar entre os esperados para erro
        expect(REJECTION_STATUSES).toContain(response.status());
      }
    }
  });

  // ======================================================================
  // CT-SEC-03: Path Traversal em parâmetros
  // ======================================================================
  test('CT-SEC-03: Deve rejeitar Path Traversal em parâmetros', async () => {
    for (const payload of MALICIOUS_PAYLOADS.pathTraversal) {
      const response = await client.get(`/produtos?nome=${encodeURIComponent(payload)}`);
      
      // Não deve retornar erro interno
      expect(response.status()).not.toBe(500);

      // Verificação de corpo: não deve conter conteúdo de arquivos do sistema
      const body = await response.text();
      expect(body).not.toContain('root:');
      expect(body).not.toContain('etc/passwd');
      expect(body).not.toContain('win.ini');
      expect(body).not.toContain('shadow');
      expect(body).not.toContain('boot.ini');
    }
  });
});