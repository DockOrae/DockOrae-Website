---
title: Docker Compose Installation
description: Deploy DockOrae with Docker Compose — full compose configuration, line-by-line explanation of common commands, and data persistence notes.
---

# Docker Compose Installation

Docker Compose is the **preferred way to deploy on servers**: image-based, centralized configuration, and easy updates and rollbacks.

## Prerequisites

- **Docker Engine** and the **Compose plugin** installed (`docker compose version` can verify)
- Works on all Linux distributions that can run Docker

## Option 1: Use the Config Bundled with the Repository (Recommended)

The DockOrae repository ships a complete `docker-compose.yml` — download and use it directly:

```bash
mkdir -p /opt/docker-manager && cd /opt/docker-manager
curl -fsSL https://raw.githubusercontent.com/DockOrae/DockOrae/master/docker-compose.yml -o docker-compose.yml
```

## Option 2: Create It Manually

Create `docker-compose.yml` (full configuration, adjust as needed):

```yaml
services:
  dockorae:
    image: dockorae/dockorae:latest
    container_name: dockorae
    restart: unless-stopped

    # ---- Port mapping ----
    # Default HTTP access: http://<server-ip>:8080
    ports:
      - '8080:8080'
      # After binding an HTTPS domain (Panel → Settings → General → Certificate):
      #   Comment out the 8080 line above and enable the line below to access https://domain directly (no port number needed)
      # - "443:8080"
      # Local access only (not exposed externally; use when the panel itself sits behind a reverse proxy):
      # - "127.0.0.1:8080:8080"

    # ---- Environment variables ----
    environment:
      - DATA_DIR=/data # Panel data directory (SQLite database, settings, users, app store data)
      - PORT=8080 # Panel listening port
      - TZ=Asia/Shanghai # Container timezone
      # Remote Docker host: the panel operates a remote daemon directly (also comment out the docker.sock mount)
      # - DOCKER_HOST=tcp://<host>:2375
      # App store data repository/download URL override (intranet mirror, offline environment):
      # - DM_APPSTORE_REPO=DockOrae/DockOrae-Apps
      # - DM_APPSTORE_URL=https://<intranet-mirror>/docker-manager-apps.tar.gz

    # ---- Data volumes ----
    volumes:
      # Docker daemon socket: the entry point for the panel to manage the local Docker, must be mounted
      - /var/run/docker.sock:/var/run/docker.sock
      # Panel data (database, settings, users, app store data)
      - ./data:/data
      # HTTPS certificate directory (put fullchain.pem / privkey.pem here after binding a domain)
      - ./cert:/data/cert:ro
      # Host root filesystem (read-only): online updates use it to locate the host docker-compose.yml, image acceleration reads/writes the host daemon.json
      - /:/host:ro
      # Host Docker configuration: the panel's "Image Acceleration" reads/writes this file (daemon.json)
      - /etc/docker:/host/etc/docker:ro
```

> Other optional settings (privileged mode, resource limits, health checks, custom networks, etc.) are documented in the comments of the repository's `docker-compose.yml`.

## Start

```bash
docker compose up -d
```

- `up` — Create and start the service
- `-d` — Run in the background

The image is pulled automatically on first start. After starting, visit `http://<server-ip>:8080`; the default credentials are `admin / 123456`.

## Check Status

```bash
docker compose ps
```

## View Logs

```bash
docker compose logs -f
```

- `logs` — Output container logs
- `-f` — Follow continuously (press `Ctrl+C` to exit)

## Stop / Start / Restart

```bash
# Stop (containers stop, data is preserved)
docker compose stop

# Start again
docker compose start

# Restart
docker compose restart

# Stop and remove containers (the ./data data directory is preserved)
docker compose down
```

::: tip `stop` vs `down`

- `docker compose stop` — only stops containers, keeps containers and networks; `start` can resume
- `docker compose down` — removes containers and networks, **does not delete** the `./data` data directory
  :::

## Update

```bash
# Pull the latest image and rebuild the containers
docker compose pull
docker compose up -d
```

- `pull` — Pull the new image version
- `up -d` — Automatically rebuild containers when an image change is detected

Or with a single command:

```bash
docker compose up -d --pull always
```

::: tip
The panel has built-in [online update](/en/guide/update/panel) — complete it with one click in the panel, no need to log into the server.
:::

## Data Persistence

```
Host                              Container
┌──────────────────┐        ┌──────────────┐
│ /opt/docker-     │ ────▶ │ /data        │
│ manager/data     │  bind  │ (all panel   │
│ (./data)         │  mount │  data)       │
└──────────────────┘        └──────────────┘
```

- Data is stored on the host in `./data` (the directory where you run `docker compose`) via a **bind mount**
- **Removing the containers (`down`) does not delete the data** — data always stays in the host directory

```bash
# Backing up data = packing the ./data directory
tar -czf dm-backup.tar.gz -C /opt/docker-manager/data .

# Permanently deleting data (be careful!)
rm -rf /opt/docker-manager/data
```

For more backup methods, see [Backup and Restore](/en/guide/backup).

## FAQ

**Compose fails to start?** Check the logs to find the cause:

```bash
docker compose logs --tail 50
```

**Remote Docker host?** Set `DOCKER_HOST=tcp://<host>:2375` in `environment` and comment out the docker.sock mount.

## Uninstall

```bash
docker compose down          # Stop and remove containers
rm -rf /opt/docker-manager   # Delete the compose file and data directory (be careful!)
```

See the [uninstall documentation](/en/guide/uninstall/docker).
