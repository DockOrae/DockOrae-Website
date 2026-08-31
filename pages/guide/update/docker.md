---
title:
  en: Compose Update
  zh-CN: Compose 更新
description:
  en: Manually update DockOrae deployed via Docker Compose / Docker.
  zh-CN: 手动更新 Docker Compose / Docker 方式部署的 DockOrae。
categories:
  - guide
  - update
top: 91500
---

:::: en

Applies to panels deployed via **Docker Compose** and **Docker**.

## Docker Compose Mode { lang="en" }

```bash
docker compose pull

# 2. Recreate the container (auto-recreated when a new image is detected)
docker compose up -d
```

Or do it in one step:

```bash
docker compose up -d --pull always
```

| Command                | Effect                                                                                   |
| ---------------------- | ---------------------------------------------------------------------------------------- |
| `docker compose pull`  | Pulls the latest `latest` image                                                          |
| `docker compose up -d` | Automatically recreates the container when the image has changed; does nothing otherwise |
| `--pull always`        | Forces pulling the latest image before every start                                       |

Verify after updating:

```bash
docker compose ps              # container status: Up
docker compose logs --tail 20  # view the panel startup logs
```

## Docker Mode { lang="en" }

```bash
# 1. Pull the latest image
docker pull dockorae/dockorae:latest

# 2. Stop and remove the old container (data is in the volume and is unaffected)
docker stop docker-manager-go
docker rm docker-manager-go

# 3. Recreate with the same arguments
docker run -d --name docker-manager-go \
  -p 8080:8080 \
  -v /var/run/docker.sock:/var/run/docker.sock \
  -v docker-manager-data:/data \
  dockorae/dockorae:latest
```

::: tip Keep the arguments identical
When recreating the container, **be sure to use the same mount and port arguments as before**, otherwise the data directory or access method will change. If you are unsure, first run `docker inspect docker-manager-go` to view the original arguments.

:::

## After Updating { lang="en" }

- Open the panel; the footer version number should show the new version
- Check that the data is intact (containers, settings, app store data)
- Updates do not modify the data directory; no need to worry about data loss

::::
:::: zh-CN

适用于 **Docker Compose** 与 **Docker** 两种方式部署的面板。

## Docker Compose 方式 { lang="zh-CN" }

```bash
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

## Docker 方式 { lang="zh-CN" }

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

## 更新后 { lang="zh-CN" }

- 打开面板,页脚版本号应为新版本
- 检查数据是否完好(容器、设置、应用商店数据)
- 更新不修改数据目录,无需担心数据丢失

::::
