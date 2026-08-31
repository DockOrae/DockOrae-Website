---
title:
  en: Docker Compose Installation
  zh-CN: Docker Compose 安装
description:
  en: Deploy DockOrae with Docker Compose — full compose configuration, line-by-line explanation of common commands, and data persistence notes.
  zh-CN: 使用 Docker Compose 部署 DockOrae — 完整 compose 配置、常用命令逐条解释、数据持久化说明。
categories:
  - guide
  - installation
top: 98000
---

:::: en

Docker Compose is the **preferred way to deploy on servers**: image-based, centralized configuration, and easy updates and rollbacks.

## Prerequisites { lang="en" }

- **Docker Engine** and the **Compose plugin** installed (`docker compose version` can verify)
- Works on all Linux distributions that can run Docker

## Option 1: Use the Config Bundled with the Repository (Recommended) { lang="en" }

The DockOrae repository ships a complete `docker-compose.yml` — download and use it directly:

```bash
mkdir -p /opt/docker-manager && cd /opt/docker-manager
curl -fsSL https://raw.githubusercontent.com/DockOrae/DockOrae/master/docker-compose.yml -o docker-compose.yml
```

## Option 2: Create It Manually { lang="en" }

Create `docker-compose.yml` (full configuration, adjust as needed):

```yaml
services:
  dockorae:
    image: dockorae/dockorae:latest
    container_name: dockorae
    restart: unless-stopped

    # ---- Port mapping ----
    # Default HTTP access: http://<server-ip>:8080
    ports:
      - '8080:8080'
      # After binding an HTTPS domain (Panel → Settings → General → Certificate):
      #   Comment out the 8080 line above and enable the line below to access https://domain directly (no port number needed)
      # - "443:8080"
      # Local access only (not exposed externally; use when the panel itself sits behind a reverse proxy):
      # - "127.0.0.1:8080:8080"

    # ---- Environment variables ----
    environment:
      - DATA_DIR=/data # Panel data directory (SQLite database, settings, users, app store data)
      - PORT=8080 # Panel listening port
      - TZ=Asia/Shanghai # Container timezone
      # Remote Docker host: the panel operates a remote daemon directly (also comment out the docker.sock mount)
      # - DOCKER_HOST=tcp://<host>:2375
      # App store data repository/download URL override (intranet mirror, offline environment):
      # - DM_APPSTORE_REPO=DockOrae/DockOrae-Apps
      # - DM_APPSTORE_URL=https://<intranet-mirror>/docker-manager-apps.tar.gz

    # ---- Data volumes ----
    volumes:
      # Docker daemon socket: the entry point for the panel to manage the local Docker, must be mounted
      - /var/run/docker.sock:/var/run/docker.sock
      # Panel data (database, settings, users, app store data)
      - ./data:/data
      # HTTPS certificate directory (put fullchain.pem / privkey.pem here after binding a domain)
      - ./cert:/data/cert:ro
      # Host root filesystem (read-only): online updates use it to locate the host docker-compose.yml, image acceleration reads/writes the host daemon.json
      - /:/host:ro
      # Host Docker configuration: the panel's "Image Acceleration" reads/writes this file (daemon.json)
      - /etc/docker:/host/etc/docker:ro
```

> Other optional settings (privileged mode, resource limits, health checks, custom networks, etc.) are documented in the comments of the repository's `docker-compose.yml`.

## Start { lang="en" }

```bash
docker compose up -d
```

- `up` — Create and start the service
- `-d` — Run in the background

The image is pulled automatically on first start. After starting, visit `http://<server-ip>:8080`; the default credentials are `admin / 123456`.

## Check Status { lang="en" }

```bash
docker compose ps
```

## View Logs { lang="en" }

```bash
docker compose logs -f
```

- `logs` — Output container logs
- `-f` — Follow continuously (press `Ctrl+C` to exit)

## Stop / Start / Restart { lang="en" }

