---
title: Quick Start
description: Introduction to DockOrae, installation methods and first launch guide — get your Docker management panel up and running in minutes.
---

# Quick Start

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

| Method                                                    | Best for                               | Notes                                                                                            |
| --------------------------------------------------------- | -------------------------------------- | ------------------------------------------------------------------------------------------------ |
| [One-click install script](/en/guide/installation/script) | Most Linux users                       | Interactive installation, auto-detects network and architecture, optional Compose / binary modes |
| [Docker Compose](/en/guide/installation/docker-compose)   | VPS / server deployment                | Image-based, easy to update and roll back                                                        |
| [Docker](/en/guide/installation/docker)                   | Quick trial                            | Single `docker run` command to start                                                             |
| [Binary](/en/guide/installation/binary)                   | No Docker environment / advanced users | Runs directly, no Docker required                                                                |

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

> The port can be changed via the `DM_PORT` environment variable during installation, or adjusted later in [panel settings](/en/guide/configuration/panel).

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
- **Footer version number** — shows the current version; a pink dot appears when an update is available, click it to [update online](/en/guide/update/panel)

### 4. (Optional) Basic Configuration

After logging in, complete the following as needed:

- [Change the default password](/en/guide/configuration/panel#security) — required
- [Set a security entry](/en/guide/configuration/panel#general) — access the panel via `/entry`, hiding the real path
- [Bind a domain and HTTPS](/en/guide/configuration/https) — `sudo bash install.sh ssl` issues a certificate in one step
- [Configure an image accelerator](/en/guide/configuration/panel#registry-mirror) — faster image pulls in mainland China

### 5. Install Your First App

Open the **App Store**, pick an app (such as Nginx or MySQL), choose a version, fill in the parameters and click Install. On first launch the panel automatically syncs the app store data in the background, so no manual steps are needed.

## Next Steps

- [Installation methods in detail](/en/guide/installation/) — choose the deployment method that suits you best
- [Container management](/en/guide/usage/containers) — create and manage your first container
- [Compose management](/en/guide/usage/compose) — orchestrate multi-container apps with YAML
- [Configuration in detail](/en/guide/configuration/) — environment variables, panel settings, data directory
- [FAQ](/en/faq) — check here first when you run into problems during installation or usage
