---
title: Binary Uninstall
description: Uninstall DockOrae deployed from the binary (systemd service, binary files, and data directory).
---

# Binary Uninstall

Applies to panels deployed manually from a binary (managed by systemd or run in the foreground).

## systemd-managed method

```bash
# 1. Stop and disable the service
sudo systemctl stop docker-manager
sudo systemctl disable docker-manager

# 2. Delete the service file
sudo rm -f /etc/systemd/system/docker-manager.service
sudo systemctl daemon-reload

# 3. Delete the binary (use the actual install path)
sudo rm -f /usr/local/bin/docker-manager-go
```

## Foreground-run method

Stop the process directly (Ctrl+C) and delete the binary:

```bash
sudo rm -f /usr/local/bin/docker-manager-go
```

## Deleting data permanently

::: danger Irrecoverable
The data directory defaults to `/opt/docker-manager/data` (or the location you set via `DATA_DIR`). Only delete after confirming you have a backup:

```bash
sudo rm -rf /opt/docker-manager/data
```

:::

## Full uninstall example

```bash
sudo systemctl stop docker-manager
sudo systemctl disable docker-manager
sudo rm -f /etc/systemd/system/docker-manager.service
sudo systemctl daemon-reload
sudo rm -f /usr/local/bin/docker-manager-go
sudo rm -rf /opt/docker-manager   # Program directory + data (be careful)
```