```bash
docker compose stop

# Start again
docker compose start

# Restart
docker compose restart

# Stop and remove containers (the ./data data directory is preserved)
docker compose down
```

::: tip `stop` vs `down`

- `docker compose stop` — only stops containers, keeps containers and networks; `start` can resume
- `docker compose down` — removes containers and networks, **does not delete** the `./data` data directory

:::

## Update { lang="en" }

```bash
# Pull the latest image and rebuild the containers
docker compose pull
docker compose up -d
```

- `pull` — Pull the new image version
- `up -d` — Automatically rebuild containers when an image change is detected

Or with a single command:

```bash
docker compose up -d --pull always
```

::: tip
The panel has built-in [online update](/guide/update/panel) — complete it with one click in the panel, no need to log into the server.

:::

## Data Persistence { lang="en" }

```
Host                              Container
┌──────────────────┐        ┌──────────────┐
│ /opt/docker-     │ ────▶ │ /data        │
│ manager/data     │  bind  │ (all panel   │
│ (./data)         │  mount │  data)       │
└──────────────────┘        └──────────────┘
```

- Data is stored on the host in `./data` (the directory where you run `docker compose`) via a **bind mount**
- **Removing the containers (`down`) does not delete the data** — data always stays in the host directory

```bash
# Backing up data = packing the ./data directory
tar -czf dm-backup.tar.gz -C /opt/docker-manager/data .

# Permanently deleting data (be careful!)
rm -rf /opt/docker-manager/data
```

For more backup methods, see [Backup and Restore](/guide/backup).

## FAQ { lang="en" }

**Compose fails to start?** Check the logs to find the cause:

```bash
docker compose logs --tail 50
```

**Remote Docker host?** Set `DOCKER_HOST=tcp://<host>:2375` in `environment` and comment out the docker.sock mount.

## Uninstall { lang="en" }

```bash
docker compose down          # Stop and remove containers
rm -rf /opt/docker-manager   # Delete the compose file and data directory (be careful!)
```

See the [uninstall documentation](/guide/uninstall/docker).

::::
:::: zh-CN

Docker Compose 是**服务器部署的首选方式**:基于镜像、配置集中、更新与回滚方便。

## 前置条件 { lang="zh-CN" }

- 已安装 **Docker Engine** 与 **Compose 插件**(`docker compose version` 可验证)
- 支持所有运行 Docker 的 Linux 发行版

## 方式一:使用仓库自带配置(推荐) { lang="zh-CN" }

DockOrae 仓库内置了完整的 `docker-compose.yml`,直接下载使用:

```bash
mkdir -p /opt/docker-manager && cd /opt/docker-manager
curl -fsSL https://raw.githubusercontent.com/DockOrae/DockOrae/master/docker-compose.yml -o docker-compose.yml
```

## 方式二:手动创建 { lang="zh-CN" }

创建 `docker-compose.yml`(完整配置,按需调整):

```yaml
services:
  dockorae:
    image: dockorae/dockorae:latest
    container_name: dockorae
    restart: unless-stopped

    # ---- 端口映射 ----
    # 默认 HTTP 访问: http://<服务器IP>:8080
    ports:
      - '8080:8080'
      # HTTPS 域名绑定后(面板 设置 → 常规 → 证书):
      #   注释掉上面的 8080 一行,启用下面这行,即可 https://域名 直访(无需端口号)
      # - "443:8080"
      # 仅本机访问(不对外暴露,面板自己走反向代理时用):
      # - "127.0.0.1:8080:8080"

    # ---- 环境变量 ----
    environment:
      - DATA_DIR=/data # 面板数据目录(SQLite 数据库、设置、用户、应用商店数据)
      - PORT=8080 # 面板监听端口
      - TZ=Asia/Shanghai # 容器时区
      # 远程 Docker 主机:面板直接操作远程 daemon(同时注释掉 docker.sock 挂载)
      # - DOCKER_HOST=tcp://<host>:2375
      # 应用商店数据仓库/下载地址覆盖(内网镜像、离线环境):
      # - DM_APPSTORE_REPO=DockOrae/DockOrae-Apps
      # - DM_APPSTORE_URL=https://<内网镜像>/docker-manager-apps.tar.gz

    # ---- 数据卷 ----
    volumes:
      # Docker 守护进程 socket:面板管理本机 Docker 的入口,必须挂载
      - /var/run/docker.sock:/var/run/docker.sock
      # 面板数据(数据库、设置、用户、应用商店数据)
      - ./data:/data
      # HTTPS 证书目录(域名绑定后把 fullchain.pem / privkey.pem 放这里)
      - ./cert:/data/cert:ro
      # 宿主机根文件系统(只读):在线更新经它定位宿主 docker-compose.yml,镜像加速读写宿主 daemon.json
      - /:/host:ro
      # 宿主机 Docker 配置:面板「镜像加速」读写此文件(daemon.json)
      - /etc/docker:/host/etc/docker:ro
```

