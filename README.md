```markdown
# Quality Engineering Platform

Framework de automação para testes de API, interface, performance e segurança, integrado a um pipeline CI/CD.

O projeto foi desenvolvido como parte de um portfólio para demonstrar competências em engenharia de qualidade, com ênfase em boas práticas de automação, rastreabilidade e entrega contínua.

O sistema sob teste é a API pública Serverest, mas a arquitetura do framework foi pensada para ser adaptável a diferentes aplicações.

---

## Escopo

- Testes de API com validação de contrato (schema) e cenários de segurança (acesso não autorizado)
- Testes end-to-end de interface com Page Objects
- Testes de performance com k6 e limiares de SLA
- Varredura de segurança passiva com OWASP ZAP
- Pipeline automatizado no GitHub Actions
- Relatórios com Allure (testes funcionais) e HTML (ZAP)

---

## Tecnologias

- TypeScript
- Playwright (API + UI)
- k6
- OWASP ZAP
- GitHub Actions
- Allure
- Docker
```
## Estrutura de diretórios


src/
  api/
    client/           # Cliente HTTP reutilizável
    tests/            # Specs de API
  ui/
    pages/            # Page Objects
    tests/            # Specs de UI
  performance/        # Scripts k6
  security/           # Scripts ZAP
  utils/              # Funções auxiliares
reports/              # Relatórios gerados
.github/workflows/    # Pipeline CI
```
```

## Como executar localmente

1. Clone o repositório:

```bash
git clone https://github.com/j0hnWeider/quality-engineering-platform.git
cd quality-engineering-platform
```

2. Instale as dependências:

```bash
npm install
npx playwright install
```

3. (Opcional) Configure as variáveis de ambiente:

```bash
cp .env.example .env
# edite .env se necessário
```

4. Execute todos os testes (API + UI):

```bash
npm run test:all
```

5. Execute apenas os testes de API:

```bash
npm run test:api
```

6. Execute apenas os testes de UI:

```bash
npm run test:ui
```

7. Execute o teste de performance (requer k6 instalado):

```bash
npm run test:perf
```

8. Execute o scan de segurança (requer Docker):

```bash
npm run test:security
```

O relatório do ZAP será gerado em `reports/zap-report.html`.

---

## Pipeline CI/CD

O pipeline definido em `.github/workflows/ci-quality-gate.yml` executa as seguintes etapas em cada push ou pull request para a branch `main`:

- Instalação de dependências
- Testes de API
- Testes de UI
- Geração do relatório Allure
- Teste de performance com k6
- Scan de segurança com ZAP

O pipeline é interrompido (falha) caso:
- Algum teste funcional falhe
- Os limiares de performance sejam violados (p95 > 500ms ou taxa de erro > 1%)
- O ZAP identifique vulnerabilidades de nível "Alta"

---

## Decisões técnicas

- **Playwright**: escolhido por oferecer uma API unificada para testes de API e UI, reduzindo a complexidade e o número de ferramentas no projeto.
- **TypeScript**: adotado para garantir segurança de tipos e facilitar a manutenção e refatoração.
- **k6**: utilizado por sua leveza, facilidade de integração com pipelines e suporte nativo a execução em containers.
- **ZAP em modo baseline**: adotado como camada inicial de segurança, sem gerar tráfego ofensivo, apenas analisando respostas para vulnerabilidades conhecidas.

---

## Próximos passos

- Testes de contrato com Pact (consumer-driven)
- Testes de acessibilidade com axe-core
- Dashboard com métricas históricas de performance
- Parametrização da URL base para diferentes ambientes (dev, staging, produção)

---

## Autor

**John Weider** – Engenheiro de QA  
Pós-graduado em Engenharia de Software  
Graduação em Defesa Cibernética

LinkedIn: [https://www.linkedin.com/in/john-weider-98bb041b2/](https://www.linkedin.com/in/john-weider-98bb041b2/)  
E-mail: zeus.programador@gmail.com
```
