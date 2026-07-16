<div align="center">

# 🚀 Quality Engineering Platform

### Plataforma de Engenharia de Qualidade

**Framework completo de automação de testes para API, Interface, Performance, Segurança e Integração Contínua.**

<br>

<p align="center">

<img src="https://img.shields.io/github/actions/workflow/status/j0hnWeider/quality-engineering-platform/ci-quality-gate.yml?label=CI%2FCD&style=for-the-badge" />

<img src="https://img.shields.io/github/last-commit/j0hnWeider/quality-engineering-platform?style=for-the-badge" />

<img src="https://img.shields.io/github/repo-size/j0hnWeider/quality-engineering-platform?style=for-the-badge" />

<img src="https://img.shields.io/github/license/j0hnWeider/quality-engineering-platform?style=for-the-badge" />

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

# Sumário

- [📖 Sobre o Projeto](#-sobre-o-projeto)
- [🎯 Objetivos](#-objetivos)
- [✨ Principais Funcionalidades](#-principais-funcionalidades)
- [🏗 Arquitetura](#-arquitetura)
- [🧪 Estratégia de Testes](#-estratégia-de-testes)
- [🛠 Stack Tecnológica](#-stack-tecnológica)
- [📁 Estrutura do Projeto](#-estrutura-do-projeto)
- [📊 Matriz de Qualidade](#-matriz-de-qualidade)
- [🚀 Primeiros Passos](#-primeiros-passos)
- [▶ Execução](#-execução)
- [📈 Relatórios](#-relatórios)
- [⚙ Pipeline CI/CD](#-pipeline-cicd)
- [💡 Decisões Técnicas](#-decisões-técnicas)
- [🚧 Roadmap](#-roadmap)
- [👨‍💻 Autor](#-autor)

---

# Sobre o Projeto

O **Quality Engineering Platform** é uma plataforma de automação de testes desenvolvida para demonstrar práticas modernas de **Engenharia de Qualidade**, abrangendo desde testes funcionais até segurança, performance e integração contínua.

Mais do que um conjunto de testes automatizados, este projeto representa um **ecossistema completo de Quality Engineering**, adotando boas práticas de arquitetura, reutilização de componentes e pipelines automatizados para validação contínua da qualidade do software.

O framework foi construído seguindo princípios de engenharia de software, priorizando:

- ✅ Escalabilidade
- ✅ Manutenibilidade
- ✅ Reutilização de código
- ✅ Entrega Contínua (CI/CD)
- ✅ Segurança desde o desenvolvimento (*Security by Design*)
- ✅ Arquitetura modular

Seu principal objetivo é demonstrar como um projeto de automação pode validar diferentes dimensões da qualidade de uma aplicação:

| Área | Descrição |
|------|-----------|
| 🌐 Testes de API | Validação funcional, autenticação, autorização e contrato |
| 🖥️ Testes de Interface | Fluxos End-to-End utilizando Playwright |
| ⚡ Testes de Performance | Avaliação de carga e tempo de resposta com k6 |
| 🔒 Testes de Segurança | Análise passiva de vulnerabilidades com OWASP ZAP |
| 🔄 Integração Contínua | Pipeline automatizado utilizando GitHub Actions |
| 📊 Relatórios | Geração automática de evidências em HTML |

---

# Objetivos

| Objetivo | Status |
|:----------|:------:|
| Automação de Testes de API | ✅ |
| Automação de Testes de Interface | ✅ |
| Testes de Performance | ✅ |
| Testes de Segurança | ✅ |
| Pipeline CI/CD | ✅ |
| Relatórios HTML | ✅ |
| Arquitetura Escalável | ✅ |
| Componentes Reutilizáveis | ✅ |

---

# Principais Funcionalidades

| Funcionalidade | Descrição |
|----------------|-----------|
| Testes de API | CRUD, autenticação, autorização e validação de contratos |
| Testes de Interface | Fluxos End-to-End utilizando Playwright |
| Testes de Performance | Testes de carga utilizando k6 |
| Testes de Segurança | Scanner passivo com OWASP ZAP |
| Integração Contínua | Pipeline automatizado no GitHub Actions |
| Relatórios | Geração automática de relatórios HTML |
| Page Object Model | Componentes reutilizáveis para testes de UI |
| Cliente HTTP | Camada reutilizável para comunicação com APIs |
| TypeScript | Tipagem estática para maior segurança e manutenção |

---

# Arquitetura

O projeto adota uma **arquitetura híbrida de testes**, utilizando plataformas distintas para cada camada de validação, garantindo maior estabilidade e reduzindo a ocorrência de testes instáveis (*flaky tests*).

| Camada | Plataforma | Responsabilidade |
|---------|------------|------------------|
| 🌐 API | Serverest | CRUD, autenticação, autorização e validação de contratos |
| 🖥️ Interface | SauceDemo | Fluxos completos de compra |
| ⚡ Performance | SauceDemo | Testes de carga e tempo de resposta |
| 🔒 Segurança | SauceDemo | Varredura passiva utilizando OWASP ZAP |
| 🔄 CI/CD | GitHub Actions | Execução automatizada do pipeline |

---

## Por que utilizar uma Arquitetura Híbrida?

Ao invés de utilizar uma única aplicação para todas as camadas de testes, este projeto distribui cada responsabilidade em plataformas especializadas.

Essa abordagem proporciona diversos benefícios:

- Redução de testes instáveis (*Flaky Tests*)
- Maior confiabilidade dos resultados
- Melhor organização da arquitetura
- Facilidade de manutenção
- Independência entre as camadas de testes
- Maior aderência às práticas utilizadas em projetos corporativos

Essa estratégia reflete a forma como equipes de Engenharia de Qualidade estruturam ambientes reais, utilizando diferentes aplicações para validar APIs, interfaces, performance e segurança de maneira independente.