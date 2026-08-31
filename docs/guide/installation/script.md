---
title: 一键安装脚本
description: DockOrae 官方一键安装脚本 — 安装、更新、卸载、SSL、备份恢复、密码重置等完整管理命令。
---

# 一键安装脚本

DockOrae 官方提供一键安装/管理脚本(`install.sh`),支持**安装、更新、卸载、SSL 证书、备份恢复、密码重置**等完整功能,是 Linux 上最省心的安装方式。

## 快速安装

```bash
bash <(curl -Ls https://raw.githubusercontent.com/DockOrae/DockOrae/master/install.sh)
```

脚本会:

1. 检测系统环境(仅支持 Linux,需要 root 权限)
2. 自动检测网络环境(国内自动使用加速源,海外直连)
3. 如未安装 Docker,**自动安装 Docker**(Debian / Ubuntu amd64 / arm64,最新稳定版)
4. 引导选择安装方式:
   - **1) Docker Compose 安装**(推荐)— 基于镜像,更新方便
   - **2) 本地二进制安装**(systemd)— 无需 Docker,自动检测架构
5. (可选)绑定域名并配置 HTTPS 证书

安装完成后输出面板地址、默认账号与数据目录。

## 常用命令

```bash
sudo bash install.sh install         # 安装(DM_MODE=compose|binary 强制方式,DM_FORCE=1 强制重装)
sudo bash install.sh ssl             # SSL 证书管理(域名绑定)
sudo bash install.sh update          # 更新
sudo bash install.sh uninstall       # 卸载(保留数据)
sudo bash install.sh start           # 启动
sudo bash install.sh stop            # 停止
sudo bash install.sh restart         # 重启
sudo bash install.sh status          # 查看状态
sudo bash install.sh backup          # 备份数据
sudo bash install.sh restore         # 恢复数据
sudo bash install.sh reset-passwd    # 重置密码为 admin / 123456
sudo bash install.sh info            # 查看安装信息
```

## 安装目录结构

默认安装目录为 `/opt/docker-manager`:

```
/opt/docker-manager/
├── docker-compose.yml      # Compose 方式:编排文件
├── docker-manager.service  # 二进制方式:systemd 服务文件
├── data/                   # 面板数据(SQLite 数据库、设置、用户)
├── cert/                   # HTTPS 证书目录(域名绑定后)
├── backups/                # backup 命令生成的备份
└── .install_mode           # 安装方式标记(compose / binary)
```

## 环境变量

脚本支持通过环境变量定制安装参数:

| 变量             | 默认值                          | 说明                           |
| ---------------- | ------------------------------- | ------------------------------ |
| `DM_PORT`        | `8080`                          | 面板端口                       |
| `DM_INSTALL_DIR` | `/opt/docker-manager`           | 安装目录                       |
| `DM_DATA_DIR`    | `$DM_INSTALL_DIR/data`          | 数据目录                       |
| `DM_CERT_DIR`    | `$DM_INSTALL_DIR/cert`          | 证书目录                       |
| `DM_IMAGE`       | `zhaoweiwen123/dockorae:latest` | 镜像(Compose 方式)             |
| `DM_MODE`        | (交互选择)                      | 安装方式:`compose` 或 `binary` |
| `DM_PRIVILEGED`  | `false`                         | 特权模式(仅 Compose)           |
| `DM_FORCE`       | —                               | `1` 时强制覆盖重装             |
| `DM_PUBLIC_IP`   | 自动检测                        | 手动指定公网 IP(SSL 校验用)    |

示例:指定端口与数据目录安装

```bash
DM_PORT=9090 DM_DATA_DIR=/data/dm bash <(curl -Ls https://raw.githubusercontent.com/DockOrae/DockOrae/master/install.sh)
```

示例:强制二进制方式安装(跳过交互)

```bash
DM_MODE=binary bash <(curl -Ls https://raw.githubusercontent.com/DockOrae/DockOrae/master/install.sh)
```

## 重复执行保护

脚本检测到已安装时会显示当前版本与状态,并提示:

```text
检测到已安装(compose 方式)
docker-manager: running
  面板地址: http://<服务器IP>:8080
  默认账号: admin / 123456(首次登录后请尽快修改)
  如需覆盖重装: DM_FORCE=1 bash install.sh install
```

不会重复安装,也不会覆盖已有数据。

## 更新

```bash
sudo bash install.sh update
```

- Compose 方式:拉取最新镜像并重建容器
- 二进制方式:重新下载最新版本并重启 systemd 服务

## 备份与恢复

```bash
# 备份(生成 /opt/docker-manager/backups/dm-backup-<时间戳>.tar.gz)
sudo bash install.sh backup

# 恢复(列出备份供选择,恢复前自动停止服务)
sudo bash install.sh restore
```

详见[备份与恢复](/guide/backup)。

## 重置密码

忘记密码时:

```bash
sudo bash install.sh reset-passwd
```

将管理员密码重置为 `admin / 123456`(2FA 与用户配置一并重置,容器/镜像等数据不受影响)。

## 卸载

```bash
sudo bash install.sh uninstall
```

脚本会停止服务并移除程序文件,**保留数据目录**;如需彻底删除数据,见[一键脚本卸载](/guide/uninstall/script)。

## 域名绑定与 SSL

```bash
sudo bash install.sh ssl
```

进入 SSL 管理菜单:

| 选项 | 功能                                              |
| ---- | ------------------------------------------------- |
| 1    | 申请域名证书(acme.sh 自动签发 Let's Encrypt 证书) |
| 2    | 查看已申请证书                                    |
| 3    | 强制续期                                          |
| 4    | 删除证书                                          |

申请证书前脚本会**校验域名 A 记录指向本机公网 IP**,解析不对直接终止,防止证书申请失败。详见[域名与 HTTPS](/guide/configuration/https)。

## 常见问题

**提示 "此脚本仅支持 Linux 系统"?** 脚本只支持 Linux;Windows / macOS 请使用 [Docker 安装](/guide/installation/docker)。

**下载慢?** 国内网络下脚本自动使用加速源;也可手动指定 `DM_IMAGE` 使用镜像加速。

**安装失败怎么看日志?** Compose 方式: `docker compose -f /opt/docker-manager/docker-compose.yml logs`;二进制方式: `journalctl -u docker-manager -n 50`。
