<div align="center">

# 🚀 QA Forge

### Laboratório de Engenharia de Qualidade

**API • Interface • Performance • Segurança • CI/CD**

> *Um laboratório prático onde técnicas, ferramentas e estratégias de Engenharia de Qualidade são continuamente estudadas, aplicadas e aperfeiçoadas.*

<br>

<p align="center">

<img src="https://img.shields.io/github/actions/workflow/status/j0hnWeider/qa-forge/ci-quality-gate.yml?label=CI%2FCD&style=for-the-badge"/>

<img src="https://img.shields.io/github/last-commit/j0hnWeider/qa-forge?style=for-the-badge"/>

<img src="https://img.shields.io/github/repo-size/j0hnWeider/qa-forge?style=for-the-badge"/>

<img src="https://img.shields.io/github/license/j0hnWeider/qa-forge?style=for-the-badge"/>

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

# Sobre o Projeto

O **QA Forge** é um laboratório prático de **Engenharia de Qualidade**, criado para estudar, validar e evoluir técnicas modernas de testes de software em cenários próximos aos encontrados em ambientes corporativos.

Mais do que um repositório de automação, este projeto funciona como um ambiente contínuo de experimentação, onde novas ferramentas, arquiteturas, metodologias e estratégias de testes são implementadas, avaliadas e refinadas.

Cada funcionalidade adicionada representa uma oportunidade de explorar desafios reais da Engenharia de Qualidade, sempre buscando soluções escaláveis, reutilizáveis e alinhadas às boas práticas da indústria.

---

## Objetivos

O QA Forge foi desenvolvido com quatro objetivos principais:

- Consolidar conhecimentos em Engenharia de Qualidade por meio da prática contínua.
- Experimentar ferramentas e tecnologias utilizadas por equipes de QA modernas.
- Simular cenários reais encontrados em aplicações corporativas.
- Construir uma base técnica sólida e pública que evidencie minha evolução profissional.

---

## Filosofia do Projeto

Este projeto é tratado como um laboratório permanente.

Novos cenários são incorporados continuamente à medida que novas tecnologias são estudadas ou desafios interessantes surgem durante minha jornada profissional.

Entre os principais temas explorados estão:

- Automação de Testes de API
- Automação de Interface (UI)
- Testes de Performance
- Testes de Segurança
- Arquiteturas de Testes
- Integração Contínua (CI/CD)
- Estratégias de Teste
- Qualidade de Código
- Observabilidade
- Engenharia de Software aplicada à Qualidade

O objetivo não é apenas automatizar testes, mas compreender profundamente como construir soluções de qualidade que sejam sustentáveis, escaláveis e confiáveis.

---

## Formação aplicada ao projeto

Grande parte das decisões técnicas adotadas neste laboratório é fundamentada nos conhecimentos adquiridos durante minha formação acadêmica e continuamente aprimorada por meio de estudos e experimentação.

| Formação | Aplicação no projeto |
|----------|----------------------|
| 🎓 Graduação em Defesa Cibernética | Testes de segurança, análise de vulnerabilidades, autenticação, autorização, validação de cabeçalhos HTTP e aplicação de princípios de Security by Design. |
| 🎓 Pós-graduação em Engenharia de Software | Arquitetura do projeto, modularização, boas práticas de desenvolvimento, reutilização de componentes, tipagem com TypeScript, qualidade de código e integração contínua. |

Essa combinação permite que o projeto evolua considerando não apenas aspectos funcionais da automação, mas também requisitos não funcionais essenciais, como segurança, desempenho, escalabilidade e manutenibilidade.

---

## Sobre este repositório

Embora o QA Forge seja um ambiente de estudos, ele também representa minha forma de demonstrar, de maneira prática, como aplico conceitos de Engenharia de Software e Engenharia de Qualidade na resolução de problemas reais.

Ao invés de apresentar apenas certificados ou conhecimento teórico, este repositório documenta minha evolução técnica por meio de implementações, experimentos, decisões arquiteturais e práticas adotadas ao longo do desenvolvimento do projeto.

Cada commit representa uma etapa da minha evolução como Engenheiro de Qualidade.

