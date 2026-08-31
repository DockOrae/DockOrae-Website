---
title:
  en: Quick Start
  zh-CN: 快速开始
description:
  en: Introduction to DockOrae, installation methods and first launch guide — get your Docker management panel up and running in minutes.
  zh-CN: DockOrae 简介、安装方式与第一次启动指引 — 几分钟内运行起你的 Docker 管理面板。
categories:
  - guide
top: 100000
---

::: en

This page takes you from zero to running: learn what DockOrae is → choose an installation method → complete your first launch.

## What is DockOrae

**DockOrae** is a modern Docker management panel written in **Go** ([gin](https://github.com/gin-gonic/gin) + the official [Moby Docker SDK](https://github.com/moby/moby)), with a frontend built on **Vue 3**. It interacts with the Docker API through the Docker Socket and provides full Docker management capabilities in the browser:

- **Container management** — create / start / stop / restart / pause / delete / inspect, with a built-in **web terminal**
- **Image management** — pull with real-time progress, delete, and clean up unused images
- **Networks & volumes** — create and inspect networks (subnet / gateway) and volumes (local / NFS)
- **Compose stacks** — YAML editor, one-click deployment (streaming output), start / stop / teardown
- **App store** — one-click install and upgrade of 260+ apps (data source aligned with the 1Panel app store)
- **Real-time monitoring** — system status page: real-time charts for CPU / memory / network throughput / disk I/O
- **Security** — TOTP two-factor authentication, security entry, panel listening domain whitelist, Fail2ban login protection
- **Multi-language** — 14 interface languages, auto-detected, switchable with one click

::: warning Scope of use
DockOrae is for personal use only. Do not use it for illegal purposes, or in production environments without proper authorization.
:::

## Installation

DockOrae supports four installation methods, in the recommended order:

| Method                                                 | Best for                               | Notes                                                                                            |
| ------------------------------------------------------ | -------------------------------------- | ------------------------------------------------------------------------------------------------ |
| [One-click install script](/guide/installation/script) | Most Linux users                       | Interactive installation, auto-detects network and architecture, optional Compose / binary modes |
| [Docker Compose](/guide/installation/docker-compose)   | VPS / server deployment                | Image-based, easy to update and roll back                                                        |
| [Docker](/guide/installation/docker)                   | Quick trial                            | Single `docker run` command to start                                                             |
| [Binary](/guide/installation/binary)                   | No Docker environment / advanced users | Runs directly, no Docker required                                                                |

The fastest installation method (one-click script):

```bash
bash <(curl -Ls https://raw.githubusercontent.com/DockOrae/DockOrae/master/install.sh)
```

The script detects the network environment (automatically uses an accelerated mirror in mainland China), installs Docker if missing, and guides you through choosing an installation method.

## First Launch

### 1. Open the Panel

After installation, visit in your browser:

```
http://<server-ip>:8080
```

> The port can be changed via the `DM_PORT` environment variable during installation, or adjusted later in [panel settings](/guide/configuration/panel).

### 2. Log In

Default credentials:

| Username | Password |
| -------- | -------- |
| `admin`  | `123456` |

::: danger Change the default password immediately after first login
Go to **Settings → Security → Admin credentials** to change the password. A default password means anyone can log in to your panel.
:::

### 3. Get to Know the Interface

- **Dashboard** (system status page) — real-time charts for CPU / memory / network throughput / disk I/O, plus counts of containers, images and volumes at a glance
- **Left sidebar navigation** — containers / images / networks / volumes / Compose / app store / panel settings
- **Footer version number** — shows the current version; a pink dot appears when an update is available, click it to [update online](/guide/update/panel)

### 4. (Optional) Basic Configuration

After logging in, complete the following as needed:

- [Change the default password](/guide/configuration/panel#security) — required
- [Set a security entry](/guide/configuration/panel#general) — access the panel via `/entry`, hiding the real path
- [Bind a domain and HTTPS](/guide/configuration/https) — `sudo bash install.sh ssl` issues a certificate in one step
- [Configure an image accelerator](/guide/configuration/panel#registry-mirror) — faster image pulls in mainland China

### 5. Install Your First App

Open the **App Store**, pick an app (such as Nginx or MySQL), choose a version, fill in the parameters and click Install. On first launch the panel automatically syncs the app store data in the background, so no manual steps are needed.

## Next Steps

- [Installation methods in detail](/guide/installation/) — choose the deployment method that suits you best
- [Container management](/guide/usage/containers) — create and manage your first container
- [Compose management](/guide/usage/compose) — orchestrate multi-container apps with YAML
- [Configuration in detail](/guide/configuration/) — environment variables, panel settings, data directory
- [FAQ](/faq) — check here first when you run into problems during installation or usage
  :::

::: zh-CN

本页带你从零开始:了解 DockOrae 是什么 → 选择安装方式 → 完成第一次启动。

## DockOrae 是什么

**DockOrae** 是一款使用 **Go** 语言编写的现代化 Docker 管理面板([gin](https://github.com/gin-gonic/gin) + 官方 [Moby Docker SDK](https://github.com/moby/moby)),前端采用 **Vue 3**。它通过 Docker Socket 与 Docker API 交互,在浏览器中提供完整的 Docker 管理能力:

- **容器管理** — 创建 / 启动 / 停止 / 重启 / 暂停 / 删除 / 检查,内置 **Web 终端**
- **镜像管理** — 实时进度拉取、删除、清理未使用的镜像
- **网络与存储卷** — 网络(子网 / 网关)、存储卷(本地 / NFS)的创建与检查
- **Compose 栈** — YAML 编辑器、一键部署(流式输出)、启动 / 停止 / 拆除
- **应用商店** — 260+ 个应用一键安装与升级(数据源对齐 1Panel 应用商店)
- **实时监控** — 系统状态页:CPU / 内存 / 网络吞吐 / 磁盘 I/O 实时曲线
- **安全** — TOTP 双因素认证、安全入口、面板监听域名白名单、Fail2ban 登录防护
- **多语言** — 14 种界面语言,自动检测,一键切换

::: warning 使用范围
DockOrae 仅限个人使用。请勿将其用于非法用途,或在未经适当授权的情况下用于生产环境。
:::

## 安装

DockOrae 支持四种安装方式,推荐顺序如下:

| 方式                                                 | 适合场景                  | 说明                                                    |
| ---------------------------------------------------- | ------------------------- | ------------------------------------------------------- |
| [一键安装脚本](/guide/installation/script)           | 大多数 Linux 用户         | 交互式安装,自动检测网络与架构,可选 Compose / 二进制方式 |
| [Docker Compose](/guide/installation/docker-compose) | VPS / 服务器部署          | 基于镜像,易于更新与回滚                                 |
| [Docker](/guide/installation/docker)                 | 快速体验                  | 单条 `docker run` 命令启动                              |
| [二进制](/guide/installation/binary)                 | 无 Docker 环境 / 高级用户 | 直接运行,无需 Docker                                    |

最快速的安装方式(一键脚本):

```bash
bash <(curl -Ls https://raw.githubusercontent.com/DockOrae/DockOrae/master/install.sh)
```

脚本会检测网络环境(国内自动使用加速源)、自动安装 Docker(如缺失),并引导你选择安装方式。

## 第一次启动

### 1. 打开面板

安装完成后,浏览器访问:

```
http://<服务器IP>:8080
```

> 端口可在安装时通过 `DM_PORT` 环境变量修改,或在安装后于 [面板设置](/guide/configuration/panel) 中调整。

### 2. 登录

默认账号:

| 用户名  | 密码     |
| ------- | -------- |
| `admin` | `123456` |

::: danger 首次登录请立即修改默认密码
前往 **设置 → 安全 → 管理员凭证** 修改密码。默认密码意味着任何人都可以登录你的面板。
:::

### 3. 认识界面

- **仪表盘**(系统状态页)— CPU / 内存 / 网络吞吐 / 磁盘 I/O 实时曲线,容器、镜像、存储卷数量一览
- **左侧导航** — 容器 / 镜像 / 网络 / 存储卷 / Compose / 应用商店 / 面板设置
- **页脚版本号** — 显示当前版本;有新版本时出现粉色圆点提示,点击即可[在线更新](/guide/update/panel)

### 4. (可选)基础配置

登录后建议按需完成:

- [修改默认密码](/guide/configuration/panel#安全) — 必须
- [设置安全入口](/guide/configuration/panel#常规) — 通过 `/入口` 访问面板,隐藏真实路径
- [绑定域名与 HTTPS](/guide/configuration/https) — `sudo bash install.sh ssl` 一键签发证书
- [配置镜像加速](/guide/configuration/panel#镜像加速) — 国内拉取镜像更快

### 5. 安装第一个应用

打开 **应用商店**,选择一个应用(如 Nginx、MySQL),选择版本、填写参数,点击安装。首次启动时面板已在后台自动同步应用商店数据,无需手动操作。

## 下一步

- [安装方式详解](/guide/installation/) — 选择最适合你的部署方式
- [容器管理](/guide/usage/containers) — 创建并管理你的第一个容器
- [Compose 管理](/guide/usage/compose) — 用 YAML 编排多容器应用
- [配置详解](/guide/configuration/) — 环境变量、面板设置、数据目录
- [常见问题](/faq) — 安装与使用中遇到问题先来这里
  :::
