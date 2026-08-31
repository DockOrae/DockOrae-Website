---
title: Compose Update
description: Manually update DockOrae deployed via Docker Compose / Docker.
---

# Compose Update

Applies to panels deployed via **Docker Compose** and **Docker**.

## Docker Compose Mode

```bash
# 1. Pull the latest image
docker compose pull

# 2. Recreate the container (auto-recreated when a new image is detected)
docker compose up -d
```

Or do it in one step:

```bash
docker compose up -d --pull always
```

| Command                | Effect                                                                                   |
| ---------------------- | ---------------------------------------------------------------------------------------- |
| `docker compose pull`  | Pulls the latest `latest` image                                                          |
| `docker compose up -d` | Automatically recreates the container when the image has changed; does nothing otherwise |
| `--pull always`        | Forces pulling the latest image before every start                                       |

Verify after updating:

```bash
docker compose ps              # container status: Up
docker compose logs --tail 20  # view the panel startup logs
```

## Docker Mode

```bash
# 1. Pull the latest image
docker pull dockorae/dockorae:latest

# 2. Stop and remove the old container (data is in the volume and is unaffected)
docker stop docker-manager-go
docker rm docker-manager-go

# 3. Recreate with the same arguments
docker run -d --name docker-manager-go \
  -p 8080:8080 \
  -v /var/run/docker.sock:/var/run/docker.sock \
  -v docker-manager-data:/data \
  dockorae/dockorae:latest
```

::: tip Keep the arguments identical
When recreating the container, **be sure to use the same mount and port arguments as before**, otherwise the data directory or access method will change. If you are unsure, first run `docker inspect docker-manager-go` to view the original arguments.
:::

## After Updating

- Open the panel; the footer version number should show the new version
- Check that the data is intact (containers, settings, app store data)
- Updates do not modify the data directory; no need to worry about data loss
