---
title:
  en: Binary Update
  zh-CN: 二进制更新
description:
  en: Manually update DockOrae deployed as a binary.
  zh-CN: 手动更新二进制方式部署的 DockOrae。
categories:
  - guide
  - update
top: 91000
---

::: en

Applies to deployments where the binary is downloaded and run manually (in the foreground or managed by systemd).

## systemd-Managed Mode

```bash
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
:::

::: zh-CN

适用于手动下载二进制运行(前台或 systemd 托管)的部署。

## systemd 托管方式

```bash
wget -O dockorae.tar.gz \
  https://github.com/DockOrae/DockOrae/releases/latest/download/docker-manager-go-linux-amd64.tar.gz

# 2. 解压
tar xzf dockorae.tar.gz

# 3. 替换二进制(服务停止期间短暂不可访问)
sudo systemctl stop docker-manager
sudo cp docker-manager-go/docker-manager-go /usr/local/bin/docker-manager-go
sudo systemctl start docker-manager

# 4. 验证
systemctl status docker-manager
```

## 前台运行方式

```bash
# 停止旧进程(Ctrl+C),然后:
wget -O dockorae.tar.gz \
  https://github.com/DockOrae/DockOrae/releases/latest/download/docker-manager-go-linux-amd64.tar.gz
tar xzf dockorae.tar.gz
sudo mv docker-manager-go/docker-manager-go /usr/local/bin/
DATA_DIR=/opt/docker-manager/data PORT=8080 docker-manager-go
```

## 校验完整性(可选)

```bash
wget https://github.com/DockOrae/DockOrae/releases/latest/download/docker-manager-go-linux-amd64.tar.gz.sha256
sha256sum -c docker-manager-go-linux-amd64.tar.gz.sha256
```

::: tip 更省事的做法
二进制部署推荐使用一键脚本托管,更新只需一条命令:

```bash
sudo bash install.sh update
```

脚本自动下载、SHA256 校验、替换二进制并重启服务。
:::
:::
