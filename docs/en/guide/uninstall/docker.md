---
title: Compose Uninstall
description: Uninstall DockOrae deployed via Docker Compose / Docker, including data cleanup instructions.
---

# Compose Uninstall

Applies to panels deployed with **Docker Compose** and **Docker**.

## Docker Compose method

```bash
cd /opt/docker-manager   # your compose directory

# Stop and remove the containers (the network is removed too)
docker compose down
```

- `down` removes the containers and the network
- **Data is kept** — the `./data` directory is unaffected

To also remove the program files:

```bash
# Remove the compose file and the installation directory (the ./data directory remains)
rm -f docker-compose.yml
```

## Docker method

```bash
# Stop and remove the containers
docker stop docker-manager-go
docker rm docker-manager-go
```

## Deleting data permanently

::: danger Irrecoverable
The following operations permanently delete all panel data (SQLite database, settings, users, app store data). Make sure you have backed up first.
:::

```bash
# Compose method: delete the data directory
rm -rf /opt/docker-manager/data

# docker run method: delete the data volume
docker volume rm docker-manager-data
```

## Full uninstall example (Compose)

```bash
cd /opt/docker-manager
docker compose down                      # 1. Stop and remove the containers
rm -rf /opt/docker-manager               # 2. Delete the program files and data (be careful)
```
