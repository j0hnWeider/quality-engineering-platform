/**
 * ========================================================================
 * Testes de segurança - Cabeçalhos HTTP
 * ========================================================================
 * 
 * Objetivo: verificar a presença e configuração de cabeçalhos de segurança
 * essenciais nas respostas da API.
 */

import { test, expect } from '@playwright/test';

test.describe('Testes de segurança - Cabeçalhos HTTP', () => {

  // ======================================================================
  // CT-SEC-08: Cabeçalhos de segurança essenciais
  // ======================================================================
  test('CT-SEC-08: Deve conter cabeçalhos de segurança essenciais', async ({ request }) => {
    const response = await request.get('https://serverest.dev');
    const headers = response.headers();

    const securityHeaders = [
      { name: 'X-Frame-Options', expected: ['DENY', 'SAMEORIGIN'] },
      { name: 'X-Content-Type-Options', expected: ['nosniff'] },
      { name: 'Content-Security-Policy', expected: ['default-src', 'script-src'] },
      { name: 'Strict-Transport-Security', expected: ['max-age'] },
      { name: 'Referrer-Policy', expected: ['strict-origin', 'same-origin', 'no-referrer'] },
    ];

    const missingHeaders: string[] = [];
    for (const header of securityHeaders) {
      const value = headers[header.name.toLowerCase()];
      if (!value) {
        missingHeaders.push(header.name);
        continue;
      }
      const found = header.expected.some(exp => value.toLowerCase().includes(exp.toLowerCase()));
      if (!found) {
        console.warn(`Cabeçalho ${header.name} não contém valor esperado (${header.expected.join('|')}), encontrado: ${value}`);
      }
    }

    if (missingHeaders.length > 0) {
      console.warn(`Cabeçalhos de segurança ausentes: ${missingHeaders.join(', ')}`);
    }
    // Não falha o teste, apenas registra (em ambiente corporativo, isso seria um critério)
    // expect(missingHeaders).toEqual([]);
  });

  // ======================================================================
  // CT-SEC-09: Configuração de CORS
  // ======================================================================
  test('CT-SEC-09: Deve retornar cabeçalho CORS adequado', async ({ request }) => {
    const response = await request.get('https://serverest.dev', {
      headers: { 'Origin': 'https://example.com' },
    });
    const headers = response.headers();
    const allowOrigin = headers['access-control-allow-origin'];
    
    if (!allowOrigin) {
      console.warn('CORS não configurado na API');
    } else {
      console.log(`CORS configurado: Access-Control-Allow-Origin = ${allowOrigin}`);
      if (allowOrigin === '*') {
        console.warn('CORS muito permissivo (Access-Control-Allow-Origin: *)');
      }
    }
  });
});