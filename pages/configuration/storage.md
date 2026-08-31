---
title:
  en: Data Directory & Persistence
  zh-CN: 数据目录与持久化
description:
  en: DockOrae data storage structure, Docker Socket explanation and security risks, and data persistence best practices.
  zh-CN: DockOrae 数据存储结构、Docker Socket 说明与安全风险、数据持久化最佳实践。
categories:
  - configuration
top: 83500
---

:::: en

## Data Directory Structure { lang="en" }

Panel data is uniformly stored in the data directory (`/data` inside the container):

```
/data
├── docker-manager.db     # SQLite database (users, settings, events)
├── config.json           # JWT secret (auto-generated)
├── license.json          # License activation token
├── cert/                 # HTTPS certificates (mounted from host ./cert in compose mode)
└── ...                   # App store data, etc.
```

| Installation method        | Host data location                                 |
| -------------------------- | -------------------------------------------------- |
| One-click script (compose) | `/opt/docker-manager/data`                         |
| One-click script (binary)  | `/opt/docker-manager/data`                         |
| Manual compose             | `./data` (directory of the compose file)           |
| Manual docker run          | Docker volume `docker-manager-data`                |
| Manual binary              | `DATA_DIR` environment variable (default `./data`) |

## How Data Persistence Works { lang="en" }

```
Host storage (where the data actually lives)
     │  volume / bind mount
     ▼
/data inside the container
     │
     ▼
SQLite / config / certificates / app store data
```

**Key takeaway: deleting the container ≠ deleting the data.**

- The container can be deleted, recreated, or upgraded at any time; as long as the volume or mounted directory still exists, the data is not lost
- Before upgrading / uninstalling, confirm the data directory location and back it up or keep it

## Docker Socket { lang="en" }

The panel communicates with the Docker daemon through the Docker Socket:

```
DockOrae (container)
   ↓ mounts /var/run/docker.sock
Docker API
   ↓
Docker Engine
```

- **Linux**: `/var/run/docker.sock` (must be mounted for compose and docker run modes)
- **Binary mode**: the panel accesses the local socket directly; no mounting needed
- **Remote daemon**: set `DOCKER_HOST=tcp://<host>:2375` (and do not mount the socket)

::: danger Security warning
`/var/run/docker.sock` grants **full control over the Docker daemon, equivalent to root access on the host**. Do not:

- Expose the panel's 8080 port directly to the public internet (use a firewall to restrict source IPs or put an HTTPS reverse proxy in front)
- Mount docker.sock into untrusted containers

This is the common security model of the Docker ecosystem (the same as panels like Portainer); take it seriously.

:::

### Docker rootless { lang="en" }

The socket of rootless Docker lives in the user directory:

```yaml
volumes:
  - /run/user/1000/docker.sock:/var/run/docker.sock
```

## Backing Up Data { lang="en" }

Backup = archiving the data directory:

```bash
sudo bash install.sh backup        # generates into /opt/docker-manager/backups/

# Manual (compose mode)
tar -czf dm-backup.tar.gz -C /opt/docker-manager/data .

# Manual (docker run mode, volume)
docker run --rm -v docker-manager-data:/data -v $(pwd):/backup alpine \
  tar -czf /backup/dm-backup.tar.gz -C /data .
```

See [Backup & Restore](/guide/backup) for restore instructions and more details.

## Cleaning Up Data { lang="en" }

Permanently delete all data (be careful — this cannot be undone):

```bash
# Script install
sudo rm -rf /opt/docker-manager/data

# docker run install
docker volume rm docker-manager-data

# compose install
rm -rf ./data
```

::::
:::: zh-CN

## 数据目录结构 { lang="zh-CN" }

面板数据统一存放在数据目录(容器内 `/data`):

```
/data
├── docker-manager.db     # SQLite 数据库(用户、设置、事件)
├── config.json           # JWT 密钥(自动生成)
├── license.json          # 许可证激活令牌
├── cert/                 # HTTPS 证书(compose 方式挂载自宿主机 ./cert)
└── ...                   # 应用商店数据等
```

| 安装方式          | 宿主机数据位置                     |
| ----------------- | ---------------------------------- |
| 一键脚本(compose) | `/opt/docker-manager/data`         |
| 一键脚本(二进制)  | `/opt/docker-manager/data`         |
| 手动 compose      | `./data`(compose 文件所在目录)     |
| 手动 docker run   | Docker 卷 `docker-manager-data`    |
| 手动二进制        | `DATA_DIR` 环境变量(默认 `./data`) |

## 数据持久化原理 { lang="zh-CN" }

```
宿主机存储(数据真正所在)
     │  volume / bind mount
     ▼
容器内 /data
     │
     ▼
SQLite / 配置 / 证书 / 应用商店数据
```

**核心结论:删除容器 ≠ 删除数据。**

- 容器随时可以删除、重建、升级,只要卷或挂载目录还在,数据就不会丢
- 升级 / 卸载前确认数据目录位置,备份或保留它

## Docker Socket { lang="zh-CN" }

面板通过 Docker Socket 与 Docker daemon 通信:

```
DockOrae(容器)
   ↓ 挂载 /var/run/docker.sock
Docker API
   ↓
Docker Engine
```

- **Linux**:`/var/run/docker.sock`(必须挂载,compose 与 docker run 方式)
- **二进制方式**:面板直接访问本机 socket,无需挂载
- **远程 daemon**:设置 `DOCKER_HOST=tcp://<host>:2375`(同时不要挂载 socket)

::: danger 安全警告
`/var/run/docker.sock` 拥有对 Docker daemon 的**完整控制权,等价于宿主机 root 权限**。请勿:

- 将面板的 8080 端口直接暴露到公网(建议防火墙限制来源 IP 或走 HTTPS 反代)
- 将 docker.sock 挂载到不可信容器

这是 Docker 生态的通用安全模型(与 Portainer 等面板相同),务必重视。

:::

### Docker rootless { lang="zh-CN" }

rootless Docker 的 socket 位于用户目录:

```yaml
volumes:
  - /run/user/1000/docker.sock:/var/run/docker.sock
```

## 备份数据 { lang="zh-CN" }

备份 = 打包数据目录:

```bash
sudo bash install.sh backup        # 生成到 /opt/docker-manager/backups/

# 手动(compose 方式)
tar -czf dm-backup.tar.gz -C /opt/docker-manager/data .

# 手动(docker run 方式,卷)
docker run --rm -v docker-manager-data:/data -v $(pwd):/backup alpine \
  tar -czf /backup/dm-backup.tar.gz -C /data .
```

恢复与更多说明见[备份与恢复](/guide/backup)。

## 清理数据 { lang="zh-CN" }

彻底删除所有数据(谨慎,不可恢复):

```bash
# 脚本安装
sudo rm -rf /opt/docker-manager/data

# docker run 安装
docker volume rm docker-manager-data

# compose 安装
rm -rf ./data
```

::::
