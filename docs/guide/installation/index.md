---
title: 安装方式对比
description: DockOrae 四种安装方式(Docker / Docker Compose / 二进制 / 一键脚本)对比与选择建议。
---

# 安装 DockOrae

DockOrae 提供四种安装方式,按推荐程度排序:

| 安装方式                                             | 适合场景                  | 难度 | 更新方式                       | 说明                                                    |
| ---------------------------------------------------- | ------------------------- | ---- | ------------------------------ | ------------------------------------------------------- |
| [一键安装脚本](/guide/installation/script)           | 大多数 Linux 用户         | ⭐   | `bash install.sh update`       | 交互式安装,自动检测网络与架构,可选 Compose / 二进制方式 |
| [Docker Compose](/guide/installation/docker-compose) | VPS / 服务器部署          | ⭐   | `docker compose pull && up -d` | 基于镜像,易于更新与回滚                                 |
| [Docker](/guide/installation/docker)                 | 快速体验 / 单机           | ⭐   | 重新拉取镜像重建容器           | 单条 `docker run` 命令启动                              |
| [二进制](/guide/installation/binary)                 | 无 Docker 环境 / 高级用户 | ⭐⭐ | 替换二进制并重启               | 无需 Docker,直接运行                                    |

::: tip 推荐
**服务器部署首选 [一键脚本](/guide/installation/script) 或 [Docker Compose](/guide/installation/docker-compose)**:

- 基于镜像运行,更新、回滚简单
- 数据存放在宿主机目录,便于备份
- 面板内置的[在线更新](/guide/update/panel)对这两种部署方式支持最完善
  :::

## 支持平台

| 平台             | amd64 | arm64 | armv7 | armv6 | armv5 | 386 | s390x |
| ---------------- | ----- | ----- | ----- | ----- | ----- | --- | ----- |
| Docker 镜像      | ✅    | ✅    | ✅    | ✅    | —     | —   | ✅    |
| 二进制(直接运行) | ✅    | ✅    | ✅    | ✅    | ✅    | ✅  | ✅    |

- **面板运行环境**:Linux(生产);Windows 仅用于开发
- **镜像架构**:`linux/amd64`、`linux/arm64`、`linux/arm/v7`、`linux/arm/v6`、`linux/s390x`
- 二进制可运行在 x86 与 ARM 的各类 Linux 发行版上(需 systemd 或前台运行)

## 选择建议

| 你的情况                     | 推荐方式                                                                                       |
| ---------------------------- | ---------------------------------------------------------------------------------------------- |
| 有一台 Linux VPS / 服务器    | [一键脚本](/guide/installation/script) 或 [Docker Compose](/guide/installation/docker-compose) |
| 想先快速体验                 | [Docker](/guide/installation/docker) 单命令启动                                                |
| 服务器上没有 Docker,也不想装 | [二进制](/guide/installation/binary) 或脚本的二进制方式                                        |
| 服务器在国内,网络受限        | [一键脚本](/guide/installation/script)(自动使用国内加速源)                                     |
| 树莓派 / ARM 设备            | 一键脚本或二进制(自动检测架构)                                                                 |

## 通用信息

无论哪种方式,以下事实保持不变:

- **默认端口**:`8080`
- **默认账号**:`admin / 123456`(首次登录后请立即修改)
- **数据目录**:容器内 `/data`;宿主机位置取决于安装方式(见[数据目录与持久化](/guide/configuration/storage))
- **Docker Socket**:`/var/run/docker.sock`,面板管理 Docker 的入口,必须挂载(二进制方式直接访问)
- **镜像**:`dockorae/dockorae:latest`([Docker Hub](https://hub.docker.com/r/dockorae/dockorae))
