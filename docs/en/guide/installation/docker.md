---
title: Docker Installation
description: Install DockOrae with a single docker run command — port, data volume, Docker Socket notes and container management commands.
---

# Docker Installation

Start DockOrae quickly with the Docker CLI. This is the simplest installation method, ideal for a quick trial.

## Prerequisites

- **Docker Engine** (Linux) or **Docker Desktop** (Windows / macOS) installed
- Docker version 20.10 or later is recommended

::: note
The panel container itself runs on Docker, while the Docker environment it manages is determined by the mounted Docker Socket — whichever daemon's socket you mount is the daemon it manages. By default the host's `/var/run/docker.sock` is mounted, so it manages the local Docker daemon.
:::

## Start the Container

```bash
docker run -d --name docker-manager-go \
  -p 8080:8080 \
  -v /var/run/docker.sock:/var/run/docker.sock \
  -v docker-manager-data:/data \
  dockorae/dockorae:latest
```

| Parameter                      | Description                                                                                      |
| ------------------------------ | ------------------------------------------------------------------------------------------------ |
| `-d`                           | Run in the background                                                                            |
| `--name docker-manager-go`     | Container name, used by subsequent management commands                                           |
| `-p 8080:8080`                 | Port mapping: host 8080 → container 8080                                                         |
| `-v /var/run/docker.sock:...`  | **Required**. Mounts the Docker Socket; the panel communicates with the Docker daemon through it |
| `-v docker-manager-data:/data` | **Data volume**. Persists the panel's data (SQLite database, settings, users, app store data)    |
| `dockorae/dockorae:latest`     | Official image (multi-architecture image on Docker Hub)                                          |

After starting, visit in your browser:

```
http://<server-ip>:8080
```

The default credentials are `admin / 123456` — please [change the password](/en/guide/configuration/panel) immediately after logging in.

## View Container Status

```bash
docker ps
```

The panel container is named `docker-manager-go` and its status should be `Up`.

## View Logs

```bash
docker logs docker-manager-go
```

To follow the logs continuously:

```bash
docker logs -f docker-manager-go
```

## Stop / Start / Restart

```bash
# Stop
docker stop docker-manager-go

# Start again
docker start docker-manager-go

# Restart
docker restart docker-manager-go
```

## Update

```bash
# 1. Pull the latest image
docker pull dockorae/dockorae:latest

# 2. Stop and remove the old container (data lives in the volume and is unaffected)
docker stop docker-manager-go
docker rm docker-manager-go

# 3. Recreate with the same parameters
docker run -d --name docker-manager-go \
  -p 8080:8080 \
  -v /var/run/docker.sock:/var/run/docker.sock \
  -v docker-manager-data:/data \
  dockorae/dockorae:latest
```

::: tip An easier way to update
The panel has a built-in [online update](/en/guide/update/panel) — just click it in **Settings → Update** to finish, no need to run the commands above manually.
:::

## Data Persistence

```
Host (local machine)    Container
┌────────────────┐       ┌──────────────────┐
│ Docker Volume  │ ────▶ │ /data            │
│ docker-manager-│       │ ├─ docker-manager│
│ data           │       │ │  .db(SQLite)  │
└────────────────┘       │ ├─ config.json   │
                         │ ├─ license.json  │
                         │ └─ ...           │
                         └──────────────────┘
```

- All of the panel's data (database, settings, users, app store data) is stored in the **Docker volume** `docker-manager-data`
- **Deleting the container does not delete the data** — `docker rm` only removes the container; the volume remains

```bash
# View the volume
docker volume inspect docker-manager-data

# Permanently delete the data (caution! irreversible)
docker volume rm docker-manager-data
```

::: warning Docker Socket permissions
Mounting `/var/run/docker.sock` means the container has full control over the Docker daemon, equivalent to root privileges. Do not expose the panel container or port to the public internet casually. Recommended:

- Restrict the source IPs allowed to reach port 8080 with a firewall
- Set a [security entry](/en/guide/configuration/panel) and a [strong password](/en/guide/configuration/panel)
- For public access, prefer [binding a domain with HTTPS](/en/guide/configuration/https)
  :::

## Uninstall

Remove the container:

```bash
docker stop docker-manager-go
docker rm docker-manager-go
```

To delete the data as well, see the [uninstall documentation](/en/guide/uninstall/docker).
