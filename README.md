<div align="center">
  <img src="imagens/pixel-jeff-mario.gif" alt="QA Forge Banner" width="100%" style="max-width: 900px; border-radius: 12px;">
  <br><br>
</div>

<div align="center">

# QA Forge

**Laboratório de Engenharia de Qualidade**  
API · Interface · Performance · Segurança · Contrato · CI/CD

> O repositório permanece com o nome **quality-engineering-platform** por questões de versionamento, mas toda a documentação e evolução do projeto utilizam a identidade **QA Forge**.

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
  <img src="https://img.shields.io/badge/Pact-000000?style=flat-square&logo=pact&logoColor=white"/>
</p>

</div>

---

## Contexto e Problema

Em projetos de software, a garantia de qualidade frequentemente enfrenta desafios como:

- Suítes de testes monolíticas e de difícil manutenção.
- Baixa cobertura de testes não funcionais (performance, segurança).
- Ausência de integração contínua com validação automatizada.
- Dificuldade em gerar relatórios claros e rastreáveis.
- Quebra de contratos entre consumidores e provedores de API.

O **QA Forge** foi criado para resolver esses problemas em um ambiente controlado, aplicando práticas modernas de engenharia de qualidade em cenários realistas, inspirados em minha experiência profissional com desenvolvimento de software e arquitetura de aplicações.

---

## Abordagem e Solução

A solução adotada consiste em uma arquitetura modular, com camadas independentes para cada tipo de teste, e um pipeline de CI/CD que executa todas as validações automaticamente. A escolha de ferramentas e a estruturação do projeto foram orientadas pelos seguintes princípios:

- **Separação de responsabilidades** – cada módulo (API, UI, Performance, Segurança, Contrato) possui seu próprio conjunto de testes e configurações.
- **Reutilização** – clientes HTTP, fixtures e Page Objects são compartilhados entre os testes.
- **Tipagem forte** – TypeScript para garantir segurança e facilitar a manutenção.
- **Integração contínua** – GitHub Actions executa a suíte completa a cada push, com quality gate.
- **Relatórios abrangentes** – Playwright Report, Allure e OWASP ZAP geram evidências detalhadas.

A estratégia de testes combina validações funcionais e não funcionais, distribuídas em diferentes camadas para reduzir flaky tests e aumentar a confiabilidade.

---

## Matriz de Qualidade

| Categoria | Objetivo | Ferramenta | Status |
|-----------|----------|------------|:------:|
| API Testing | CRUD, autenticação, autorização e contratos | Playwright | OK |
| UI Testing | Fluxos End-to-End | Playwright | OK |
| Security Testing | SQL Injection, XSS, Path Traversal e Headers | Playwright | OK |
| Performance Testing | Carga e tempo de resposta | k6 | OK |
| Vulnerability Scan | Scanner passivo | OWASP ZAP | OK |
| Contract Testing | Testes de contrato orientados pelo consumidor | Pact | OK |
| Test Reports | Relatórios HTML | Playwright Report | OK |
| Dashboards | Relatórios avançados | Allure Report | OK |
| CI/CD | Pipeline automatizado | GitHub Actions | OK |
| Mutation Testing | Qualidade da suíte | Stryker | OK |
| Code Coverage | Cobertura de código | NYC | OK |
| Code Quality | Padronização | ESLint + Prettier | OK |

---

git add README.md
git commit -m "fix: corrige formatação do README e remove marcadores de conflito"
git push origin main
