---
title:
  en: Compose Management
  zh-CN: Compose 管理
description:
  en: Manage Docker Compose stacks from the panel — YAML editor, one-click deployment, start/stop/down, and adopting external Compose projects.
  zh-CN: 使用面板管理 Docker Compose 栈 — YAML 编辑器、一键部署、启动/停止/拆除与接管外部 Compose。
categories:
  - guide
  - usage
top: 93500
---

::: en

Go to the **Compose** page to manage Docker Compose projects (stacks) directly in the panel.

## Compose Project List

Displays the project name, status (running / stopped), number of services, and the project directory. The panel only shows Compose projects **created or adopted by the panel** (project directories live under the panel's data directory).

## Creating a Compose Stack

Click **Create**, fill in the project name, paste the `docker-compose.yml` content (YAML editor with syntax highlighting), then click **Deploy**:

- **One-click deployment** — runs `compose up` directly, with the panel **streaming** deployment logs in real time
- If deployment fails, the logs clearly show the cause of the error (e.g. port conflict, image not found)

Example:

```yaml
services:
  nginx:
    image: nginx:latest
    container_name: nginx-test
    restart: unless-stopped
    ports:
      - '8081:80'
```

## Stack Operations

| Action       | Description                                                                         |
| ------------ | ----------------------------------------------------------------------------------- |
| Start        | `compose start`                                                                     |
| Stop         | `compose stop` (containers stop, the project is kept)                               |
| Delete       | `compose down` (removes containers and networks, the project configuration is kept) |
| View details | Service status, container list, and logs                                            |

## Adopting External Compose

If you already have a project deployed with `docker compose` on the host and want to manage it in the panel:

1. Click **Create** on the **Compose page**
2. Paste the content of the project's `docker-compose.yml`
3. Deploy with the same project name

The panel will **adopt** the project (marked as panel-managed), after which you can start, stop, and update it from the panel.

::: note
This is the only way to bring existing host resources under panel management — the panel does not automatically discover Compose projects deployed manually on the host.
:::

## FAQ

**Deployment fails with "port is already allocated"?** The port is occupied by another container. Change the port mapping, or stop the container that occupies the port first.

**Compose project out of sync with host files?** The panel treats the project configuration in its data directory as authoritative; manual changes on the host are not reflected in the panel (and vice versa). Keep management on one side only.
:::

::: zh-CN

进入 **Compose** 页面,在面板中直接管理 Docker Compose 项目(栈)。

## Compose 项目列表

显示项目名称、状态(运行中 / 已停止)、服务数量与所在目录。面板只显示**由面板创建或接管**的 Compose 项目(项目目录在面板数据目录下)。

## 创建 Compose 栈

点击 **创建**,填写项目名称并粘贴 `docker-compose.yml` 内容(YAML 编辑器,带语法高亮),点击 **部署**:

- **一键部署** — 直接执行 `compose up`,面板实时**流式输出**部署日志
- 部署失败时日志会明确显示错误原因(如端口冲突、镜像不存在)

示例:

```yaml
services:
  nginx:
    image: nginx:latest
    container_name: nginx-test
    restart: unless-stopped
    ports:
      - '8081:80'
```

## 栈操作

| 操作     | 说明                                        |
| -------- | ------------------------------------------- |
| 启动     | `compose start`                             |
| 停止     | `compose stop`(容器停止,项目保留)           |
| 删除     | `compose down`(删除容器与网络,项目配置保留) |
| 查看详情 | 服务状态、容器列表与日志                    |

## 接管外部 Compose

宿主机上已有 `docker compose` 部署的项目,如果想在面板中管理:

1. 在 **Compose 页面** 点击 **创建**
2. 粘贴该项目的 `docker-compose.yml` 内容
3. 使用相同项目名部署

面板会**接管**该项目(标记为面板管理),之后可在面板中启停与更新。

::: note
这是宿主机已有资源接入面板管理的唯一方式 —— 面板不会自动发现宿主机上手动部署的 Compose 项目。
:::

## 常见问题

**部署失败 "port is already allocated"?** 端口被其他容器占用,修改端口映射或先停止占用端口的容器。

**Compose 项目与宿主机文件不同步?** 面板以它数据目录内的项目配置为准;在宿主机手动改动不会反映到面板(反之亦然),保持单侧管理。
:::
