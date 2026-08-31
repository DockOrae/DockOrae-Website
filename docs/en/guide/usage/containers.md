---
title: Container Management
description: Create, start, stop, restart, pause, and delete containers; view details, logs, and enter the built-in Web terminal.
---

# Container Management

Go to the **Containers** page to manage all containers visible to the panel (only resources created or taken over by the panel are shown, see [resource visibility](/en/guide/usage/#resource-visibility-notes)).

## Container List

Filter conditions at the top: all / running / stopped. Each container shows its name, image, status, port mappings, and quick action buttons.

## Create a Container

Click **Create Container** and fill in the form:

- **Basic info** — name, image, restart policy
- **Port mappings** — host port → container port
- **Environment variables** — key-value pairs
- **Volumes** — volume mounts or bind mounts
- **Network** — select the network and network aliases

::: note
Creating containers is a Pro feature and requires a valid [license](/en/guide/configuration/panel#license). The free edition can manage (start/stop/delete/view) existing containers.
:::

## Container Actions

| Action           | Description                                                                         |
| ---------------- | ----------------------------------------------------------------------------------- |
| ▶ Start          | Start a stopped container                                                           |
| ⏸ Stop           | Gracefully stop a container                                                         |
| 🔄 Restart       | Restart a container                                                                 |
| ⏯ Pause / Resume | Pause the container's processes (does not stop the container)                       |
| 🗑 Delete         | Delete a container (**note:** volumes are not deleted by default, the data remains) |
| 🔍 Inspect       | View the container's full JSON configuration                                        |

## Container Details

Click a container to open its details page, which contains several sub-tabs:

- **Logs** — real-time scrolling view (follow supported)
- **Stats** — real-time resource usage (CPU / memory / network)
- **Processes** — process list inside the container
- **Changes** — container filesystem changes (compared against the image)
- **Config (JSON)** — full container configuration
- **Start parameters** — the start command used at creation

## Container Terminal

Built-in **Web terminal** (WebSocket-based):

1. Open the container details
2. Click **Terminal**
3. Operate the container shell directly in the browser

::: tip
The terminal is for debugging the container's internal environment. A shell (e.g. `sh` / `bash`) must exist inside the container. This feature works via a direct connection between the panel and the Docker daemon — no SSH installation in the container is required.
:::

## FAQ

**Container shows "Restarting"?** The container failed to start and entered a restart loop; check the [logs](#container-details) to find the cause; common causes are port conflicts, incorrect environment variables, or problems with the image's start command.

**Is my data still there after deleting a container?** Deleting a container does **not** delete mounted volumes and bind mounts by default — the data is preserved; to clean it up, delete the [volumes](/en/guide/usage/volumes) separately.
