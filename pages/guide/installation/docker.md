---
title:
  en: Docker Installation
  zh-CN: Docker 安装
description:
  en: Install DockOrae with a single docker run command — port, data volume, Docker Socket notes and container management commands.
  zh-CN: 使用 docker run 单命令安装 DockOrae — 端口、数据卷、Docker Socket 说明与容器管理命令。
categories:
  - guide
  - installation
top: 98500
---

::: en

Start DockOrae quickly with the Docker CLI. This is the simplest installation method, ideal for a quick trial.

## Prerequisites

- **Docker Engine** (Linux) or **Docker Desktop** (Windows / macOS) installed
- Docker version 20.10 or later is recommended

::: note
The panel container itself runs on Docker, while the Docker environment it manages is determined by the mounted Docker Socket — whichever daemon's socket you mount is the daemon it manages. By default the host's `/var/run/docker.sock` is mounted, so it manages the local Docker daemon.
:::

## Start the Container

```bash
docker run -d --name docker-manager-go \
  -p 8080:8080 \
  -v /var/run/docker.sock:/var/run/docker.sock \
  -v docker-manager-data:/data \
  dockorae/dockorae:latest
```

| Parameter                      | Description                                                                                      |
| ------------------------------ | ------------------------------------------------------------------------------------------------ |
| `-d`                           | Run in the background                                                                            |
| `--name docker-manager-go`     | Container name, used by subsequent management commands                                           |
| `-p 8080:8080`                 | Port mapping: host 8080 → container 8080                                                         |
| `-v /var/run/docker.sock:...`  | **Required**. Mounts the Docker Socket; the panel communicates with the Docker daemon through it |
| `-v docker-manager-data:/data` | **Data volume**. Persists the panel's data (SQLite database, settings, users, app store data)    |
| `dockorae/dockorae:latest`     | Official image (multi-architecture image on Docker Hub)                                          |

After starting, visit in your browser:

```
http://<server-ip>:8080
```

The default credentials are `admin / 123456` — please [change the password](/guide/configuration/panel) immediately after logging in.

## View Container Status

```bash
docker ps
```

The panel container is named `docker-manager-go` and its status should be `Up`.

## View Logs

```bash
docker logs docker-manager-go
```

To follow the logs continuously:

```bash
docker logs -f docker-manager-go
```

## Stop / Start / Restart

```bash
docker stop docker-manager-go

# Start again
docker start docker-manager-go

# Restart
docker restart docker-manager-go
```

## Update

```bash
# 1. Pull the latest image
docker pull dockorae/dockorae:latest

# 2. Stop and remove the old container (data lives in the volume and is unaffected)
docker stop docker-manager-go
docker rm docker-manager-go

# 3. Recreate with the same parameters
docker run -d --name docker-manager-go \
  -p 8080:8080 \
  -v /var/run/docker.sock:/var/run/docker.sock \
  -v docker-manager-data:/data \
  dockorae/dockorae:latest
```

::: tip An easier way to update
The panel has a built-in [online update](/guide/update/panel) — just click it in **Settings → Update** to finish, no need to run the commands above manually.
:::

## Data Persistence

```
Host (local machine)    Container
┌────────────────┐       ┌──────────────────┐
│ Docker Volume  │ ────▶ │ /data            │
│ docker-manager-│       │ ├─ docker-manager│
│ data           │       │ │  .db(SQLite)  │
└────────────────┘       │ ├─ config.json   │
                         │ ├─ license.json  │
                         │ └─ ...           │
                         └──────────────────┘
```

- All of the panel's data (database, settings, users, app store data) is stored in the **Docker volume** `docker-manager-data`
- **Deleting the container does not delete the data** — `docker rm` only removes the container; the volume remains

```bash
# View the volume
docker volume inspect docker-manager-data

# Permanently delete the data (caution! irreversible)
docker volume rm docker-manager-data
```

::: warning Docker Socket permissions
Mounting `/var/run/docker.sock` means the container has full control over the Docker daemon, equivalent to root privileges. Do not expose the panel container or port to the public internet casually. Recommended:

- Restrict the source IPs allowed to reach port 8080 with a firewall
- Set a [security entry](/guide/configuration/panel) and a [strong password](/guide/configuration/panel)
- For public access, prefer [binding a domain with HTTPS](/guide/configuration/https)
  :::

## Uninstall

Remove the container:

