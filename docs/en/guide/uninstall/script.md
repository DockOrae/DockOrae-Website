---
title: One-click Script Uninstall
description: Uninstall DockOrae with install.sh uninstall, plus data cleanup and reinstallation instructions.
---

# One-click Script Uninstall

For panels installed with the one-click script, uninstalling takes a single command:

```bash
sudo bash install.sh uninstall
```

The script will:

1. Confirm the uninstall (defaults to **keeping your data**)
2. Compose method: run `docker compose down` to stop and remove the containers
3. Binary method: stop and disable the systemd service, remove the service file and the `/usr/local/bin/dockorae` symlink
4. Ask whether to also delete the installation directory (**data is still kept**)

## After uninstalling

- The panel is stopped and the data remains in `/opt/docker-manager/data`
- To reinstall, run `bash <(curl -Ls https://raw.githubusercontent.com/DockOrae/DockOrae/master/install.sh)` and your data will be restored automatically

## Deleting data permanently

::: danger Irrecoverable

```bash
# Data directory (database, settings, users) — only run after confirming you have a backup
sudo rm -rf /opt/docker-manager/data

# To delete the installation directory as well
sudo rm -rf /opt/docker-manager
```

:::

## Reinstalling

```bash
# Reinstall while keeping the data
bash <(curl -Ls https://raw.githubusercontent.com/DockOrae/DockOrae/master/install.sh)

# Force reinstall with overwrite (data kept)
DM_FORCE=1 sudo bash install.sh install
```
