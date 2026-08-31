---
title: Uninstall Overview
description: Uninstall methods for every DockOrae installation type, and the difference between removing the program and removing the data.
---

# Uninstall DockOrae

Choose the uninstall method that matches your installation type:

| Installation type                              | Uninstall command                | Data |
| ---------------------------------------------- | -------------------------------- | ---- |
| [One-click script](/en/guide/uninstall/script) | `sudo bash install.sh uninstall` | Kept |
| [Docker Compose](/en/guide/uninstall/docker)   | `docker compose down`            | Kept |
| [Docker](/en/guide/uninstall/docker)           | `docker rm -f docker-manager-go` | Kept |
| [Binary](/en/guide/uninstall/binary)           | `systemctl stop` + delete files  | Kept |

## Removing the program ≠ Removing the data

DockOrae is designed to separate the **program** from the **data**:

| Operation                                                           | Impact                                         |
| ------------------------------------------------------------------- | ---------------------------------------------- |
| Removing the container / stopping the service / deleting the binary | The panel stops running, **data stays intact** |
| Deleting the data directory / volume                                | **Data is permanently lost and unrecoverable** |

Most uninstall operations (the script's `uninstall`, `compose down`, removing the container) **do not delete your data** — this is intentional, so that after uninstalling and reinstalling, all your settings remain unchanged.

::: warning Deleting data permanently
Only delete the data directory or volume when you are certain you no longer need the panel data:

- Script install: `/opt/docker-manager/data`
- Compose install: `./data`
- docker run install: volume `docker-manager-data`

It is recommended to [back up](/en/guide/backup) before deleting.
:::

## General steps

1. **Back up** (optional but recommended): `sudo bash install.sh backup` or manually archive the data directory
2. Run the uninstall command for your installation type (see the sub-pages on the left)
3. Decide whether you also need to delete the data directory