# Estratégia de Testes

O **QA Forge** foi projetado para validar a qualidade de software sob diferentes perspectivas, combinando testes funcionais e não funcionais em uma arquitetura modular e escalável.

Ao invés de concentrar todos os esforços em testes End-to-End, o projeto distribui as validações em diferentes camadas, permitindo identificar defeitos mais rapidamente, reduzir testes instáveis (*Flaky Tests*) e facilitar a manutenção da suíte.

As estratégias adotadas refletem práticas utilizadas em equipes modernas de **Quality Engineering**, buscando equilibrar cobertura, velocidade de execução e confiabilidade dos resultados.

---

# Matriz de Qualidade

| Categoria | Objetivo | Ferramenta | Status |
|-----------|----------|------------|:------:|
| 🌐 API Testing | CRUD, autenticação, autorização e contratos | Playwright | ✅ |
| 🖥 UI Testing | Fluxos End-to-End | Playwright | ✅ |
| 🔒 Security Testing | SQL Injection, XSS, Path Traversal e Headers | Playwright | ✅ |
| ⚡ Performance Testing | Carga e tempo de resposta | k6 | ✅ |
| 🛡 Vulnerability Scan | Scanner passivo | OWASP ZAP | ✅ |
| 📊 Test Reports | Relatórios HTML | Playwright Report | ✅ |
| 📈 Dashboards | Relatórios avançados | Allure Report | ✅ |
| 🔄 Continuous Integration | Pipeline automatizado | GitHub Actions | ✅ |
| 🧬 Mutation Testing | Qualidade da suíte de testes | Stryker | ✅ |
| 📏 Code Coverage | Cobertura de código | NYC | ✅ |
| 🧹 Code Quality | Padronização do código | ESLint + Prettier | ✅ |

---

# Arquitetura do Projeto

O QA Forge adota uma arquitetura baseada na separação de responsabilidades, permitindo que cada módulo evolua de forma independente.

```text
QA Forge
│
├── API Testing
│   ├── Cliente HTTP
│   ├── Fixtures
│   ├── Testes Funcionais
│   └── Testes de Segurança
│
├── UI Testing
│   ├── Page Objects
│   ├── Fluxos E2E
│   └── Componentes
│
├── Performance
│   └── k6
│
├── Security
│   └── OWASP ZAP
│
├── Reports
│   ├── Playwright
│   └── Allure
│
└── GitHub Actions
```

Essa organização favorece reutilização de código, baixo acoplamento e facilidade de manutenção.

---

# Stack Tecnológica

| Categoria | Tecnologia | Finalidade |
|-----------|------------|------------|
| Linguagem | TypeScript | Segurança de tipos e manutenção |
| Framework de Testes | Playwright | Automação de API e Interface |
| Performance | k6 | Testes de carga |
| Segurança | OWASP ZAP | Scanner passivo de vulnerabilidades |
| Mutation Testing | Stryker | Avaliação da qualidade dos testes |
| Cobertura | NYC | Medição de cobertura de código |
| Relatórios | Playwright Report | Evidências HTML |
| Dashboards | Allure Report | Visualização consolidada dos testes |
| Containers | Docker | Execução do ZAP |
| CI/CD | GitHub Actions | Pipeline automatizado |
| Qualidade de Código | ESLint | Análise estática |
| Formatação | Prettier | Padronização do código |
| Versionamento | Git | Controle de versões |

---

#  Arquitetura Híbrida

O projeto utiliza ambientes distintos para cada tipo de validação.

Essa abordagem reduz a dependência de uma única aplicação e aproxima o laboratório de cenários encontrados em projetos corporativos.

| Camada | Plataforma | Justificativa |
|---------|------------|---------------|
|  API | Serverest | Ambiente estável para CRUD, autenticação e contratos |
|  Interface | SauceDemo | Fluxos previsíveis para testes End-to-End |
|  Performance | SauceDemo | Avaliação de desempenho da interface |
|  Segurança | SauceDemo | Scanner passivo utilizando OWASP ZAP |

Essa estratégia proporciona:

- Menor incidência de Flaky Tests
- Maior previsibilidade
- Independência entre as camadas
- Melhor escalabilidade da suíte

---

# Estrutura do Projeto

```text
qa-forge
│
├── .github/
│   └── workflows/
│       └── ci-quality-gate.yml
│
├── allure-results/
│
├── imagens/
│
├── playwright-report/
│
├── reports/
│
├── src/
│   │
│   ├── api/
│   │   ├── client/
│   │   │   └── ApiClient.ts
│   │   │
│   │   ├── fixtures/
│   │   │
│   │   └── tests/
│   │       ├── products-crud.spec.ts
│   │       ├── products.spec.ts
│   │       ├── security-auth.spec.ts
│   │       ├── security-headers.spec.ts
│   │       └── security-injection.spec.ts
│   │
│   ├── ui/
│   │   ├── pages/
│   │   │   ├── LoginPage.ts
│   │   │   ├── InventoryPage.ts
│   │   │   ├── CartPage.ts
│   │   │   ├── CheckoutPage.ts
│   │   │   ├── cart-flow.spec.ts
│   │   │   └── checkout-flow-complete.spec.ts
│   │   │
│   │   └── tests/
│   │       └── checkout-flow.spec.ts
│   │
│   ├── performance/
│   │   └── stress-test.js
│   │
│   ├── security/
│   │   └── zap-baseline-scan.sh
│   │
│   └── utils/
│
├── test-results/
│
├── .env.example
├── playwright.config.ts
├── package.json
└── README.md
```

---

# Organização dos Diretórios

| Diretório | Responsabilidade |
|-----------|------------------|
| `.github/workflows` | Pipeline de Integração Contínua |
| `src/api/client` | Cliente HTTP reutilizável |
| `src/api/fixtures` | Massa de dados reutilizável |
| `src/api/tests` | Testes de API e Segurança |
| `src/ui/pages` | Implementação do Page Object Model |
| `src/ui/tests` | Testes End-to-End |
| `src/performance` | Scripts de Performance com k6 |
| `src/security` | Scanner OWASP ZAP |
| `reports` | Relatórios personalizados |
| `playwright-report` | Relatório HTML do Playwright |
| `allure-results` | Resultados utilizados pelo Allure |
| `test-results` | Evidências da execução |
| `imagens` | Capturas utilizadas no README |

---

# Princípios Arquiteturais

O QA Forge segue princípios de Engenharia de Software para tornar a suíte de testes mais organizada, reutilizável e escalável.

| Princípio | Aplicação |
|-----------|-----------|
| Separação de Responsabilidades | Cada módulo possui uma responsabilidade específica |
| Arquitetura Modular | API, UI, Segurança e Performance desacoplados |
| Reutilização | Cliente HTTP, Fixtures e Page Objects compartilhados |
| Escalabilidade | Novos cenários podem ser adicionados sem alterar a arquitetura |
| Baixo Acoplamento | Componentes independentes |
| Tipagem Forte | TypeScript em toda a aplicação |
| Qualidade de Código | ESLint + Prettier |
| Cobertura | Monitoramento através do NYC |
| Mutation Testing | Avaliação da eficácia da suíte utilizando Stryker |
| Segurança | Aplicação de conceitos de Security by Design |
| Integração Contínua | Execução automática via GitHub Actions |

---

# Diferenciais do Projeto

Embora o QA Forge seja um laboratório de estudos, sua arquitetura foi concebida para refletir práticas utilizadas em projetos reais de Engenharia de Qualidade.

Entre seus principais diferenciais estão:

- Arquitetura modular e escalável.
- Testes distribuídos entre API, Interface, Performance e Segurança.
- Cliente HTTP reutilizável.
- Utilização do padrão **Page Object Model (POM)**.
- Execução automatizada em pipeline CI/CD.
- Relatórios HTML e dashboards com Allure.
- Mutation Testing para avaliar a qualidade da suíte.
- Monitoramento de cobertura de código.
- Padronização automática do código utilizando ESLint e Prettier.
- Evolução contínua com foco em experimentação e aprendizado.