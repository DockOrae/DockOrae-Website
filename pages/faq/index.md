---
title:
  en: FAQ
  zh-CN: 常见问题
description:
  en: Quick answers to common questions about DockOrae installation, connections, the Docker Socket, ports, updates, data backup, and more.
  zh-CN: DockOrae 安装、连接、Docker Socket、端口、更新、数据备份等常见问题速查。
categories:
  - faq
top: 100000
---

:::: en

## Installation and Startup { lang="en" }

### The panel fails to start / the container keeps restarting? { lang="en" }

Troubleshoot in order:

```bash
docker compose ps
docker compose logs --tail 50
```

Common causes:

- **Forced HTTPS is enabled but the certificate is invalid** — the panel refuses to start; fix the certificate path or disable forced HTTPS
- **Port already in use** — port 8080 is occupied by another program; use a different port
- **Docker Socket mounted as a directory** — when the daemon is not ready, the socket can be mounted as an empty directory; restart Docker and recreate the container

### The one-click script says "This script only supports Linux systems"? { lang="en" }

The installation script only supports Linux. On Windows / macOS, use [Docker installation](/guide/installation/docker).

### The installer reports that curl / tar was not detected? { lang="en" }

```bash
apt install curl tar -y    # Debian / Ubuntu
```

## Cannot Connect to Docker { lang="en" }

### The panel says it cannot connect to Docker? { lang="en" }

1. Confirm the Docker service is running: `systemctl status docker`
2. Confirm the socket exists: `ls -l /var/run/docker.sock`
3. Container deployments must mount the socket (see [docker-compose.yml](/guide/installation/docker-compose))
4. For a remote daemon, set `DOCKER_HOST=tcp://<host>:2375` and enable remote access on the daemon

### Docker Socket permission risk? { lang="en" }

`/var/run/docker.sock` is equivalent to root access on the host. **Do not** expose the panel's port 8080 directly to the public internet; set up a [security entry](/guide/configuration/panel) and [HTTPS](/guide/configuration/https) first. See [data directory and persistence](/guide/configuration/storage#docker-socket) for details.

## Access and Login { lang="en" }

### The panel cannot be opened from the public internet? { lang="en" }

```bash
# 1. Test locally first
curl -sI http://127.0.0.1:8080/ | head -3

# 2. Allow the ports through the firewall (8080 / 80 / 443)
# Using ufw as an example:
ufw allow 8080/tcp
```

### Changed the port / security entry but it does not take effect? { lang="en" }

**The panel's listening port, listening IP, and security entry only take effect after the panel is restarted** (the routes are built at startup). Restart the panel after changing them:

```bash
# Compose method
docker compose restart

# Binary method
sudo systemctl restart docker-manager
```

### Old links do not work after setting a security entry? { lang="en" }

That is expected — once an entry is set, all paths are 302-redirected to it. Access the panel via `http://<IP>:8080/<entry>/`.

### Direct IP access does not work after setting a listening domain? { lang="en" }

That is expected — the listening domain acts as a Host whitelist; once set, only that domain can access the panel (`localhost` is not restricted).

### Login says the password has expired? { lang="en" }

The password policy forces a password change when it expires. Go to **Settings → Security → Admin credentials** to change the password.

### Forgot the password? { lang="en" }

```bash
sudo bash install.sh reset-passwd   # Reset to admin / 123456
```

## Containers and Compose { lang="en" }

### A container cannot start? { lang="en" }

Check the container logs to find the cause (**Container details → Logs**); common causes: port conflicts, incorrect environment variables, issues with the image's start command, and volume permissions.

### Compose deployment fails with "port is already allocated"? { lang="en" }

The port is occupied by another container. Change the port mapping, or stop the container that occupies the port first.

### Containers deployed manually on the host are not visible in the panel? { lang="en" }

