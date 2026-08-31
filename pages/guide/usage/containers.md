---
title:
  en: Container Management
  zh-CN: 容器管理
description:
  en: Create, start, stop, restart, pause, and delete containers; view details, logs, and enter the built-in Web terminal.
  zh-CN: 创建、启动、停止、重启、暂停、删除容器,查看详情、日志与进入内置 Web 终端。
categories:
  - guide
  - usage
top: 95500
---

::: en

Go to the **Containers** page to manage all containers visible to the panel (only resources created or taken over by the panel are shown, see [resource visibility](/guide/usage/#resource-visibility-notes)).

## Container List

Filter conditions at the top: all / running / stopped. Each container shows its name, image, status, port mappings, and quick action buttons.

## Create a Container

Click **Create Container** and fill in the form:

- **Basic info** — name, image, restart policy
- **Port mappings** — host port → container port
- **Environment variables** — key-value pairs
- **Volumes** — volume mounts or bind mounts
- **Network** — select the network and network aliases

::: note
Creating containers is a Pro feature and requires a valid [license](/guide/configuration/panel#license). The free edition can manage (start/stop/delete/view) existing containers.
:::

## Container Actions

| Action            | Description                                                                         |
| ----------------- | ----------------------------------------------------------------------------------- |
| ▶ Start          | Start a stopped container                                                           |
| ⏸ Stop           | Gracefully stop a container                                                         |
| 🔄 Restart        | Restart a container                                                                 |
| ⏯ Pause / Resume | Pause the container's processes (does not stop the container)                       |
| 🗑 Delete         | Delete a container (**note:** volumes are not deleted by default, the data remains) |
| 🔍 Inspect        | View the container's full JSON configuration                                        |

## Container Details

Click a container to open its details page, which contains several sub-tabs:

- **Logs** — real-time scrolling view (follow supported)
- **Stats** — real-time resource usage (CPU / memory / network)
- **Processes** — process list inside the container
- **Changes** — container filesystem changes (compared against the image)
- **Config (JSON)** — full container configuration
- **Start parameters** — the start command used at creation

## Container Terminal

Built-in **Web terminal** (WebSocket-based):

1. Open the container details
2. Click **Terminal**
3. Operate the container shell directly in the browser

::: tip
The terminal is for debugging the container's internal environment. A shell (e.g. `sh` / `bash`) must exist inside the container. This feature works via a direct connection between the panel and the Docker daemon — no SSH installation in the container is required.
:::

## FAQ

**Container shows "Restarting"?** The container failed to start and entered a restart loop; check the [logs](#container-details) to find the cause; common causes are port conflicts, incorrect environment variables, or problems with the image's start command.

**Is my data still there after deleting a container?** Deleting a container does **not** delete mounted volumes and bind mounts by default — the data is preserved; to clean it up, delete the [volumes](/guide/usage/volumes) separately.
:::

::: zh-CN

进入 **容器** 页面,管理面板可见的所有容器(仅显示面板创建或接管的资源,见[资源可见性](/guide/usage/#资源可见性说明))。

## 容器列表

顶部过滤条件:全部 / 运行中 / 已停止。每个容器显示名称、镜像、状态、端口映射与快捷操作按钮。

## 创建容器

点击 **创建容器**,填写表单:

- **基础信息** — 名称、镜像、重启策略
- **端口映射** — 宿主端口 → 容器端口
- **环境变量** — 键值对
- **存储卷** — 挂载卷或 bind mount
- **网络** — 选择网络与网络别名

::: note
创建容器属于 Pro 功能,需要有效的[许可证](/guide/configuration/panel#许可证)。免费版可管理(启停/删除/查看)已有容器。
:::

## 容器操作

| 操作           | 说明                                      |
| -------------- | ----------------------------------------- |
| ▶ 启动        | 启动已停止的容器                          |
| ⏸ 停止        | 优雅停止容器                              |
| 🔄 重启        | 重启容器                                  |
| ⏯ 暂停 / 恢复 | 暂停容器进程(不会停止容器)                |
| 🗑 删除        | 删除容器(**注意:** 默认不删除卷,数据仍在) |
| 🔍 检查        | 查看容器完整 JSON 配置                    |

## 容器详情

点击容器进入详情页,包含多个子页:

- **日志** — 实时滚动查看(支持跟随)
- **Stats** — 实时资源占用(CPU / 内存 / 网络)
- **进程** — 容器内进程列表
- **变更** — 容器文件系统变更(与镜像对比)
- **配置(JSON)** — 完整容器配置
- **启动参数** — 创建时的启动命令

## 容器终端

内置 **Web 终端**(基于 WebSocket):

1. 进入容器详情
2. 点击 **终端**
3. 在浏览器中直接操作容器 shell

::: tip
终端适用于调试容器内部环境。容器内需存在 shell(如 `sh` / `bash`)。此功能由面板与 Docker daemon 直连实现,无需在容器中安装 SSH。
:::

## 常见问题

**容器显示 "Restarting"?** 容器启动失败进入重启循环,查看[日志](#容器详情)定位原因;常见为端口冲突、环境变量错误或镜像启动命令问题。

**删除容器后数据还在吗?** 删除容器默认**不会删除**挂载的卷与 bind mount,数据保留;如需清理,单独删除[存储卷](/guide/usage/volumes)。
:::
