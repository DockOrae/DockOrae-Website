---
title: Compose Management
description: Manage Docker Compose stacks from the panel — YAML editor, one-click deployment, start/stop/down, and adopting external Compose projects.
---

# Compose Management

Go to the **Compose** page to manage Docker Compose projects (stacks) directly in the panel.

## Compose Project List

Displays the project name, status (running / stopped), number of services, and the project directory. The panel only shows Compose projects **created or adopted by the panel** (project directories live under the panel's data directory).

## Creating a Compose Stack

Click **Create**, fill in the project name, paste the `docker-compose.yml` content (YAML editor with syntax highlighting), then click **Deploy**:

- **One-click deployment** — runs `compose up` directly, with the panel **streaming** deployment logs in real time
- If deployment fails, the logs clearly show the cause of the error (e.g. port conflict, image not found)

Example:

```yaml
services:
  nginx:
    image: nginx:latest
    container_name: nginx-test
    restart: unless-stopped
    ports:
      - '8081:80'
```

## Stack Operations

| Action       | Description                                                                         |
| ------------ | ----------------------------------------------------------------------------------- |
| Start        | `compose start`                                                                     |
| Stop         | `compose stop` (containers stop, the project is kept)                               |
| Delete       | `compose down` (removes containers and networks, the project configuration is kept) |
| View details | Service status, container list, and logs                                            |

## Adopting External Compose

If you already have a project deployed with `docker compose` on the host and want to manage it in the panel:

1. Click **Create** on the **Compose page**
2. Paste the content of the project's `docker-compose.yml`
3. Deploy with the same project name

The panel will **adopt** the project (marked as panel-managed), after which you can start, stop, and update it from the panel.

::: note
This is the only way to bring existing host resources under panel management — the panel does not automatically discover Compose projects deployed manually on the host.
:::

## FAQ

**Deployment fails with "port is already allocated"?** The port is occupied by another container. Change the port mapping, or stop the container that occupies the port first.

**Compose project out of sync with host files?** The panel treats the project configuration in its data directory as authoritative; manual changes on the host are not reflected in the panel (and vice versa). Keep management on one side only.
