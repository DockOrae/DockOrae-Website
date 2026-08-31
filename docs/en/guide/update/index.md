---
title: Update Overview
description: Update methods for each DockOrae installation type and backup considerations before upgrading.
---

# Updating DockOrae

DockOrae releases updates very frequently (fixes and feature iterations), so keeping the latest version is recommended. Each installation type has a corresponding update method:

| Installation type | Update method                                                         | Difficulty |
| ----------------- | --------------------------------------------------------------------- | ---------- |
| One-click script  | `sudo bash install.sh update`                                         | ⭐         |
| Docker Compose    | `docker compose pull && docker compose up -d`                         | ⭐         |
| Docker            | Pull the new image and recreate the container                         | ⭐⭐       |
| Binary            | Download the new release, replace the binary, and restart the service | ⭐⭐       |
| Any method        | **Panel online update** (Settings → Updates)                          | ⭐         |

::: tip Recommended
**Built-in online update in the panel**: supported for every deployment method; complete it with one click in the panel without logging into the server. See [Panel Online Update](/en/guide/update/panel).
:::

## Backup Before Upgrading

Backing up your data before updating is recommended (so you can roll back if the upgrade fails):

```bash
# One-click script mode
sudo bash install.sh backup

# Manual backup (compose mode)
tar -czf dm-backup.tar.gz -C /opt/docker-manager/data .

# Manual backup (docker run mode)
docker run --rm -v docker-manager-data:/data -v $(pwd):/backup alpine \
  tar -czf /backup/dm-backup.tar.gz -C /data .
```

See [Backup & Restore](/en/guide/backup) for more backup details.

## Check the Current Version

- The panel footer shows the current version number
- One-click script: `sudo bash install.sh info`
- When a new version is available, a **pink dot indicator** appears next to the footer version number

## What If the Update Fails

1. Check the error message; it is usually a network problem (failed to pull the image / download the binary)
2. On mainland-China networks, you can configure a [registry mirror](/en/guide/configuration/panel#registry-mirror) and retry
3. Data is not lost — the update only replaces the program; the data directory is untouched
4. If the panel cannot start, reinstall while keeping the data using the [uninstall](/en/guide/uninstall/) procedure, or restore from a backup

---

See the detailed update steps for your installation type:

- [Compose Update](/en/guide/update/docker) — manual compose / docker run deployments
- [Binary Update](/en/guide/update/binary)
- [One-Click Script Update](/en/guide/update/script)
- [Panel Online Update](/en/guide/update/panel)
