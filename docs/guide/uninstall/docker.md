---
title: Compose 卸载
description: 卸载 Docker Compose / Docker 方式部署的 DockOrae,以及数据清理说明。
---

# Compose 卸载

适用于 **Docker Compose** 与 **Docker** 方式部署的面板。

## Docker Compose 方式

```bash
cd /opt/docker-manager   # 你的 compose 目录

# 停止并删除容器(网络也一并删除)
docker compose down
```

- `down` 删除容器与网络
- **数据保留** —— `./data` 目录不受影响

如需删除程序文件:

```bash
# 删除 compose 文件与安装目录(数据目录 ./data 仍在)
rm -f docker-compose.yml
```

## Docker 方式

```bash
# 停止并删除容器
docker stop docker-manager-go
docker rm docker-manager-go
```

## 彻底删除数据

::: danger 不可恢复
以下操作会永久删除全部面板数据(SQLite 数据库、设置、用户、应用商店数据)。请确认已备份。
:::

```bash
# compose 方式:删除数据目录
rm -rf /opt/docker-manager/data

# docker run 方式:删除数据卷
docker volume rm docker-manager-data
```

## 完整卸载示例(compose)

```bash
cd /opt/docker-manager
docker compose down                      # 1. 停止并删除容器
rm -rf /opt/docker-manager               # 2. 删除程序文件与数据(谨慎)
```
