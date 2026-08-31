---
title:
  en: Binary Installation
  zh-CN: 二进制安装
description:
  en: Download the DockOrae binary and run it directly — supported architectures, download, extraction, running, and systemd management.
  zh-CN: 手动下载 DockOrae 二进制文件直接运行 — 支持架构、下载、解压、运行与 systemd 托管。
categories:
  - guide
  - installation
top: 97500
---

::: en

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

See the [one-click installation script](/guide/installation/script).
:::

## Logs

In binary mode (foreground or systemd), logs go to stdout. For systemd, view them with:

```bash
journalctl -u docker-manager -f
```

## Update / Stop / Uninstall

- [Binary update](/guide/update/binary) — replace the binary and restart the service
- [Binary uninstall](/guide/uninstall/binary) — stop the service and delete the files
  :::

::: zh-CN

无需 Docker,直接下载编译好的二进制文件运行。适合没有 Docker 的环境、ARM 设备或高级用户。

## 支持架构

从 [GitHub Releases](https://github.com/DockOrae/DockOrae/releases/latest) 下载对应架构的压缩包:

| 架构  | 资产名称                               | 说明                     |
| ----- | -------------------------------------- | ------------------------ |
| amd64 | `docker-manager-go-linux-amd64.tar.gz` | x86_64 服务器            |
| arm64 | `docker-manager-go-linux-arm64.tar.gz` | 64 位 ARM(树莓派 4 等)   |
| armv7 | `docker-manager-go-linux-armv7.tar.gz` | 32 位 ARM(树莓派 2/3 等) |
| armv6 | `docker-manager-go-linux-armv6.tar.gz` | 旧 ARM 设备              |
| armv5 | `docker-manager-go-linux-armv5.tar.gz` | 老式 ARM 设备            |
| 386   | `docker-manager-go-linux-386.tar.gz`   | 32 位 x86                |
| s390x | `docker-manager-go-linux-s390x.tar.gz` | IBM Z / LinuxONE         |

::: note
每个压缩包都附带 `.sha256` 校验文件。当前 Release 资产命名以 [Releases 页面](https://github.com/DockOrae/DockOrae/releases/latest) 实际显示为准。
:::

## 下载并运行

以 Linux amd64 为例:

```bash
wget https://github.com/DockOrae/DockOrae/releases/latest/download/docker-manager-go-linux-amd64.tar.gz

# 2. (可选)校验完整性
wget https://github.com/DockOrae/DockOrae/releases/latest/download/docker-manager-go-linux-amd64.tar.gz.sha256
sha256sum -c docker-manager-go-linux-amd64.tar.gz.sha256

# 3. 解压
tar xzf docker-manager-go-linux-amd64.tar.gz

# 4. 安装到系统目录
sudo mv docker-manager-go/docker-manager-go /usr/local/bin/

# 5. 启动(数据目录默认 ./data,端口默认 8080)
DATA_DIR=/opt/docker-manager/data PORT=8080 docker-manager-go
```

启动后访问 `http://<服务器IP>:8080`,默认账号 `admin / 123456`。

::: tip 查询架构
不确定服务器架构?运行 `uname -m`:

- `x86_64` → amd64
- `aarch64` → arm64
- `armv7l` → armv7
  :::

## 命令行参数

| 参数    | 默认值                  | 说明     |
| ------- | ----------------------- | -------- |
| `-data` | `$DATA_DIR` 或 `./data` | 数据目录 |
| `-port` | `$PORT` 或 `8080`       | 监听端口 |

优先级:命令行参数 > 环境变量 > 默认值。

## 托管为 systemd 服务(推荐)

前台运行会占用终端。推荐使用 systemd 托管,开机自启、崩溃自动重启:

创建 `/etc/systemd/system/docker-manager.service`:

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

# 查看状态
systemctl status docker-manager
```

::: tip 更省事的做法
一键脚本的**二进制方式**会自动完成以上全部步骤(下载、SHA256 校验、安装、systemd 服务):

```bash
DM_MODE=binary bash <(curl -Ls https://raw.githubusercontent.com/DockOrae/DockOrae/master/install.sh)
```

见[一键安装脚本](/guide/installation/script)。
:::

## 日志

二进制方式(前台或 systemd)日志输出到 stdout。systemd 方式查看:

```bash
journalctl -u docker-manager -f
```

## 更新 / 停止 / 卸载

- [二进制更新](/guide/update/binary) — 替换二进制并重启服务
- [二进制卸载](/guide/uninstall/binary) — 停止服务并删除文件
  :::
