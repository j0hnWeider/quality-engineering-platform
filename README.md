
```markdown
<div align="center">
  <img src="imagens/pixel-jeff-mario.gif" alt="QA Forge Banner" width="100%" style="max-width: 900px; border-radius: 12px;">
  <br><br>
</div>

<div align="center">

# QA Forge

**Laboratório de Engenharia de Qualidade**  
API · Interface · Performance · Segurança · CI/CD

<p align="center">
  <img src="https://img.shields.io/github/actions/workflow/status/j0hnWeider/quality-engineering-platform/ci-quality-gate.yml?branch=main&style=for-the-badge&label=CI%2FCD"/>
  <img src="https://img.shields.io/github/last-commit/j0hnWeider/quality-engineering-platform?style=for-the-badge"/>
  <img src="https://img.shields.io/github/repo-size/j0hnWeider/quality-engineering-platform?style=for-the-badge"/>
  <img src="https://img.shields.io/github/license/j0hnWeider/quality-engineering-platform?style=for-the-badge"/>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Playwright-45BA63?style=flat-square&logo=playwright&logoColor=white"/>
  <img src="https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white"/>
  <img src="https://img.shields.io/badge/GitHub_Actions-2088FF?style=flat-square&logo=github-actions&logoColor=white"/>
  <img src="https://img.shields.io/badge/Docker-2496ED?style=flat-square&logo=docker&logoColor=white"/>
  <img src="https://img.shields.io/badge/OWASP_ZAP-00549E?style=flat-square"/>
  <img src="https://img.shields.io/badge/k6-7D64FF?style=flat-square"/>
</p>

</div>

---

## Contexto e Problema

Em projetos de software, a garantia de qualidade frequentemente enfrenta desafios como testes frágeis, baixa cobertura, falta de integração contínua e dificuldade em validar segurança e performance de forma consistente. O objetivo deste laboratório é criar um ambiente controlado para estudar e resolver esses problemas, aplicando práticas de engenharia de qualidade em cenários realistas.

**Problema identificado:**  
- Suítes de testes monolíticas e de difícil manutenção.  
- Ausência de testes não funcionais (performance, segurança).  
- Pipeline de CI/CD sem validação automatizada de qualidade.  
- Dificuldade em gerar relatórios claros e rastreáveis.

---

## Abordagem e Solução

A solução adotada foi construir uma arquitetura modular, separando responsabilidades por camada (API, UI, Performance, Segurança) e utilizando ferramentas especializadas para cada frente. A integração contínua com GitHub Actions garante que cada alteração seja validada automaticamente, e a geração de relatórios (Playwright, Allure, ZAP) fornece evidências objetivas.

**Como o problema foi resolvido:**  

1. **Estruturação modular** – cada tipo de teste em seu próprio diretório, com clientes reutilizáveis e Page Objects.  
2. **Automação de testes funcionais** – Playwright para API e UI, com validação de contratos e fluxos end-to-end.  
3. **Testes de segurança** – cenários de injeção, autenticação e cabeçalhos, além de scanner passivo com OWASP ZAP.  
4. **Testes de performance** – scripts k6 para validar tempos de resposta sob carga.  
5. **Pipeline de qualidade** – execução automática de todos os testes a cada push, com quality gate.  
6. **Relatórios e dashboards** – Playwright Report e Allure para visualização consolidada.

---

## Estratégia de Testes

| Categoria | Objetivo | Ferramenta | Status |
|-----------|----------|------------|:------:|
| API Testing | CRUD, autenticação, autorização e contratos | Playwright | OK |
| UI Testing | Fluxos End-to-End | Playwright | OK |
| Security Testing | SQL Injection, XSS, Path Traversal e Headers | Playwright | OK |
| Performance Testing | Carga e tempo de resposta | k6 | OK |
| Vulnerability Scan | Scanner passivo | OWASP ZAP | OK |
| Test Reports | Relatórios HTML | Playwright Report | OK |
| Dashboards | Relatórios avançados | Allure Report | OK |
| CI/CD | Pipeline automatizado | GitHub Actions | OK |
| Mutation Testing | Qualidade da suíte | Stryker | OK |
| Code Coverage | Cobertura de código | NYC | OK |
| Code Quality | Padronização | ESLint + Prettier | OK |

---

## Evidências

Resultados obtidos na última execução completa da suíte.

| Visão Geral | Testes de API |
|-------------|---------------|
| ![Todos os testes](imagens/all-tests-passing.png) | ![API](imagens/api-tests-passing.png) |

| Testes de Interface | Testes de Segurança |
|---------------------|---------------------|
| ![UI](imagens/ui-tests-passing.png) | ![Segurança](imagens/security-tests-passing.png) |

| OWASP ZAP | Pipeline CI/CD |
|-----------|----------------|
| ![OWASP ZAP](imagens/security-report-passing.png) | ![Pipeline](imagens/pipeline-passing.png) |

| Relatório Allure |
|------------------|
| ![Allure](imagens/allure-report-passing.png) |

---

## Como Reportar Resultados

Os relatórios gerados após cada execução são os principais artefatos para comunicação de resultados:

- **Playwright HTML Report** – `playwright-report/index.html` – detalhamento de cada teste, com evidências em vídeo/screenshot.  
- **Allure Report** – acessível via `npm run report:allure` – dashboard interativo com histórico e métricas.  
- **OWASP ZAP Report** – `reports/` – lista de vulnerabilidades encontradas.  
- **Pipeline Summary** – no GitHub Actions, com status de cada etapa e links para os artefatos.

Para reportar um problema ou sugerir melhoria, abra uma **Issue** no repositório, descrevendo o cenário, o comportamento esperado e o observado, anexando evidências quando possível.

---

## Instalação e Uso

### Pré-requisitos

- Node.js 18+  
- npm 9+  
- Docker (para OWASP ZAP)  
- Playwright browsers: `npx playwright install`

### Instalação

```bash
git clone https://github.com/j0hnWeider/quality-engineering-platform.git
cd quality-engineering-platform
npm install
npx playwright install
cp .env.example .env   # opcional
```

### Comandos principais

| Comando | Descrição |
|---------|-----------|
| `npm run test:all` | Executa toda a suíte (API + UI) |
| `npm run test:api` | Apenas testes de API |
| `npm run test:ui` | Apenas testes de interface |
| `npm run test:perf` | Testes de performance com k6 |
| `npm run test:security` | Testes de segurança ativos |
| `npm run test:zap` | Scanner OWASP ZAP |
| `npm run report:allure` | Gera e exibe relatório Allure |
| `npm run coverage` | Relatório de cobertura de código |
| `npm run lint` / `npm run lint:fix` | Análise e correção de código |
| `npm run format` | Formatação com Prettier |

---

## Integração Contínua

O pipeline CI/CD (GitHub Actions) é acionado a cada push na branch `main` e executa as seguintes etapas:

1. Instalação de dependências  
2. Instalação dos navegadores Playwright  
3. Testes de API  
4. Testes de UI  
5. Testes de performance  
6. Scanner OWASP ZAP  
7. Geração de relatórios e publicação de artefatos  

Qualquer falha crítica interrompe o fluxo, impedindo a integração de alterações que não atendam aos critérios de qualidade definidos.

---

## Contribuição

Contribuições são bem-vindas. Para reportar problemas ou sugerir melhorias, utilize o sistema de Issues do GitHub. Pull requests devem seguir os padrões de código (ESLint + Prettier) e incluir testes adequados.

---

## Licença

Este projeto está licenciado sob a licença MIT. Consulte o arquivo [LICENSE](./LICENSE) para mais informações.

---

## Autor

**John Weider**  
Engenheiro de Qualidade | Pós-graduado em Engenharia de Software | Graduado em Defesa Cibernética  

- [LinkedIn](https://www.linkedin.com/in/john-weider)  
- E-mail: johnweider.tj@gmail.com

---

<div align="center">

**Se este projeto foi útil, considere deixar uma estrela no repositório.**  
*Construindo qualidade através da prática, experimentação e aprendizado contínuo.*

</div>
```
