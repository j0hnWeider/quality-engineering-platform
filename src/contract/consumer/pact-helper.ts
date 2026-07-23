/**
 * Helper de configuração do Pact para testes de contrato
 * 
 * Centraliza a configuração do PactV4, matchers e utilitários
 * para os testes de contrato do lado consumidor.
 */

import { PactV4 } from '@pact-foundation/pact/src/v4';
import { SpecificationVersion } from '@pact-foundation/pact/src/v3/types';
import * as MatchersV3 from '@pact-foundation/pact/src/v3/matchers';
import path from 'path';

export interface PactOptions {
  consumer: string;
  provider: string;
  port?: number;
  host?: string;
  logLevel?: 'trace' | 'debug' | 'info' | 'warn' | 'error';
}

export { MatchersV3 };

/**
 * Cria uma nova instância do PactV4 configurada
 */
export function createPact(options: PactOptions): PactV4 {
  return new PactV4({
    consumer: options.consumer,
    provider: options.provider,
    port: options.port || 0,
    host: options.host || '127.0.0.1',
    spec: SpecificationVersion.SPECIFICATION_VERSION_V4,
    logLevel: options.logLevel || 'info',
    dir: path.resolve(process.cwd(), 'src/contract/pacts'),
  });
}

/**
 * Caminho padrão onde os arquivos pact serão salvos
 */
export function getPactDir(): string {
  return path.resolve(process.cwd(), 'src/contract/pacts');
}

/**
 * Retorna o caminho do arquivo pact para um par consumidor/provedor
 */
export function getPactFilePath(consumer: string, provider: string): string {
  return path.resolve(getPactDir(), `${consumer}-${provider}.json`);
}

