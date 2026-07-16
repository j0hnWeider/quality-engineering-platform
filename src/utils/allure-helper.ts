/**
 * Helper para enriquecer os relatórios Allure
 * 
 * Fornece métodos para adicionar informações como:
 * - Severidade dos testes
 * - Tags (smoke, regression, security, etc.)
 * - Descrições detalhadas
 * - Parâmetros de entrada
 * - Evidências (screenshots, logs)
 * - Links para documentação
 * - Passos detalhados da execução
 */

import { allure } from 'allure-playwright';

export class AllureHelper {
  /**
   * Adiciona informações do ambiente ao relatório
   */
  static addEnvironment(key: string, value: string): void {
    allure.addEnvironment(key, value);
  }

  /**
   * Define a severidade do teste
   * @param severity - blocker | critical | normal | minor | trivial
   */
  static addSeverity(severity: 'blocker' | 'critical' | 'normal' | 'minor' | 'trivial'): void {
    allure.severity(severity);
  }

  /**
   * Adiciona tags ao teste para categorização
   * @param tags - Lista de tags (ex: 'api', 'smoke', 'security')
   */
  static addTags(...tags: string[]): void {
    tags.forEach(tag => allure.tag(tag));
  }

  /**
   * Adiciona uma descrição detalhada ao teste
   */
  static addDescription(text: string): void {
    allure.description(text);
  }

  /**
   * Adiciona um link para documentação ou issue
   */
  static addLink(name: string, url: string, type?: string): void {
    allure.link(url, name, type);
  }

  /**
   * Adiciona um parâmetro ao teste (ex: dados de entrada)
   */
  static addParameter(name: string, value: string): void {
    allure.addParameter(name, value);
  }

  /**
   * Adiciona um ID de caso de teste para rastreabilidade
   */
  static addTestCaseId(id: string): void {
    allure.addParameter('testCaseId', id);
  }

  /**
   * Adiciona uma evidência (screenshot, log, etc.)
   * @param name - Nome do anexo
   * @param content - Conteúdo (string, Buffer)
   * @param type - Tipo MIME (ex: 'image/png', 'text/plain')
   */
  static addAttachment(name: string, content: string | Buffer, type: string): void {
    allure.attachment(name, content, type);
  }

  /**
   * Cria um passo detalhado no relatório
   * @param name - Nome do passo
   * @param fn - Função a ser executada
   * @returns O resultado da função
   */
  static async addStep<T>(name: string, fn: () => Promise<T>): Promise<T> {
    return allure.step(name, fn);
  }

  /**
   * Adiciona informações sobre o executor (útil para pipelines)
   */
  static addExecutor(name: string, type: string, url: string): void {
    allure.addEnvironment('Executor Name', name);
    allure.addEnvironment('Executor Type', type);
    allure.addEnvironment('Executor URL', url);
  }

  /**
   * Adiciona uma história (feature) para agrupamento
   */
  static addFeature(feature: string): void {
    allure.feature(feature);
  }

  /**
   * Adiciona uma história (story) para agrupamento
   */
  static addStory(story: string): void {
    allure.story(story);
  }
}