The panel only shows resources **created or adopted by the panel**. Paste the compose configuration on the **Compose page** to adopt it. See [resource visibility](/guide/usage/#resource-visibility-notes) for details.

## App Store { lang="en" }

### The app store is empty? { lang="en" }

The background sync on first launch may not have finished yet. Click **"Sync App Store"** at the top right to trigger it manually; if the sync fails, check the network to GitHub, or configure the `DM_APPSTORE_URL` intranet mirror.

### Installing an app asks for a license? { lang="en" }

Installing from the app store is a Pro feature and requires a valid [license](/guide/configuration/panel#license).

## Updates { lang="en" }

### Checking for updates fails? { lang="en" }

The panel silently checks GitHub Releases; if the network is unreachable or the API is rate-limited, it shows "Check for updates failed", which does not affect usage. Retry later, or run `sudo bash install.sh update` manually.

### Version unchanged after updating? { lang="en" }

- Make sure the update process completed (online updates need to wait for the rebuild to finish)
- For Compose deployments, make sure the image tag is `latest`
- The panel footer shows the currently running version

## Data { lang="en" }

### Where is the data? { lang="en" }

See [data directory and persistence](/guide/configuration/storage): `./data` for Compose deployments (`/opt/docker-manager/data` for script installations), and the `docker-manager-data` volume for `docker run` deployments.

### How to back up / restore? { lang="en" }

```bash
sudo bash install.sh backup     # One-click backup
sudo bash install.sh restore    # One-click restore
```

See [backup and restore](/guide/backup) for details.

### Will data be lost after deleting a container? { lang="en" }

**No** — the data lives in volumes / the data directory, independent of the container lifecycle. Deleting a container ≠ deleting the data.

### Where are the logs? { lang="en" }

- Compose method: `docker compose logs -f`
- Binary method: `journalctl -u docker-manager -f`
- In the panel: Container details → Logs; the panel's own logs are in **Panel settings → Logs**

## Other { lang="en" }

### Which languages does the panel support? { lang="en" }

14 interface languages: English, 简体中文, 繁體中文, 日本語, 한국어, Русский, Türkçe, Español, Português (Brasil), Tiếng Việt, Indonesia, Українська, العربية, فارسی. The browser language is detected automatically, and you can switch with one click.

### License-related questions? { lang="en" }

See [Panel settings → License](/guide/configuration/panel#license).

### Still have questions? { lang="en" }

- File an issue on [GitHub Issues](https://github.com/DockOrae/DockOrae/issues) (include the panel version, deployment method, and logs)
- Read the [Agent Skill knowledge base](https://github.com/DockOrae/DockOrae/blob/master/.github/skills/docker-manager-user-guide/SKILL.md)

::::
:::: zh-CN

## 安装与启动 { lang="zh-CN" }

### 面板启动失败 / 容器反复重启? { lang="zh-CN" }

按顺序排查:

```bash
docker compose ps
docker compose logs --tail 50
```

常见原因:

- **强制 HTTPS 开启但证书无效** — 面板拒绝启动;修复证书路径或关闭强制 HTTPS
- **端口被占用** — 8080 被其他程序占用,换端口
- **Docker Socket 挂载成目录** — daemon 未就绪时 socket 会被挂载成空目录;重启 Docker 后重建容器

### 一键脚本提示"此脚本仅支持 Linux 系统"? { lang="zh-CN" }

安装脚本仅支持 Linux。Windows / macOS 请使用 [Docker 安装](/guide/installation/docker)。

### 安装时提示未检测到 curl / tar? { lang="zh-CN" }

```bash
apt install curl tar -y    # Debian / Ubuntu
```

## 无法连接 Docker { lang="zh-CN" }

### 面板提示无法连接 Docker? { lang="zh-CN" }

1. 确认 Docker 服务运行:`systemctl status docker`
2. 确认 socket 存在:`ls -l /var/run/docker.sock`
3. 容器方式部署需挂载 socket(见[docker-compose.yml](/guide/installation/docker-compose))
4. 远程 daemon 需设置 `DOCKER_HOST=tcp://<host>:2375` 且 daemon 开启远程访问

### Docker Socket 权限风险? { lang="zh-CN" }

`/var/run/docker.sock` 等价于宿主机 root 权限。**不要**把面板 8080 端口直接暴露公网;优先设置[安全入口](/guide/configuration/panel)与[HTTPS](/guide/configuration/https)。详见[数据目录与持久化](/guide/configuration/storage#docker-socket)。

## 访问与登录 { lang="zh-CN" }

### 公网打不开面板? { lang="zh-CN" }

```bash
# 1. 本机先测
curl -sI http://127.0.0.1:8080/ | head -3

# 2. 防火墙放行端口(8080 / 80 / 443)
# 以 ufw 为例:
ufw allow 8080/tcp
```

### 改了端口 / 安全入口不生效? { lang="zh-CN" }

**面板监听端口、监听 IP、安全入口需要重启面板才生效**(路由在启动时构建)。修改后重启面板:

```bash
# compose 方式
docker compose restart

# 二进制方式
sudo systemctl restart docker-manager
```

### 设置安全入口后旧链接打不开? { lang="zh-CN" }

正常 —— 设置入口后所有路径 302 到入口。使用 `http://<IP>:8080/<入口>/` 访问。

### 设置监听域名后 IP 直访打不开? { lang="zh-CN" }

正常 —— 监听域名是 Host 白名单,设置后仅该域名可访问(`localhost` 不受限)。

### 登录提示密码过期? { lang="zh-CN" }

密码策略到期强制改密,前往 **设置 → 安全 → 管理员凭证** 修改密码。

### 忘记密码? { lang="zh-CN" }

```bash
sudo bash install.sh reset-passwd   # 重置为 admin / 123456
```

## 容器与 Compose { lang="zh-CN" }

### 容器无法启动? { lang="zh-CN" }

查看容器日志定位原因(`容器详情 → 日志`),常见:端口冲突、环境变量错误、镜像启动命令问题、存储卷权限。

### Compose 部署失败 "port is already allocated"? { lang="zh-CN" }

端口被其他容器占用。修改端口映射,或先停止占用端口的容器。

### 宿主机手动部署的容器在面板里看不到? { lang="zh-CN" }

面板只显示**面板创建或接管**的资源。在 **Compose 页面** 粘贴其 compose 配置即可接管。详见[资源可见性](/guide/usage/#资源可见性说明)。

## 应用商店 { lang="zh-CN" }

### 应用商店是空的? { lang="zh-CN" }

首次启动后台自动同步,可能尚未完成。点击右上角 **「同步应用商店」** 手动触发;同步失败检查到 GitHub 的网络,或配置 `DM_APPSTORE_URL` 内网镜像。

### 安装应用提示需要许可证? { lang="zh-CN" }

应用商店安装属于 Pro 功能,需要有效[许可证](/guide/configuration/panel#许可证)。

## 更新 { lang="zh-CN" }

### 检查更新失败? { lang="zh-CN" }

面板静默检查 GitHub Releases,网络不通或 API 限流会显示"检查更新失败",不影响使用。可稍后重试,或手动 `sudo bash install.sh update`。

### 更新后版本没变? { lang="zh-CN" }

- 确认更新流程走完(在线更新需等待重建完成)
- compose 方式确认镜像标签为 `latest`
- 面板页脚显示的是当前运行版本

## 数据 { lang="zh-CN" }

### 数据在哪里? { lang="zh-CN" }

见[数据目录与持久化](/guide/configuration/storage):compose 方式在 `./data`(脚本安装为 `/opt/docker-manager/data`),docker run 方式在卷 `docker-manager-data`。

### 如何备份 / 恢复? { lang="zh-CN" }

```bash
sudo bash install.sh backup     # 一键备份
sudo bash install.sh restore    # 一键恢复
```

详见[备份与恢复](/guide/backup)。

### 删除容器后数据会丢吗? { lang="zh-CN" }

**不会** —— 数据在卷 / 数据目录中,与容器生命周期无关。删除容器 ≠ 删除数据。

### 日志在哪里? { lang="zh-CN" }

- compose 方式:`docker compose logs -f`
- 二进制方式:`journalctl -u docker-manager -f`
- 面板内:容器详情 → 日志;面板自身日志见 **面板设置 → 日志**

## 其他 { lang="zh-CN" }

### 面板支持哪些语言? { lang="zh-CN" }

14 种界面语言:English、简体中文、繁體中文、日本語、한국어、Русский、Türkçe、Español、Português (Brasil)、Tiếng Việt、Indonesia、Українська、العربية、فارسی。自动检测浏览器语言,可一键切换。

### 许可证相关? { lang="zh-CN" }

见[面板设置 → 许可证](/guide/configuration/panel#许可证)。

### 还有问题? { lang="zh-CN" }

- 在 [GitHub Issues](https://github.com/DockOrae/DockOrae/issues) 提交问题(附上面板版本、部署方式、日志)
- 阅读 [Agent Skill 知识库](https://github.com/DockOrae/DockOrae/blob/master/.github/skills/docker-manager-user-guide/SKILL.md)

::::
