---
title:
  en: Uninstall Overview
  zh-CN: 卸载概览
description:
  en: Uninstall methods for every DockOrae installation type, and the difference between removing the program and removing the data.
  zh-CN: DockOrae 各安装方式的卸载方法,以及「删除程序」与「删除数据」的区别。
categories:
  - guide
  - uninstall
top: 89000
---

::: en

Choose the uninstall method that matches your installation type:

| Installation type                           | Uninstall command                | Data |
| ------------------------------------------- | -------------------------------- | ---- |
| [One-click script](/guide/uninstall/script) | `sudo bash install.sh uninstall` | Kept |
| [Docker Compose](/guide/uninstall/docker)   | `docker compose down`            | Kept |
| [Docker](/guide/uninstall/docker)           | `docker rm -f docker-manager-go` | Kept |
| [Binary](/guide/uninstall/binary)           | `systemctl stop` + delete files  | Kept |

## Removing the program ≠ Removing the data

DockOrae is designed to separate the **program** from the **data**:

| Operation                                                           | Impact                                         |
| ------------------------------------------------------------------- | ---------------------------------------------- |
| Removing the container / stopping the service / deleting the binary | The panel stops running, **data stays intact** |
| Deleting the data directory / volume                                | **Data is permanently lost and unrecoverable** |

Most uninstall operations (the script's `uninstall`, `compose down`, removing the container) **do not delete your data** — this is intentional, so that after uninstalling and reinstalling, all your settings remain unchanged.

::: warning Deleting data permanently
Only delete the data directory or volume when you are certain you no longer need the panel data:

- Script install: `/opt/docker-manager/data`
- Compose install: `./data`
- docker run install: volume `docker-manager-data`

It is recommended to [back up](/guide/backup) before deleting.
:::

## General steps

1. **Back up** (optional but recommended): `sudo bash install.sh backup` or manually archive the data directory
2. Run the uninstall command for your installation type (see the sub-pages on the left)
3. Decide whether you also need to delete the data directory
   :::

::: zh-CN

按安装方式选择卸载方法:

| 安装方式                                  | 卸载命令                         | 数据 |
| ----------------------------------------- | -------------------------------- | ---- |
| [一键脚本](/guide/uninstall/script)       | `sudo bash install.sh uninstall` | 保留 |
| [Docker Compose](/guide/uninstall/docker) | `docker compose down`            | 保留 |
| [Docker](/guide/uninstall/docker)         | `docker rm -f docker-manager-go` | 保留 |
| [二进制](/guide/uninstall/binary)         | `systemctl stop` + 删除文件      | 保留 |

## 删除程序 ≠ 删除数据

DockOrae 的设计将**程序**与**数据**分离:

| 操作                             | 影响                      |
| -------------------------------- | ------------------------- |
| 删除容器 / 停止服务 / 删除二进制 | 面板不再运行,**数据完好** |
| 删除数据目录 / 卷                | **数据永久丢失,不可恢复** |

大多数卸载操作(脚本的 `uninstall`、`compose down`、删除容器)**都不会删除数据**,这是刻意的 —— 卸载后重新安装,一切设置照旧。

::: warning 彻底删除数据
只有当你确定不再需要面板数据时,才删除数据目录或卷:

- 脚本安装:`/opt/docker-manager/data`
- compose 安装:`./data`
- docker run 安装:卷 `docker-manager-data`

删除前建议先[备份](/guide/backup)。
:::

## 通用步骤

1. **备份**(可选但推荐):`sudo bash install.sh backup` 或手动打包数据目录
2. 按安装方式执行卸载(见左侧子页面)
3. 确认是否需要删除数据目录
   :::
