---
title: Environment Variables & Startup Arguments
description: All DockOrae environment variables and command-line arguments — defaults, descriptions, and usage examples.
---

# Environment Variables & Startup Arguments

## Command-Line Arguments

When running the binary, command-line arguments can be used (**they take priority over environment variables**):

| Argument | Default                 | Description    |
| -------- | ----------------------- | -------------- |
| `-data`  | `$DATA_DIR` or `./data` | Data directory |
| `-port`  | `$PORT` or `8080`       | Listen port    |

```bash
./dockorae -data /opt/docker-manager/data -port 9090
```

## Environment Variables

### Core Variables

| Variable      | Default                                 | Description                                                            |
| ------------- | --------------------------------------- | ---------------------------------------------------------------------- |
| `DATA_DIR`    | `./data` (binary) / `/data` (container) | Data directory: SQLite database, settings, users, app store data       |
| `PORT`        | `8080`                                  | Panel listen port                                                      |
| `DOCKER_HOST` | `unix:///var/run/docker.sock` (Linux)   | Docker daemon address                                                  |
| `TZ`          | —                                       | Container timezone (set for Compose deployments, e.g. `Asia/Shanghai`) |

```bash
DATA_DIR=/opt/docker-manager/data PORT=8080 docker-manager-go
```

### App Store

| Variable           | Default                  | Description                                                |
| ------------------ | ------------------------ | ---------------------------------------------------------- |
| `DM_APPSTORE_REPO` | `DockOrae/DockOrae-Apps` | App store data repository (override for intranet mirrors)  |
| `DM_APPSTORE_URL`  | —                        | App store data package download URL (offline environments) |

### License

| Variable                | Default                                    | Description                                          |
| ----------------------- | ------------------------------------------ | ---------------------------------------------------- |
| `DM_LICENSE_SERVER_URL` | `https://manager.kejizero.xyz/license-api` | License Server base URL; empty string = offline mode |

### Online Updates

| Variable         | Default             | Description                                                                                                               |
| ---------------- | ------------------- | ------------------------------------------------------------------------------------------------------------------------- |
| `DM_DEPLOY_MODE` | Auto-detected       | Force the deployment mode: `compose` or `binary` (the panel auto-detects: inside a container = compose, otherwise binary) |
| `DM_UPDATE_API`  | GitHub Releases API | Override for the update-check endpoint (for testing)                                                                      |

## One-Click Script Environment Variables

`install.sh` also supports install-time variables (only take effect during installation):

| Variable         | Default                         | Description                                         |
| ---------------- | ------------------------------- | --------------------------------------------------- |
| `DM_PORT`        | `8080`                          | Panel port                                          |
| `DM_INSTALL_DIR` | `/opt/docker-manager`           | Install directory                                   |
| `DM_DATA_DIR`    | `$DM_INSTALL_DIR/data`          | Data directory                                      |
| `DM_IMAGE`       | `zhaoweiwen123/dockorae:latest` | Image for Compose mode                              |
| `DM_MODE`        | Interactive selection           | Install method `compose` / `binary`                 |
| `DM_PRIVILEGED`  | `false`                         | Privileged mode (Compose only)                      |
| `DM_FORCE`       | —                               | `1` = force overwrite reinstall                     |
| `DM_PUBLIC_IP`   | Auto-detected                   | Manually specify the public IP (for SSL validation) |

See [One-Click Install Script](/en/guide/installation/script#environment-variables) for details.

## Priority Rules

```
Command-line arguments > environment variables > config file > defaults
```

- `-data` overrides `DATA_DIR`, which overrides the default `/data`
- `-port` overrides `PORT`, which overrides the default `8080`
- Ports changed in the panel (UI) are stored in the SQLite settings and take priority over environment variables (takes effect after restarting the panel)

::: warning
`webPort` (panel setting) takes effect **after restarting the panel** once changed; the same applies to `webListen` (listen IP) and the secure entry (`webBasePath`). See [Panel Settings](/en/guide/configuration/panel).
:::
