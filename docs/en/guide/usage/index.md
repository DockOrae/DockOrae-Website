---
title: Basic Usage
description: Log in to the panel, get familiar with the interface, first-time configuration (password change / image acceleration / security entry), and common operation entry points.
---

# Basic Usage

This article introduces the interface layout after logging into the panel, first-time configuration, and common operation entry points.

## Log In

Visit `http://<server-ip>:8080` in a browser and log in with the default credentials:

- Username: `admin`
- Password: `123456`

::: danger Change your password immediately after first login
Go to **Panel Settings → Security → Admin Credentials** and change the default password to a strong one. With the default password, anyone can log into your panel.
:::

## Interface Overview

After logging in you land on the **Dashboard** (system status page):

- **Top navigation** — panel name, language switcher, theme switcher, user menu
- **Left navigation** — all feature entry points:
  - **Dashboard** — system status
  - **Containers** — container management
  - **Images** — image management
  - **Networks** — network management
  - **Volumes** — volume management
  - **Compose** — Compose stack management
  - **App Store** — one-click app installation
  - **Panel Settings** — General / Security / Telegram / Email / License / About
- **Footer version number** — shows the current version; a **pink dot indicator** appears when a new version is available; click it to go to [online update](/en/guide/update/panel)

## Dashboard (System Status)

The status page is modeled after 3x-ui and displays in real time:

- **Resource cards** — CPU, memory, swap, storage (with mini sparkline charts)
- **Network and disk** — network throughput and disk I/O curves
- **Count statistics** — number of containers / images / volumes
- **Panel process** — the panel's own resource usage
- **Public IP** — can be toggled shown / hidden

## First-time Configuration Recommendations

After logging in, we recommend completing these in order:

### 1. Change the default password

**Panel Settings → Security → Admin Credentials**, a four-field form: original username, original password, new username, new password (leaving new fields empty = no change). We recommend changing both the username and the password.

### 2. (Strongly recommended) Set a security entry

**Panel Settings → General → Security Entry**, fill in something like `/dm123`.

Once set, the panel can only be accessed via `http://<server-ip>:8080/dm123/`; all other paths automatically redirect to the entry, effectively hiding the panel's real path and reducing scan attacks.

::: warning Remember your security entry
Once a security entry is set, you must access it via `/entry`. If you forget the entry: after restarting the panel, visiting the root path will automatically 302 to the entry address, which is shown in the browser address bar.
:::

### 3. (Optional) Configure image acceleration

**Panel Settings → General → Image Acceleration**, fill in an accelerator address (e.g. `https://docker.1panel.live`). On save, it is automatically written to the host's `daemon.json` and the Docker service is restarted, significantly speeding up image pulls.

::: note How image acceleration works
The panel reads/writes the host's `daemon.json` through the mounted `/etc/docker:/host/etc/docker:ro` (Compose mode), writes the `registry-mirrors` configuration, and restarts Docker for it to take effect.
:::

### 4. (Optional) Bind a domain and HTTPS

Refer to [Domain and HTTPS](/en/guide/configuration/https), using the one-click script:

```bash
sudo bash install.sh ssl
```

### 5. (Optional) Configure notifications

**Panel Settings → Telegram / Email**, after configuring a bot or SMTP, events such as login failures and license status can be pushed to Telegram or email in real time. Periodic reports and database backup attachments are supported.

## Resource Visibility Notes

The panel only shows resources **created or taken over by the panel** (containers with a `createdBy` label, or Compose projects in the panel's data directory):

- Containers created by the panel, apps installed from the App Store, Compose orchestrated by the panel → **shown**
- Resources created manually on the host with `docker run` / `docker compose` → **not shown**

If you already have resources on the host that you want to manage in the panel, paste their compose configuration into the **Compose page** to "take them over".

## Common Operations Quick Reference

| What you want to do              | Where to go                                                                          |
| -------------------------------- | ------------------------------------------------------------------------------------ |
| Create a container               | [Container management → Create container](/en/guide/usage/containers)                |
| Enter a container terminal       | [Container management → Web terminal](/en/guide/usage/containers#container-terminal) |
| Pull an image                    | [Image management → Pull](/en/guide/usage/images)                                    |
| Deploy an app                    | [App Store](/en/guide/usage/appstore)                                                |
| Orchestrate multi-container apps | [Compose management](/en/guide/usage/compose)                                        |
| View Docker events               | Dashboard event stream (real-time push)                                              |
| Disk cleanup                     | Panel Settings → Toolbox → Docker disk cleanup                                       |
| View failed login records        | Panel Settings → Logs                                                                |
