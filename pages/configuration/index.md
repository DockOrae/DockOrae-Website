---
title:
  en: Configuration Overview
  zh-CN: 配置概览
description:
  en: DockOrae configuration system — the priority relationships among the config file, environment variables, command-line arguments, and panel settings.
  zh-CN: DockOrae 配置体系 — 配置文件、环境变量、命令行参数与面板设置的优先级关系。
categories:
  - configuration
top: 85000
---

::: en

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

| What you want to configure                                       | Entry                                                                         |
| ---------------------------------------------------------------- | ----------------------------------------------------------------------------- |
| Port / data directory                                            | [Environment Variables & Startup Arguments](/guide/configuration/environment) |
| Secure entry / domain whitelist / password policy / certificates | [Panel Settings](/guide/configuration/panel)                                  |
| Data persistence / Docker Socket                                 | [Data Directory & Persistence](/guide/configuration/storage)                  |
| HTTPS domain binding                                             | [Domain & HTTPS](/guide/configuration/https)                                  |

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

:::

::: zh-CN

DockOrae 的配置体系由四层组成,优先级从高到低:

```
命令行参数(-data / -port)
        │ 高于
环境变量(DATA_DIR / PORT / ...)
        │ 高于
配置文件(数据目录内)
        │ 高于
内置默认值
```

## 配置存储位置

面板的所有配置与数据都保存在**数据目录**(默认容器内 `/data`,可通过 `DATA_DIR` 修改):

| 文件                | 作用                                                           |
| ------------------- | -------------------------------------------------------------- |
| `docker-manager.db` | **SQLite 数据库** — 用户、面板设置、事件记录的存储(当前主存储) |
| `settings.json`     | 旧版设置文件(首次启动时自动迁移进 SQLite,之后不再使用)         |
| `config.json`       | JWT 密钥(`jwt_secret`,自动生成,权限 0600)                      |
| `license.json`      | 许可证激活令牌(权限 0600)                                      |
| `cert/`             | HTTPS 证书目录                                                 |

::: tip 修改面板设置的正确方式
面板设置(SQLite 中)只能通过 **面板 UI(设置 → 常规 / 安全 / …)** 或 **API(`PUT /api/system/settings`)** 修改。直接编辑 `settings.json` 无效 —— 它只是旧版迁移源。
:::

## 常用配置入口速查

| 想配置什么                              | 入口                                                   |
| --------------------------------------- | ------------------------------------------------------ |
| 端口 / 数据目录                         | [环境变量与启动参数](/guide/configuration/environment) |
| 安全入口 / 域名白名单 / 密码策略 / 证书 | [面板设置](/guide/configuration/panel)                 |
| 数据持久化 / Docker Socket              | [数据目录与持久化](/guide/configuration/storage)       |
| HTTPS 域名绑定                          | [域名与 HTTPS](/guide/configuration/https)             |

## 默认值一览

| 配置项      | 默认值                          | 说明                                               |
| ----------- | ------------------------------- | -------------------------------------------------- |
| 监听端口    | `8080`                          | 可通过 `PORT` 环境变量、`-port` 参数或面板设置修改 |
| 数据目录    | `/data`(容器)/ `./data`(二进制) | 通过 `DATA_DIR` / `-data` 修改                     |
| Docker 地址 | `unix:///var/run/docker.sock`   | 通过 `DOCKER_HOST` 修改                            |
| 默认账号    | `admin / 123456`                | 首次登录后应修改                                   |
| 安全入口    | `/`(未启用)                     | 设置后仅可通过 `/入口` 访问                        |
| 会话时长    | 7 天                            | 面板设置中可修改                                   |
| 时区        | `Asia/Shanghai`                 | 面板设置 → 日期和时间                              |

:::
