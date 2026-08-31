---
title:
  en: Binary Uninstall
  zh-CN: 二进制卸载
description:
  en: Uninstall DockOrae deployed from the binary (systemd service, binary files, and data directory).
  zh-CN: 卸载二进制方式部署的 DockOrae(systemd 服务、二进制文件与数据目录)。
categories:
  - guide
  - uninstall
top: 88000
---

:::: en

Applies to panels deployed manually from a binary (managed by systemd or run in the foreground).

## systemd-managed method { lang="en" }

```bash
sudo systemctl stop docker-manager
sudo systemctl disable docker-manager

# 2. Delete the service file
sudo rm -f /etc/systemd/system/docker-manager.service
sudo systemctl daemon-reload

# 3. Delete the binary (use the actual install path)
sudo rm -f /usr/local/bin/docker-manager-go
```

## Foreground-run method { lang="en" }

Stop the process directly (Ctrl+C) and delete the binary:

```bash
sudo rm -f /usr/local/bin/docker-manager-go
```

## Deleting data permanently { lang="en" }

::: danger Irrecoverable
The data directory defaults to `/opt/docker-manager/data` (or the location you set via `DATA_DIR`). Only delete after confirming you have a backup:

```bash
sudo rm -rf /opt/docker-manager/data
```

:::

## Full uninstall example { lang="en" }

```bash
sudo systemctl stop docker-manager
sudo systemctl disable docker-manager
sudo rm -f /etc/systemd/system/docker-manager.service
sudo systemctl daemon-reload
sudo rm -f /usr/local/bin/docker-manager-go
sudo rm -rf /opt/docker-manager   # Program directory + data (be careful)
```

::::
:::: zh-CN

适用于手动二进制(systemd 托管或前台运行)部署的面板。

## systemd 托管方式 { lang="zh-CN" }

```bash
sudo systemctl stop docker-manager
sudo systemctl disable docker-manager

# 2. 删除服务文件
sudo rm -f /etc/systemd/system/docker-manager.service
sudo systemctl daemon-reload

# 3. 删除二进制(按实际安装路径)
sudo rm -f /usr/local/bin/docker-manager-go
```

## 前台运行方式 { lang="zh-CN" }

直接停止进程(Ctrl+C)并删除二进制:

```bash
sudo rm -f /usr/local/bin/docker-manager-go
```

## 彻底删除数据 { lang="zh-CN" }

::: danger 不可恢复
数据目录默认 `/opt/docker-manager/data`(或你通过 `DATA_DIR` 指定的位置)。确认已备份后再删除:

```bash
sudo rm -rf /opt/docker-manager/data
```

:::

## 完整卸载示例 { lang="zh-CN" }

```bash
sudo systemctl stop docker-manager
sudo systemctl disable docker-manager
sudo rm -f /etc/systemd/system/docker-manager.service
sudo systemctl daemon-reload
sudo rm -f /usr/local/bin/docker-manager-go
sudo rm -rf /opt/docker-manager   # 程序目录 + 数据(谨慎)
```

::::
