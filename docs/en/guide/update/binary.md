---
title: Binary Update
description: Manually update DockOrae deployed as a binary.
---

# Binary Update

Applies to deployments where the binary is downloaded and run manually (in the foreground or managed by systemd).

## systemd-Managed Mode

```bash
# 1. Download the new release (replace arch with your architecture)
wget -O dockorae.tar.gz \
  https://github.com/DockOrae/DockOrae/releases/latest/download/docker-manager-go-linux-amd64.tar.gz

# 2. Extract
tar xzf dockorae.tar.gz

# 3. Replace the binary (briefly unavailable while the service is stopped)
sudo systemctl stop docker-manager
sudo cp docker-manager-go/docker-manager-go /usr/local/bin/docker-manager-go
sudo systemctl start docker-manager

# 4. Verify
systemctl status docker-manager
```

## Foreground Run Mode

```bash
# Stop the old process (Ctrl+C), then:
wget -O dockorae.tar.gz \
  https://github.com/DockOrae/DockOrae/releases/latest/download/docker-manager-go-linux-amd64.tar.gz
tar xzf dockorae.tar.gz
sudo mv docker-manager-go/docker-manager-go /usr/local/bin/
DATA_DIR=/opt/docker-manager/data PORT=8080 docker-manager-go
```

## Verify Integrity (Optional)

```bash
wget https://github.com/DockOrae/DockOrae/releases/latest/download/docker-manager-go-linux-amd64.tar.gz.sha256
sha256sum -c docker-manager-go-linux-amd64.tar.gz.sha256
```

::: tip An easier approach
For binary deployments, it is recommended to manage them with the one-click script — updating takes just one command:

```bash
sudo bash install.sh update
```

The script automatically downloads, verifies the SHA256 checksum, replaces the binary, and restarts the service.
:::
