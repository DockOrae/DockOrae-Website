---
title: Configuration Overview
description: DockOrae configuration system — the priority relationships among the config file, environment variables, command-line arguments, and panel settings.
---

# Configuration Overview

DockOrae's configuration system consists of four layers, in descending order of priority:

```
Command-line arguments (-data / -port)
        │ higher than
Environment variables (DATA_DIR / PORT / ...)
        │ higher than
Config file (inside the data directory)
        │ higher than
Built-in defaults
```

## Configuration Storage Location

All panel configuration and data are stored in the **data directory** (`/data` inside the container by default, configurable via `DATA_DIR`):

| File                | Purpose                                                                                               |
| ------------------- | ----------------------------------------------------------------------------------------------------- |
| `docker-manager.db` | **SQLite database** — stores users, panel settings, and event records (current primary storage)       |
| `settings.json`     | Legacy settings file (automatically migrated into SQLite on first startup; no longer used afterwards) |
| `config.json`       | JWT secret (`jwt_secret`, auto-generated, permissions 0600)                                           |
| `license.json`      | License activation token (permissions 0600)                                                           |
| `cert/`             | HTTPS certificate directory                                                                           |

::: tip The correct way to modify panel settings
Panel settings (in SQLite) can only be changed via the **panel UI (Settings → General / Security / …)** or the **API (`PUT /api/system/settings`)**. Editing `settings.json` directly has no effect — it is only a migration source from older versions.
:::

## Quick Reference: Common Configuration Entries

| What you want to configure                                       | Entry                                                                            |
| ---------------------------------------------------------------- | -------------------------------------------------------------------------------- |
| Port / data directory                                            | [Environment Variables & Startup Arguments](/en/guide/configuration/environment) |
| Secure entry / domain whitelist / password policy / certificates | [Panel Settings](/en/guide/configuration/panel)                                  |
| Data persistence / Docker Socket                                 | [Data Directory & Persistence](/en/guide/configuration/storage)                  |
| HTTPS domain binding                                             | [Domain & HTTPS](/en/guide/configuration/https)                                  |

## Default Values at a Glance

| Item             | Default                                 | Description                                                                             |
| ---------------- | --------------------------------------- | --------------------------------------------------------------------------------------- |
| Listen port      | `8080`                                  | Modifiable via the `PORT` environment variable, the `-port` argument, or panel settings |
| Data directory   | `/data` (container) / `./data` (binary) | Change via `DATA_DIR` / `-data`                                                         |
| Docker address   | `unix:///var/run/docker.sock`           | Change via `DOCKER_HOST`                                                                |
| Default account  | `admin / 123456`                        | Should be changed after the first login                                                 |
| Secure entry     | `/` (not enabled)                       | Once set, the panel can only be accessed via `/entry`                                   |
| Session duration | 7 days                                  | Modifiable in panel settings                                                            |
| Timezone         | `Asia/Shanghai`                         | Panel settings → Date and Time                                                          |
