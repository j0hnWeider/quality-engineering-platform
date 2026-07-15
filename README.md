```markdown
# Quality Engineering Platform

Framework de automação de testes para API, interface e segurança, com pipeline CI/CD integrado.

Projeto criado para demonstrar competências em engenharia de qualidade, com foco em **automação robusta**, **rastreabilidade** e **entrega contínua**. O sistema sob teste é a API pública **Serverest**, mas a arquitetura foi pensada para ser adaptável a qualquer aplicação.

---

## Visão geral

- **Testes de API** com validação de contrato e cenários de segurança (acesso não autorizado).
- **Testes de interface** com Page Objects e fluxo de login.
- **Varredura de segurança** passiva com OWASP ZAP, integrada ao pipeline.
- **Pipeline CI/CD** automatizado no GitHub Actions, executado a cada push na branch `main`.
- **Geração de relatórios** HTML do Playwright e ZAP.

---

## Tecnologias utilizadas

- **TypeScript** – tipagem estática e melhor manutenção.
- **Playwright** – orquestrador unificado para testes de API e UI.
- **OWASP ZAP** – scanner de segurança passivo.
- **GitHub Actions** – pipeline de integração contínua.
- **Docker** – execução do ZAP no pipeline.
```
---

## Estrutura do projeto

```
src/
  api/
    client/           # Cliente HTTP reutilizável
    tests/            # Specs de API
  ui/
    pages/            # Page Objects
    tests/            # Specs de UI
  security/           # Scripts ZAP
  utils/              # Funções auxiliares
reports/              # Relatórios gerados
images/               # Prints dos resultados
.github/workflows/    # Pipeline CI/CD
```

---

## Pré-requisitos

- Node.js (v18 ou superior)
- npm ou yarn
- Playwright (`npx playwright install`)
- Docker (para execução do ZAP local ou no pipeline)

---

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

3. Configure as variáveis de ambiente (opcional):

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

7. Execute o scan de segurança (requer Docker):

```bash
npm run test:security
```

O relatório do ZAP será gerado em `reports/zap-report.html`.

---

## Resultados dos testes

### Testes de API

![Testes de API passando](images/api-tests-passing.png)

### Testes de UI

![Testes de UI passando](images/ui-tests-passing.png)

### Pipeline CI/CD no GitHub Actions

![Pipeline verde no GitHub Actions](images/pipeline-passing.png)

---

## Pipeline CI/CD

O pipeline definido em `.github/workflows/ci-quality-gate.yml` executa as seguintes etapas em cada push ou pull request para a branch `main`:

- Instalação de dependências (`npm ci`)
- Instalação dos navegadores do Playwright
- Testes de API
- Testes de UI
- Scan de segurança com ZAP

**O pipeline falha** caso:
- Algum teste funcional (API ou UI) falhe.
- O ZAP identifique vulnerabilidades de nível "Alta".

---

## Decisões técnicas

- **Playwright**: escolhido por oferecer uma API unificada para testes de API e UI, reduzindo a complexidade e o número de ferramentas.
- **TypeScript**: adotado para garantir segurança de tipos, facilitar a refatoração e melhorar a experiência de desenvolvimento.
- **ZAP em modo baseline**: adotado como camada inicial de segurança, sem gerar tráfego ofensivo, analisando apenas respostas para vulnerabilidades conhecidas.
- **Criação dinâmica de usuários**: os testes de API e UI criam contas administradoras automaticamente via API, garantindo autossuficiência e eliminando dependência de credenciais externas.

---

## Próximos passos (roadmap)

- [ ] Testes de contrato com Pact (consumer-driven)
- [ ] Testes de acessibilidade com axe-core
- [ ] Dashboard com métricas históricas
- [ ] Parametrização da URL base para diferentes ambientes (dev, staging, produção)

---

## Autor

**John Weider** – Engenheiro de QA  
Pós-graduado em Engenharia de Software  
Graduação em Defesa Cibernética

[LinkedIn](https://www.linkedin.com/in/john-weider-98bb041b2/)  
E-mail: zeus.programador@gmail.com
```


