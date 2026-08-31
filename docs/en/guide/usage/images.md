---
title: Image Management
description: Pull images (with real-time progress), build from a Dockerfile, delete and clean up unused images.
---

# Image Management

Go to the **Images** page to manage Docker images.

## Image List

Displays the image name, tag, size, and creation time. Supports filtering by name search.

## Pulling Images

Click **Pull** and enter the image name (e.g. `nginx:latest`, `mysql:8.0`):

- Shows **real-time pull progress** (layer download progress bars)
- On slow networks, speed up pulls by configuring a [registry mirror](/en/guide/configuration/panel#registry-mirror)

## Building from a Dockerfile

The panel supports building images by uploading a Dockerfile directly:

1. Click **Build**
2. Fill in the image name and the Dockerfile content (or upload one)
3. After submitting, the build log is displayed in real time

## Deleting Images

- **Delete individually** — use the action button in the list to delete a specific image
- **Clean up unused images** — one-click cleanup of dangling images (images with no tag and not used by any container)

::: warning
Before deleting an image, make sure no running container depends on it; otherwise the container will fail to start.
:::

## Viewing Details

Click an image to view its details: tags, architecture, layers, size, and creation history.

## FAQ

**Pull timeout / slow downloads?** Configure a [registry mirror](/en/guide/configuration/panel#registry-mirror), or check the network from the server to Docker Hub.

**Deleting an image reports "image is being used"?** A container is currently using the image. Stop and delete the related containers first.
