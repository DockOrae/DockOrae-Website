---
title: Contributing Guide
description: Contributing to DockOrae development — reporting issues, contributing code, improving documentation, and translating.
---

# Contributing Guide

Thank you for wanting to contribute to DockOrae! Any form of help — reporting issues, improving documentation, submitting code — is very welcome.

## Reporting issues

When opening an issue on [GitHub Issues](https://github.com/DockOrae/DockOrae/issues), please include:

- **Panel version** (the version number in the footer) and the deployment method (Compose / binary / docker run)
- **Steps to reproduce** — how to trigger the problem
- **Expected behavior** vs **actual behavior**
- **Logs** — panel logs (`docker compose logs --tail 50` or `journalctl -u docker-manager -n 50`)
- Environment info (OS, Docker version, architecture)

## Submitting code

### 1. Fork and clone

```bash
git clone https://github.com/<your-username>/DockOrae.git
cd DockOrae
git remote add upstream https://github.com/DockOrae/DockOrae.git
```

### 2. Create a branch

```bash
git checkout -b feat/your-change
```

### 3. Develop and self-test

- Backend: `make test` (go vet + go test + race, matching CI)
- Frontend (in the DockOrae-Frontend repository): `npm run typecheck && npm run lint && npm run i18n-check`
- For UI changes, run it locally to confirm the result before committing

### 4. Commit and push

```bash
git add .
git commit -m "feat: describe your change"
git push origin feat/your-change
```

### 5. Open a pull request

- Give the PR a clear, descriptive title; attach screenshots for UI changes
- Keep changes focused: one PR solves one problem
- CI must pass (go-checks / docker-publish)

## Code standards

- **Go**: follow the standard formatting (`gofmt`); `make test` must pass
- **Frontend**: TypeScript strict mode, no `any` allowed; ESLint / Prettier must pass; all 14 locale keys kept in sync (`npm run i18n-check`)
- **Commit messages**: in Chinese, starting with a verb (`feat:` / `fix:` / `docs:` / `refactor:`)

## Improving the documentation

Contributions to this documentation site (DockOrae-Website) are equally welcome:

- Every page has an **"Edit this page on GitHub"** link in the top-right corner — click it to edit directly
- The docs are available in Simplified Chinese (root path) and English (`/en/`); the two languages must stay in sync
- For documentation-only changes, pushing to the `main` branch automatically deploys to GitHub Pages

## Translations

- Translations for the panel UI (14 languages) live in the frontend repository's `src/locales/`; keys must be consistent across all languages
- Documentation translations: maintain the English version under `docs/en/`

## Code of conduct

- Communicate in a friendly, respectful manner
- Don't submit meaningless changes (e.g. reformatting entire files)
- Issues and PRs may be written in Chinese or English
