---
title:
  en: Image Management
  zh-CN: 镜像管理
description:
  en: Pull images (with real-time progress), build from a Dockerfile, delete and clean up unused images.
  zh-CN: 拉取镜像(实时进度)、从 Dockerfile 构建、删除与清理未使用的镜像。
categories:
  - guide
  - usage
top: 95000
---

::: en

Go to the **Images** page to manage Docker images.

## Image List

Displays the image name, tag, size, and creation time. Supports filtering by name search.

## Pulling Images

Click **Pull** and enter the image name (e.g. `nginx:latest`, `mysql:8.0`):

- Shows **real-time pull progress** (layer download progress bars)
- On slow networks, speed up pulls by configuring a [registry mirror](/guide/configuration/panel#registry-mirror)

## Building from a Dockerfile

The panel supports building images by uploading a Dockerfile directly:

1. Click **Build**
2. Fill in the image name and the Dockerfile content (or upload one)
3. After submitting, the build log is displayed in real time

## Deleting Images

- **Delete individually** — use the action button in the list to delete a specific image
- **Clean up unused images** — one-click cleanup of dangling images (images with no tag and not used by any container)

::: warning
Before deleting an image, make sure no running container depends on it; otherwise the container will fail to start.
:::

## Viewing Details

Click an image to view its details: tags, architecture, layers, size, and creation history.

## FAQ

**Pull timeout / slow downloads?** Configure a [registry mirror](/guide/configuration/panel#registry-mirror), or check the network from the server to Docker Hub.

**Deleting an image reports "image is being used"?** A container is currently using the image. Stop and delete the related containers first.
:::

::: zh-CN

进入 **镜像** 页面,管理 Docker 镜像。

## 镜像列表

显示镜像名称、标签、大小、创建时间。支持按名称搜索过滤。

## 拉取镜像

点击 **拉取**,输入镜像名(如 `nginx:latest`、`mysql:8.0`):

- 显示**实时拉取进度**(分层下载进度条)
- 国内网络可在[镜像加速](/guide/configuration/panel#镜像加速)配置加速源后提速

## 从 Dockerfile 构建

面板支持直接上传 Dockerfile 构建镜像:

1. 点击 **构建**
2. 填写镜像名称与 Dockerfile 内容(或上传)
3. 提交后实时显示构建日志

## 删除镜像

- **单个删除** — 列表操作按钮删除指定镜像
- **清理未使用镜像** — 一键清理悬空镜像(dangling images,无标签且未被容器使用的镜像)

::: warning
删除镜像前请确认没有运行中的容器依赖它,否则容器将无法启动。
:::

## 查看详情

点击镜像查看详情:标签、架构、层(layers)、大小与创建历史。

## 常见问题

**拉取超时 / 下载慢?** 配置[镜像加速](/guide/configuration/panel#镜像加速),或检查服务器到 Docker Hub 的网络。

**删除镜像提示 "image is being used"?** 有容器正在使用该镜像,先停止并删除相关容器。
:::
