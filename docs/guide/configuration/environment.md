---
title: 环境变量与启动参数
description: DockOrae 全部环境变量与命令行参数 — 默认值、说明与使用示例。
---

# 环境变量与启动参数

## 命令行参数

二进制方式启动时可使用命令行参数(**优先级高于环境变量**):

| 参数    | 默认值                  | 说明     |
| ------- | ----------------------- | -------- |
| `-data` | `$DATA_DIR` 或 `./data` | 数据目录 |
| `-port` | `$PORT` 或 `8080`       | 监听端口 |

```bash
./dockorae -data /opt/docker-manager/data -port 9090
```

## 环境变量

### 核心变量

| 变量          | 默认值                               | 说明                                             |
| ------------- | ------------------------------------ | ------------------------------------------------ |
| `DATA_DIR`    | `./data`(二进制)/ `/data`(容器)      | 数据目录:SQLite 数据库、设置、用户、应用商店数据 |
| `PORT`        | `8080`                               | 面板监听端口                                     |
| `DOCKER_HOST` | `unix:///var/run/docker.sock`(Linux) | Docker daemon 地址                               |
| `TZ`          | —                                    | 容器时区(Compose 部署时设置,如 `Asia/Shanghai`)  |

```bash
DATA_DIR=/opt/docker-manager/data PORT=8080 docker-manager-go
```

### 应用商店

| 变量               | 默认值                   | 说明                             |
| ------------------ | ------------------------ | -------------------------------- |
| `DM_APPSTORE_REPO` | `DockOrae/DockOrae-Apps` | 应用商店数据仓库(内网镜像时覆盖) |
| `DM_APPSTORE_URL`  | —                        | 应用商店数据包下载地址(离线环境) |

### 许可证

| 变量                    | 默认值                                     | 说明                                        |
| ----------------------- | ------------------------------------------ | ------------------------------------------- |
| `DM_LICENSE_SERVER_URL` | `https://manager.kejizero.xyz/license-api` | License Server 基础地址;空字符串 = 离线模式 |

### 在线更新

| 变量             | 默认值              | 说明                                                                              |
| ---------------- | ------------------- | --------------------------------------------------------------------------------- |
| `DM_DEPLOY_MODE` | 自动检测            | 强制指定部署方式:`compose` 或 `binary`(面板自动判断:容器内 = compose,否则 binary) |
| `DM_UPDATE_API`  | GitHub Releases API | 更新检测接口覆盖(测试用)                                                          |

## 一键脚本环境变量

`install.sh` 还支持安装期变量(仅安装时生效):

| 变量             | 默认值                          | 说明                          |
| ---------------- | ------------------------------- | ----------------------------- |
| `DM_PORT`        | `8080`                          | 面板端口                      |
| `DM_INSTALL_DIR` | `/opt/docker-manager`           | 安装目录                      |
| `DM_DATA_DIR`    | `$DM_INSTALL_DIR/data`          | 数据目录                      |
| `DM_IMAGE`       | `zhaoweiwen123/dockorae:latest` | Compose 方式镜像              |
| `DM_MODE`        | 交互选择                        | 安装方式 `compose` / `binary` |
| `DM_PRIVILEGED`  | `false`                         | 特权模式(仅 Compose)          |
| `DM_FORCE`       | —                               | `1` = 强制覆盖重装            |
| `DM_PUBLIC_IP`   | 自动检测                        | 手动指定公网 IP(SSL 校验)     |

详见[一键安装脚本](/guide/installation/script#环境变量)。

## 优先级规则

```
命令行参数 > 环境变量 > 配置文件 > 默认值
```

- `-data` 覆盖 `DATA_DIR` 覆盖默认 `/data`
- `-port` 覆盖 `PORT` 覆盖默认 `8080`
- 面板内(UI)修改的端口保存在 SQLite 设置中,优先于环境变量(重启面板生效)

::: warning
`webPort`(面板设置)修改后**重启面板生效**;`webListen`(监听 IP)、安全入口(`webBasePath`)同理。见[面板设置](/guide/configuration/panel)。
:::
