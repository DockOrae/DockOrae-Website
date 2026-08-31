---
title: Local Development
description: Setting up a local DockOrae development environment — repository structure, frontend/backend development workflows, environment requirements.
---

# Local Development

## Repository structure

DockOrae uses separate repositories for the frontend and backend:

| Repository                                                                  | Description                                                                         |
| --------------------------------------------------------------------------- | ----------------------------------------------------------------------------------- |
| [DockOrae/DockOrae](https://github.com/DockOrae/DockOrae)                   | Main repository: Go backend (gin + Moby SDK) with embedded frontend build artifacts |
| [DockOrae/DockOrae-Frontend](https://github.com/DockOrae/DockOrae-Frontend) | Frontend repository: Vue 3 + TypeScript                                             |
| [DockOrae/DockOrae-Apps](https://github.com/DockOrae/DockOrae-Apps)         | App store data source                                                               |
| [DockOrae/DockOrae-Website](https://github.com/DockOrae/DockOrae-Website)   | This documentation site                                                             |

### Backend structure

```
main.go                    # Entry point (very thin, only calls cmd.Execute())
cmd/
├── execute.go             # Startup flow: flags → config → state → server
├── server.go              # HTTP/HTTPS server (graceful shutdown)
├── tls.go                 # TLS configuration (SNI whitelist)
├── web.go                 # Frontend static assets (go:embed)
├── version.go             # Build info (injected via ldflags)
└── flags/config.go        # Command-line flags (-data / -port)
internal/
├── api/                   # gin routes and handlers
├── appstore/              # App store
├── auth/                  # JWT / TOTP
├── config/                # Configuration loading
├── db/                    # SQLite (modernc.org/sqlite, no CGO)
├── docker/                # Docker client wrapper
├── settings/              # Panel settings
├── state/                 # In-memory state
└── service/               # Business logic
```

## Environment requirements

- **Go 1.22+** (as specified in `go.mod`)
- **Node.js 20+** (for the frontend)
- Docker running on your machine (or `DOCKER_HOST` pointing to a remote daemon)

## Frontend development workflow

```bash
# 1. Clone the frontend repo into the same directory level as the main repo
git clone https://github.com/DockOrae/DockOrae-Frontend.git ../DockOrae-Frontend

# 2. Start the backend (needs access to Docker)
cd <main-repo-directory>
go run .

# 3. Frontend dev server (vite :5173, API proxied to :8080)
make dev
# Or manually:
cd ../DockOrae-Frontend && npm install && npm run dev
```

Visit `http://localhost:5173` — the frontend hot-reloads and the API is automatically proxied to the backend.

## Backend development

```bash
# Full build (download frontend dist + compile backend)
make

# Only build the backend (requires make web to fetch the frontend artifacts)
make backend

# Run
make run
```

## Quality checks

```bash
# Matches CI: go vet + go test + go test -race
make test
```

Frontend quality checks are defined in the frontend repository's `package.json`:

```bash
npm run typecheck   # vue-tsc type check
npm run lint        # ESLint
npm run i18n-check  # 14-language key consistency check
```

## Developing this documentation site

```bash
npm install
npm run dev          # http://localhost:5173 (docs site)
npm run build        # Production build (includes version fetch and sitemap)
```

## Commit guidelines

- Backend changes must pass `make test` (run by `go-checks.yml` in CI)
- Frontend changes must pass `typecheck` + `lint` + `i18n-check`
- Commit messages are preferred in Chinese, clearly describing the changes
