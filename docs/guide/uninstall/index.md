---
title: 卸载概览
description: DockOrae 各安装方式的卸载方法,以及「删除程序」与「删除数据」的区别。
---

# 卸载 DockOrae

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
