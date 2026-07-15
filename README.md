# Quality Engineering Platform

Este repositório contém um framework de automação de testes que integra validação de API, testes end-to-end em UI, testes de performance e uma camada de segurança básica.
Foi construído como parte do meu portfólio para demonstrar experiência em engenharia de qualidade, com foco em pipeline CI/CD e boas práticas de desenvolvimento.

O projeto usa uma API pública (Serverest) como sistema sob teste, mas a estrutura é genérica o suficiente para ser adaptada a qualquer aplicação.

---

## O que está incluído

- Testes de API com validação de contrato (schema) e cenários de segurança (ex.: tentativa de acesso sem token).
- Testes de interface com Page Objects e fluxo de login.
- Testes de performance usando k6, com limiares de SLA definidos (tempo de resposta e taxa de falha).
- Varredura passiva de segurança com OWASP ZAP, integrada ao pipeline.
- Pipeline automatizado no GitHub Actions que executa todos os testes a cada push ou pull request na branch main.
- Relatórios gerados com Allure (para testes funcionais) e HTML (para ZAP).

---

## Tecnologias utilizadas

- TypeScript (para tipagem e manutenção)
- Playwright (orquestrador de testes, suporta API e UI)
- k6 (teste de carga)
- OWASP ZAP (scanner de segurança)
- GitHub Actions (CI/CD)
- Allure (relatórios)
- Docker (para execução do ZAP)

---

## Estrutura do projeto

A organização das pastas reflete a separação entre camadas:
src/
api/ # testes e clientes para API
client/ # classe reutilizável para requisições HTTP
tests/ # specs de API
ui/ # testes de interface
pages/ # Page Objects
tests/ # specs de UI
performance/ # scripts de carga (k6)
security/ # scripts para ZAP
utils/ # funções auxiliares (em desenvolvimento)
reports/ # gerado automaticamente com os resultados
.github/workflows/ # pipeline CI

## Como rodar localmente

1. Clone o repositório:
   ```bash
   git clone https://github.com/j0hnWeider/quality-engineering-platform.git
   cd quality-engineering-platform
   
2. Instale as dependências
```bash
   npm install
npx playwright install


