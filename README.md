<div align="center">

# 🚀 Quality Engineering Platform

### Enterprise-grade Test Automation Framework

*API • UI • Security • Performance • CI/CD*

<br>

![GitHub Workflow Status](https://img.shields.io/github/actions/workflow/status/j0hnWeider/quality-engineering-platform/ci-quality-gate.yml?label=CI%2FCD&style=for-the-badge)

![GitHub last commit](https://img.shields.io/github/last-commit/j0hnWeider/quality-engineering-platform?style=for-the-badge)

![GitHub repo size](https://img.shields.io/github/repo-size/j0hnWeider/quality-engineering-platform?style=for-the-badge)

![GitHub License](https://img.shields.io/github/license/j0hnWeider/quality-engineering-platform?style=for-the-badge)

<br>

![Playwright](https://img.shields.io/badge/Playwright-45ba63?style=flat-square&logo=playwright&logoColor=white)

![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white)

![GitHub Actions](https://img.shields.io/badge/GitHub_Actions-2088FF?style=flat-square&logo=github-actions&logoColor=white)

![Docker](https://img.shields.io/badge/Docker-2496ED?style=flat-square&logo=docker&logoColor=white)

![OWASP ZAP](https://img.shields.io/badge/OWASP_ZAP-00549E?style=flat-square)

![k6](https://img.shields.io/badge/k6-7D64FF?style=flat-square)

</div>

---

# Table of Contents

- [About](#-about)
- [Project Goals](#-project-goals)
- [Key Features](#-key-features)
- [Architecture](#-architecture)
- [Technology Stack](#-technology-stack)
- [Project Structure](#-project-structure)
- [Quality Matrix](#-quality-matrix)
- [Getting Started](#-getting-started)
- [Running Tests](#-running-tests)
- [Reports](#-reports)
- [CI/CD Pipeline](#-cicd-pipeline)
- [Design Decisions](#-design-decisions)
- [Roadmap](#-roadmap)
- [Author](#-author)

---

# About

The **Quality Engineering Platform** is an enterprise-grade automation framework designed to demonstrate modern Quality Engineering practices.

Instead of focusing only on functional automation, this project validates software quality from multiple perspectives:

- Functional Testing
- API Testing
- UI Testing
- Performance Testing
- Security Testing
- Continuous Integration
- Test Reporting

The project was built following software engineering best practices with emphasis on:

- scalability
- maintainability
- reusable architecture
- continuous delivery
- security by design

Its primary objective is to showcase a complete Quality Engineering ecosystem rather than isolated automated tests.

---

# Project Goals

| Goal | Status |
|-------|:------:|
| API Automation | ✅ |
| UI Automation | ✅ |
| Performance Testing | ✅ |
| Security Testing | ✅ |
| Continuous Integration | ✅ |
| HTML Reports | ✅ |
| Enterprise Architecture | ✅ |
| Reusable Components | ✅ |

---

# Key Features

| Feature | Description |
|----------|-------------|
| REST API Testing | CRUD validation, authentication, authorization and contract verification |
| UI Automation | End-to-end user flows using Playwright |
| Performance Testing | Load testing using k6 |
| Security Testing | Passive vulnerability scanning using OWASP ZAP |
| CI/CD | GitHub Actions Quality Gate |
| Reports | HTML reports generated automatically |
| Page Object Model | Reusable UI components |
| HTTP Client | Reusable API client |
| Type Safety | Fully implemented with TypeScript |

---

# Architecture

This project intentionally uses a **hybrid testing architecture**.

Different systems were selected according to their strengths in order to reduce flaky tests while increasing test reliability.

| Layer | Platform | Purpose |
|--------|----------|---------|
| API | Serverest | CRUD, authentication and security validation |
| UI | SauceDemo | End-to-end purchase flow |
| Performance | SauceDemo | Load and response time evaluation |
| Security | SauceDemo | Passive vulnerability assessment |
| CI/CD | GitHub Actions | Automated Quality Gate |

---

## Why Hybrid Architecture?

Unlike traditional automation projects that rely on a single application for every testing layer, this framework separates responsibilities across different platforms.

### Benefits

- Stable API environment
- Stable UI environment
- Less flaky tests
- Better maintainability
- Better scalability
- Independent evolution of testing layers

This mirrors how enterprise Quality Engineering teams frequently validate different systems using specialized environments.

---