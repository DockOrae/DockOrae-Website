---
title: Data Directory & Persistence
description: DockOrae data storage structure, Docker Socket explanation and security risks, and data persistence best practices.
---

# Data Directory & Persistence

## Data Directory Structure

Panel data is uniformly stored in the data directory (`/data` inside the container):

```
/data
├── docker-manager.db     # SQLite database (users, settings, events)
├── config.json           # JWT secret (auto-generated)
├── license.json          # License activation token
├── cert/                 # HTTPS certificates (mounted from host ./cert in compose mode)
└── ...                   # App store data, etc.
```

| Installation method        | Host data location                                 |
| -------------------------- | -------------------------------------------------- |
| One-click script (compose) | `/opt/docker-manager/data`                         |
| One-click script (binary)  | `/opt/docker-manager/data`                         |
| Manual compose             | `./data` (directory of the compose file)           |
| Manual docker run          | Docker volume `docker-manager-data`                |
| Manual binary              | `DATA_DIR` environment variable (default `./data`) |

## How Data Persistence Works

```
Host storage (where the data actually lives)
     │  volume / bind mount
     ▼
/data inside the container
     │
     ▼
SQLite / config / certificates / app store data
```

**Key takeaway: deleting the container ≠ deleting the data.**

- The container can be deleted, recreated, or upgraded at any time; as long as the volume or mounted directory still exists, the data is not lost
- Before upgrading / uninstalling, confirm the data directory location and back it up or keep it

## Docker Socket

The panel communicates with the Docker daemon through the Docker Socket:

```
DockOrae (container)
   ↓ mounts /var/run/docker.sock
Docker API
   ↓
Docker Engine
```

- **Linux**: `/var/run/docker.sock` (must be mounted for compose and docker run modes)
- **Binary mode**: the panel accesses the local socket directly; no mounting needed
- **Remote daemon**: set `DOCKER_HOST=tcp://<host>:2375` (and do not mount the socket)

::: danger Security warning
`/var/run/docker.sock` grants **full control over the Docker daemon, equivalent to root access on the host**. Do not:

- Expose the panel's 8080 port directly to the public internet (use a firewall to restrict source IPs or put an HTTPS reverse proxy in front)
- Mount docker.sock into untrusted containers

This is the common security model of the Docker ecosystem (the same as panels like Portainer); take it seriously.
:::

### Docker rootless

The socket of rootless Docker lives in the user directory:

```yaml
volumes:
  - /run/user/1000/docker.sock:/var/run/docker.sock
```

## Backing Up Data

Backup = archiving the data directory:

```bash
# One-click script
sudo bash install.sh backup        # generates into /opt/docker-manager/backups/

# Manual (compose mode)
tar -czf dm-backup.tar.gz -C /opt/docker-manager/data .

# Manual (docker run mode, volume)
docker run --rm -v docker-manager-data:/data -v $(pwd):/backup alpine \
  tar -czf /backup/dm-backup.tar.gz -C /data .
```

See [Backup & Restore](/en/guide/backup) for restore instructions and more details.

## Cleaning Up Data

Permanently delete all data (be careful — this cannot be undone):

```bash
# Script install
sudo rm -rf /opt/docker-manager/data

# docker run install
docker volume rm docker-manager-data

# compose install
rm -rf ./data
```
