/**
 * Testes de segurança - Injeção (SQL, XSS, Path Traversal)
 * 
 * Objetivo: verificar se a API trata adequadamente entradas maliciosas.
 */

import { test, expect } from '@playwright/test';
import { createAuthenticatedClient } from '../fixtures/auth.fixture';
import { AllureHelper } from '../../utils/allure-helper';

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

const REJECTION_STATUSES = [400, 401, 422, 403];

test.describe('Testes de segurança - Injeção', () => {
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
  // CT-SEC-01: SQL Injection
  // --------------------------------------------------------------------
  test('CT-SEC-01: Deve rejeitar SQL Injection no campo de busca de produtos', async () => {
    AllureHelper.addSeverity('critical');
    AllureHelper.addTags('security', 'injection', 'sql');
    AllureHelper.addDescription('Valida que a API rejeita payloads de SQL Injection no campo de busca de produtos.');
    AllureHelper.addTestCaseId('CT-SEC-01');
    AllureHelper.addFeature('Segurança');
    AllureHelper.addStory('Injeção SQL');

    for (const payload of MALICIOUS_PAYLOADS.sqlInjection) {
      await AllureHelper.addStep(`Testando payload: ${payload}`, async () => {
        const response = await client.get(`/produtos?nome=${encodeURIComponent(payload)}`);
        expect(response.status()).not.toBe(500);
        const body = await response.text();
        expect(body).not.toContain('SQL');
        expect(body).not.toContain('mysql');
        expect(body).not.toContain('syntax');
        expect(body).not.toContain('error');
        expect(body).not.toContain('stack trace');
      });
    }
  });

  // --------------------------------------------------------------------
  // CT-SEC-02: XSS
  // --------------------------------------------------------------------
  test('CT-SEC-02: Deve rejeitar XSS ao criar produto', async () => {
    AllureHelper.addSeverity('critical');
    AllureHelper.addTags('security', 'injection', 'xss');
    AllureHelper.addDescription('Valida que a API rejeita payloads de XSS (Cross-Site Scripting) ao criar um produto.');
    AllureHelper.addTestCaseId('CT-SEC-02');
    AllureHelper.addFeature('Segurança');
    AllureHelper.addStory('XSS (Cross-Site Scripting)');

    for (const payload of MALICIOUS_PAYLOADS.xss) {
      await AllureHelper.addStep(`Testando payload: ${payload}`, async () => {
        const response = await client.post('/produtos', {
          nome: payload,
          preco: 100,
          descricao: 'Teste XSS',
          quantidade: 1
        }, true);

        if (response.status() === 201) {
          const body = await response.json();
          if (body && body.nome) {
            expect(body.nome).not.toContain('<script>');
            expect(body.nome).not.toContain('onerror=');
            expect(body.nome).not.toContain('javascript:');
            expect(body.nome).not.toContain('<img');
            expect(body.nome).not.toContain('<svg');
            expect(body.nome).not.toContain('<body');
            expect(body.nome).not.toContain('<iframe');
          }
        } else {
          expect(REJECTION_STATUSES).toContain(response.status());
        }
      });
    }
  });

  // --------------------------------------------------------------------
  // CT-SEC-03: Path Traversal
  // --------------------------------------------------------------------
  test('CT-SEC-03: Deve rejeitar Path Traversal em parâmetros', async () => {
    AllureHelper.addSeverity('critical');
    AllureHelper.addTags('security', 'injection', 'path-traversal');
    AllureHelper.addDescription('Valida que a API rejeita tentativas de Path Traversal em parâmetros de URL.');
    AllureHelper.addTestCaseId('CT-SEC-03');
    AllureHelper.addFeature('Segurança');
    AllureHelper.addStory('Path Traversal');

    for (const payload of MALICIOUS_PAYLOADS.pathTraversal) {
      await AllureHelper.addStep(`Testando payload: ${payload}`, async () => {
        const response = await client.get(`/produtos?nome=${encodeURIComponent(payload)}`);
        expect(response.status()).not.toBe(500);
        const body = await response.text();
        expect(body).not.toContain('root:');
        expect(body).not.toContain('etc/passwd');
        expect(body).not.toContain('win.ini');
        expect(body).not.toContain('shadow');
        expect(body).not.toContain('boot.ini');
      });
    }
  });
});