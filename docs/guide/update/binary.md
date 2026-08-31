---
title: 二进制更新
description: 手动更新二进制方式部署的 DockOrae。
---

# 二进制更新

适用于手动下载二进制运行(前台或 systemd 托管)的部署。

## systemd 托管方式

```bash
# 1. 下载新版本(替换 arch 为你的架构)
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