> 其他可选配置(特权模式、资源限制、健康检查、自定义网络等)见仓库 `docker-compose.yml` 中的注释说明。

## 启动 { lang="zh-CN" }

```bash
docker compose up -d
```

- `up` — 创建并启动服务
- `-d` — 后台运行

首次启动会自动拉取镜像。启动后访问 `http://<服务器IP>:8080`,默认账号 `admin / 123456`。

## 查看状态 { lang="zh-CN" }

```bash
docker compose ps
```

## 查看日志 { lang="zh-CN" }

```bash
docker compose logs -f
```

- `logs` — 输出容器日志
- `-f` — 持续跟踪(按 `Ctrl+C` 退出)

## 停止 / 启动 / 重启 { lang="zh-CN" }

```bash
docker compose stop

# 再次启动
docker compose start

# 重启
docker compose restart

# 停止并删除容器(数据目录 ./data 保留)
docker compose down
```

::: tip `stop` vs `down` 的区别

- `docker compose stop` — 仅停止容器,保留容器与网络,`start` 可恢复
- `docker compose down` — 删除容器与网络,**不会删除** `./data` 数据目录

:::

## 更新 { lang="zh-CN" }

```bash
# 拉取最新镜像并重建容器
docker compose pull
docker compose up -d
```

- `pull` — 拉取新版本镜像
- `up -d` — 检测到镜像变化时自动重建容器

或者一条命令:

```bash
docker compose up -d --pull always
```

::: tip
面板内置[在线更新](/guide/update/panel),在面板中一键完成,无需登录服务器。

:::

## 数据持久化 { lang="zh-CN" }

```
宿主机                         容器内
┌──────────────────┐        ┌──────────────┐
│ /opt/docker-     │ ────▶ │ /data        │
│ manager/data     │  bind  │ (全部面板数据) │
│ (./data)         │  mount │              │
└──────────────────┘        └──────────────┘
```

- 数据通过 **bind mount** 保存在宿主机 `./data`(即你执行 `docker compose` 的目录下)
- **删除容器(`down`)不会删除数据** —— 数据始终在宿主机目录中

```bash
# 备份数据 = 打包 ./data 目录
tar -czf dm-backup.tar.gz -C /opt/docker-manager/data .

# 彻底删除数据(谨慎!)
rm -rf /opt/docker-manager/data
```

更多备份方法见[备份与恢复](/guide/backup)。

## 常见问题 { lang="zh-CN" }

**Compose 启动失败?** 查看日志定位原因:

```bash
docker compose logs --tail 50
```

**远程 Docker 主机?** 在 `environment` 中设置 `DOCKER_HOST=tcp://<host>:2375`,并注释掉 docker.sock 挂载。

## 卸载 { lang="zh-CN" }

```bash
docker compose down          # 停止并删除容器
rm -rf /opt/docker-manager   # 删除 compose 文件与数据目录(谨慎!)
```

详见[卸载文档](/guide/uninstall/docker)。

::::
