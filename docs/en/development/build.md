---
title: Build & Release
description: DockOrae binary builds, cross-compilation, Docker image builds, and the GitHub Releases publishing process.
---

# Build & Release

## Building the binary

The main repository provides a `Makefile` to manage builds:

```bash
make             # Full build: download frontend dist + compile backend
make web         # Only fetch the frontend dist (DockOrae-Frontend rolling release → public/dist)
make backend     # Only compile the backend (requires make web first)
make cross       # Cross-compile all Linux architectures → dist/*.tar.gz
make clean       # Clean build artifacts
```

The version number is injected automatically from the Git tag (`git describe --tags`) and can be overridden with `VERSION=x.y.z`:

```bash
make cross VERSION=v1.0.5
```

## Cross-compiled artifacts

`make cross` produces the following (each with a `.sha256` checksum file):

```
dist/
├── dockorae-linux-amd64.tar.gz
├── dockorae-linux-arm64.tar.gz
├── dockorae-linux-armv5.tar.gz
├── dockorae-linux-armv6.tar.gz
├── dockorae-linux-armv7.tar.gz
├── dockorae-linux-386.tar.gz
└── dockorae-linux-s390x.tar.gz
```

## Building the Docker image

The image is built automatically by CI (`docker-publish.yml`) and pushed to [Docker Hub](https://hub.docker.com/r/dockorae/dockorae):

- Multi-architecture: `linux/amd64`, `linux/arm64`, `linux/arm/v7`, `linux/arm/v6`, `linux/s390x`
- Tags: `latest` plus the most recent Git tag (e.g. `v1.0.4`)
- The image bundles the `docker-compose` binary (used by online updates in Compose mode)

Local build:

```bash
docker build -t dockorae/dockorae:latest .
```

::: note
Frontend build artifacts are embedded into the binary via `go:embed` — after changing the frontend you must rebuild the backend (or re-fetch the frontend dist) for the changes to take effect.
:::

## Release workflow (GitHub Actions)

### Binary releases

Pushing a `v*` tag automatically triggers `release.yml`:

```bash
git tag v1.0.5
git push origin v1.0.5
```

Workflow: run `make cross VERSION=<tag>`, then upload all `dist/*.tar.gz` + `.sha256` files to the GitHub Release.

### Docker image

Pushing to the `master` branch (source/frontend/Dockerfile changes only) triggers `docker-publish.yml`, which automatically builds the multi-architecture image and pushes it to Docker Hub.

## Version number management

- The version number is determined by the **Git tag** (format `v1.0.4`) — just tag a release without changing any source code
- At build time, `cmd.Version` / `cmd.Commit` / `cmd.BuildTime` are injected via ldflags
- Both the panel's "About" page and online updates read this version number