```bash
docker stop docker-manager-go
docker rm docker-manager-go
```

To delete the data as well, see the [uninstall documentation](/guide/uninstall/docker).
:::

::: zh-CN

使用 Docker CLI 快速启动 DockOrae。这是最简单的安装方式,适合快速体验。

## 前置条件

- 已安装 **Docker Engine**(Linux)或 **Docker Desktop**(Windows / macOS)
- Docker 版本建议 20.10 以上

::: note
面板容器本身运行在 Docker 上,而它管理的 Docker 环境由挂载的 Docker Socket 决定 —— 即挂载哪个 daemon 的 socket,就管理哪个 daemon。默认挂载本机 `/var/run/docker.sock`,即管理本机 Docker。
:::

## 启动容器

```bash
docker run -d --name docker-manager-go \
  -p 8080:8080 \
  -v /var/run/docker.sock:/var/run/docker.sock \
  -v docker-manager-data:/data \
  dockorae/dockorae:latest
```

| 参数                           | 说明                                                                    |
| ------------------------------ | ----------------------------------------------------------------------- |
| `-d`                           | 后台运行                                                                |
| `--name docker-manager-go`     | 容器名称,后续管理命令使用                                               |
| `-p 8080:8080`                 | 映射端口:宿主 8080 → 容器 8080                                          |
| `-v /var/run/docker.sock:...`  | **必须**。挂载 Docker Socket,面板通过它与 Docker daemon 通信            |
| `-v docker-manager-data:/data` | **数据卷**。面板数据(SQLite 数据库、设置、用户、应用商店数据)持久化位置 |
| `dockorae/dockorae:latest`     | 官方镜像(Docker Hub 多架构镜像)                                         |

启动后浏览器访问:

```
http://<服务器IP>:8080
```

默认账号 `admin / 123456`,登录后请立即[修改密码](/guide/configuration/panel)。

## 查看容器状态

```bash
docker ps
```

面板容器名为 `docker-manager-go`,状态应为 `Up`。

## 查看日志

```bash
docker logs docker-manager-go
```

持续跟踪日志:

```bash
docker logs -f docker-manager-go
```

## 停止 / 启动 / 重启

```bash
docker stop docker-manager-go

# 再次启动
docker start docker-manager-go

# 重启
docker restart docker-manager-go
```

## 更新

```bash
# 1. 拉取最新镜像
docker pull dockorae/dockorae:latest

# 2. 停止并删除旧容器(数据在卷中,不受影响)
docker stop docker-manager-go
docker rm docker-manager-go

# 3. 用相同参数重新创建
docker run -d --name docker-manager-go \
  -p 8080:8080 \
  -v /var/run/docker.sock:/var/run/docker.sock \
  -v docker-manager-data:/data \
  dockorae/dockorae:latest
```

::: tip 更简单的更新方式
面板内置[在线更新](/guide/update/panel),在 **设置 → 更新** 一键完成,无需手动执行上述命令。
:::

## 数据持久化

```
宿主(本机)                容器内
┌────────────────┐       ┌──────────────────┐
│ Docker Volume  │ ────▶ │ /data            │
│ docker-manager-│       │ ├─ docker-manager│
│ data           │       │ │  .db(SQLite)  │
└────────────────┘       │ ├─ config.json   │
                         │ ├─ license.json  │
                         │ └─ ...           │
                         └──────────────────┘
```

- 面板的全部数据(数据库、设置、用户、应用商店数据)都保存在 **Docker 卷** `docker-manager-data` 中
- **删除容器不会删除数据** —— `docker rm` 只删除容器,卷仍然保留

```bash
# 查看卷
docker volume inspect docker-manager-data

# 彻底删除数据(谨慎!不可恢复)
docker volume rm docker-manager-data
```

::: warning Docker Socket 权限
挂载 `/var/run/docker.sock` 意味着容器拥有对 Docker daemon 的完整控制权,等价于 root 权限。请勿将面板容器或端口随意暴露到公网,建议:

- 通过防火墙限制 8080 端口的来源 IP
- 设置[安全入口](/guide/configuration/panel)与[强密码](/guide/configuration/panel)
- 如需公网访问,优先[绑定域名与 HTTPS](/guide/configuration/https)
  :::

## 卸载

删除容器:

```bash
docker stop docker-manager-go
docker rm docker-manager-go
```

如需同时删除数据,见[卸载文档](/guide/uninstall/docker)。
:::
