---
title: Compose 更新
description: 手动更新 Docker Compose / Docker 方式部署的 DockOrae。
---

# Compose 更新

适用于 **Docker Compose** 与 **Docker** 两种方式部署的面板。

## Docker Compose 方式

```bash
# 1. 拉取最新镜像
docker compose pull

# 2. 重建容器(检测到新镜像自动重建)
docker compose up -d
```

也可以一步完成:

```bash
docker compose up -d --pull always
```

| 命令                   | 作用                                        |
| ---------------------- | ------------------------------------------- |
| `docker compose pull`  | 拉取 `latest` 最新镜像                      |
| `docker compose up -d` | 镜像有变化时自动重建容器;无变化则不做任何事 |
| `--pull always`        | 强制每次启动前拉取最新镜像                  |

更新后验证:

```bash
docker compose ps              # 容器状态 Up
docker compose logs --tail 20  # 查看面板启动日志
```

## Docker 方式

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

::: tip 参数保持一致
重建容器时**务必使用与之前相同的挂载与端口参数**,否则数据目录或访问方式会改变。不确定的话,先 `docker inspect docker-manager-go` 查看原参数。
:::

## 更新后

- 打开面板,页脚版本号应为新版本
- 检查数据是否完好(容器、设置、应用商店数据)
- 更新不修改数据目录,无需担心数据丢失
