```yaml
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

---

## Como rodar localmente

1. Clone o repositório:
   ```bash
   git clone https://github.com/j0hnWeider/quality-engineering-platform.git
   cd quality-engineering-platform
Instale as dependências:

bash
npm install
npx playwright install
Configure as variáveis de ambiente (opcional, pois a URL padrão já está definida):

bash
cp .env.example .env
# edite .env se necessário
Execute todos os testes (API + UI):

bash
npm run test:all
Execute apenas os testes de API:

bash
npm run test:api
Execute apenas os testes de UI:

bash
npm run test:ui
Para rodar o teste de performance, instale o k6 (https://k6.io) e depois:

bash
npm run test:perf
Para rodar o scan de segurança, é necessário ter o Docker instalado. Depois:

bash
npm run test:security
O relatório será gerado em reports/zap-report.html.

Pipeline CI/CD
O arquivo .github/workflows/ci-quality-gate.yml define o pipeline. Ele executa:

Instalação das dependências

Testes de API

Testes de UI

Geração do relatório Allure

Teste de performance com k6

Scan de segurança com ZAP

Se qualquer etapa falhar (incluindo violação dos limiares de performance ou descoberta de vulnerabilidade classificada como "Alta" pelo ZAP), o pipeline falha, bloqueando o merge.

Observações sobre decisões técnicas
Optei pelo Playwright por ele oferecer uma API unificada para testes de API e UI, reduzindo a complexidade de manutenção e a quantidade de ferramentas no projeto. O uso de TypeScript traz segurança de tipos e facilita a refatoração.

Os testes de performance foram configurados com estágios de carga progressiva para simular um cenário realista e os limiares (thresholds) refletem critérios de aceite não funcionais.

A camada de segurança foi adicionada como um passo extra no pipeline, não como substituta de uma avaliação aprofundada, mas como um filtro inicial para evitar que vulnerabilidades óbvias cheguem à produção.

Próximos passos (se eu continuar o projeto)
Adicionar testes de contrato com Pact (consumer-driven)

Incluir testes de acessibilidade (axe-core)

Criar um dashboard com métricas históricas de performance

Parametrizar a URL base para ambientes diferentes (dev, staging, prod)

Autor
John Weider – Engenheiro de QA | Pós-graduado em Engenharia de Software | Graduação em Defesa Cibernética.

LinkedIn: https://www.linkedin.com/in/john-weider-98bb041b2/
E-mail: zeus.programador@gmail.com
