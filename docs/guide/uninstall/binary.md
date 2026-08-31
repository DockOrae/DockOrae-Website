---
title: 二进制卸载
description: 卸载二进制方式部署的 DockOrae(systemd 服务、二进制文件与数据目录)。
---

# 二进制卸载

适用于手动二进制(systemd 托管或前台运行)部署的面板。

## systemd 托管方式

```bash
# 1. 停止并禁用服务
sudo systemctl stop docker-manager
sudo systemctl disable docker-manager

# 2. 删除服务文件
sudo rm -f /etc/systemd/system/docker-manager.service
sudo systemctl daemon-reload

# 3. 删除二进制(按实际安装路径)
sudo rm -f /usr/local/bin/docker-manager-go
```

## 前台运行方式

直接停止进程(Ctrl+C)并删除二进制:

```bash
sudo rm -f /usr/local/bin/docker-manager-go
```

## 彻底删除数据

::: danger 不可恢复
数据目录默认 `/opt/docker-manager/data`(或你通过 `DATA_DIR` 指定的位置)。确认已备份后再删除:

```bash
sudo rm -rf /opt/docker-manager/data
```

:::

## 完整卸载示例

```bash
sudo systemctl stop docker-manager
sudo systemctl disable docker-manager
sudo rm -f /etc/systemd/system/docker-manager.service
sudo systemctl daemon-reload
sudo rm -f /usr/local/bin/docker-manager-go
sudo rm -rf /opt/docker-manager   # 程序目录 + 数据(谨慎)
```
