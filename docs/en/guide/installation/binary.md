---
title: Binary Installation
description: Download the DockOrae binary and run it directly — supported architectures, download, extraction, running, and systemd management.
---

# Binary Installation

No Docker required — download the pre-built binary and run it directly. Suitable for environments without Docker, ARM devices, or advanced users.

## Supported Architectures

Download the archive for your architecture from [GitHub Releases](https://github.com/DockOrae/DockOrae/releases/latest):

| Architecture | Asset name                             | Description                         |
| ------------ | -------------------------------------- | ----------------------------------- |
| amd64        | `docker-manager-go-linux-amd64.tar.gz` | x86_64 servers                      |
| arm64        | `docker-manager-go-linux-arm64.tar.gz` | 64-bit ARM (Raspberry Pi 4, etc.)   |
| armv7        | `docker-manager-go-linux-armv7.tar.gz` | 32-bit ARM (Raspberry Pi 2/3, etc.) |
| armv6        | `docker-manager-go-linux-armv6.tar.gz` | Older ARM devices                   |
| armv5        | `docker-manager-go-linux-armv5.tar.gz` | Legacy ARM devices                  |
| 386          | `docker-manager-go-linux-386.tar.gz`   | 32-bit x86                          |
| s390x        | `docker-manager-go-linux-s390x.tar.gz` | IBM Z / LinuxONE                    |

::: note
Each archive ships with a `.sha256` checksum file. The current Release asset names follow what is actually shown on the [Releases page](https://github.com/DockOrae/DockOrae/releases/latest).
:::

## Download and Run

Using Linux amd64 as an example:

```bash
# 1. Download (replace <arch> with your architecture, e.g. amd64 / arm64 / armv7)
wget https://github.com/DockOrae/DockOrae/releases/latest/download/docker-manager-go-linux-amd64.tar.gz

# 2. (Optional) Verify integrity
wget https://github.com/DockOrae/DockOrae/releases/latest/download/docker-manager-go-linux-amd64.tar.gz.sha256
sha256sum -c docker-manager-go-linux-amd64.tar.gz.sha256

# 3. Extract
tar xzf docker-manager-go-linux-amd64.tar.gz

# 4. Install to a system directory
sudo mv docker-manager-go/docker-manager-go /usr/local/bin/

# 5. Start (data directory defaults to ./data, port defaults to 8080)
DATA_DIR=/opt/docker-manager/data PORT=8080 docker-manager-go
```

After starting, visit `http://<server-ip>:8080`; the default credentials are `admin / 123456`.

::: tip Check your architecture
Not sure about your server architecture? Run `uname -m`:

- `x86_64` → amd64
- `aarch64` → arm64
- `armv7l` → armv7
  :::

## Command-line Flags

| Flag    | Default                 | Description    |
| ------- | ----------------------- | -------------- |
| `-data` | `$DATA_DIR` or `./data` | Data directory |
| `-port` | `$PORT` or `8080`       | Listening port |

Precedence: command-line flags > environment variables > defaults.

## Managing as a systemd Service (Recommended)

Running in the foreground occupies the terminal. We recommend managing it with systemd for auto-start on boot and automatic restart on crash:

Create `/etc/systemd/system/docker-manager.service`:

```ini
[Unit]
Description=Docker Manager Go
After=network-online.target
Wants=network-online.target

[Service]
Type=simple
Environment=DATA_DIR=/opt/docker-manager/data
Environment=PORT=8080
Environment=DOCKER_HOST=unix:///var/run/docker.sock
ExecStart=/usr/local/bin/docker-manager-go
Restart=always
RestartSec=3

[Install]
WantedBy=multi-user.target
```

```bash
sudo systemctl daemon-reload
sudo systemctl enable docker-manager
sudo systemctl start docker-manager

# Check status
systemctl status docker-manager
```

::: tip An easier way
The **binary mode** of the one-click script automates all of the above (download, SHA256 verification, installation, systemd service):

```bash
DM_MODE=binary bash <(curl -Ls https://raw.githubusercontent.com/DockOrae/DockOrae/master/install.sh)
```

See the [one-click installation script](/en/guide/installation/script).
:::

## Logs

In binary mode (foreground or systemd), logs go to stdout. For systemd, view them with:

```bash
journalctl -u docker-manager -f
```

## Update / Stop / Uninstall

- [Binary update](/en/guide/update/binary) — replace the binary and restart the service
- [Binary uninstall](/en/guide/uninstall/binary) — stop the service and delete the files
