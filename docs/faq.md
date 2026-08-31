---
title: 常见问题
description: DockOrae 安装、连接、Docker Socket、端口、更新、数据备份等常见问题速查。
---

# 常见问题

## 安装与启动

### 面板启动失败 / 容器反复重启?

按顺序排查:

```bash
# 查看容器状态与日志
docker compose ps
docker compose logs --tail 50
```

常见原因:

- **强制 HTTPS 开启但证书无效** — 面板拒绝启动;修复证书路径或关闭强制 HTTPS
- **端口被占用** — 8080 被其他程序占用,换端口
- **Docker Socket 挂载成目录** — daemon 未就绪时 socket 会被挂载成空目录;重启 Docker 后重建容器

### 一键脚本提示"此脚本仅支持 Linux 系统"?

安装脚本仅支持 Linux。Windows / macOS 请使用 [Docker 安装](/guide/installation/docker)。

### 安装时提示未检测到 curl / tar?

```bash
apt install curl tar -y    # Debian / Ubuntu
```

## 无法连接 Docker

### 面板提示无法连接 Docker?

1. 确认 Docker 服务运行:`systemctl status docker`
2. 确认 socket 存在:`ls -l /var/run/docker.sock`
3. 容器方式部署需挂载 socket(见[docker-compose.yml](/guide/installation/docker-compose))
4. 远程 daemon 需设置 `DOCKER_HOST=tcp://<host>:2375` 且 daemon 开启远程访问

### Docker Socket 权限风险?

`/var/run/docker.sock` 等价于宿主机 root 权限。**不要**把面板 8080 端口直接暴露公网;优先设置[安全入口](/guide/configuration/panel)与[HTTPS](/guide/configuration/https)。详见[数据目录与持久化](/guide/configuration/storage#docker-socket)。

## 访问与登录

### 公网打不开面板?

```bash
# 1. 本机先测
curl -sI http://127.0.0.1:8080/ | head -3

# 2. 防火墙放行端口(8080 / 80 / 443)
# 以 ufw 为例:
ufw allow 8080/tcp
```

### 改了端口 / 安全入口不生效?

**面板监听端口、监听 IP、安全入口需要重启面板才生效**(路由在启动时构建)。修改后重启面板:

```bash
# compose 方式
docker compose restart

# 二进制方式
sudo systemctl restart docker-manager
```

### 设置安全入口后旧链接打不开?

正常 —— 设置入口后所有路径 302 到入口。使用 `http://<IP>:8080/<入口>/` 访问。

### 设置监听域名后 IP 直访打不开?

正常 —— 监听域名是 Host 白名单,设置后仅该域名可访问(`localhost` 不受限)。

### 登录提示密码过期?

密码策略到期强制改密,前往 **设置 → 安全 → 管理员凭证** 修改密码。

### 忘记密码?

```bash
sudo bash install.sh reset-passwd   # 重置为 admin / 123456
```

## 容器与 Compose

### 容器无法启动?

查看容器日志定位原因(`容器详情 → 日志`),常见:端口冲突、环境变量错误、镜像启动命令问题、存储卷权限。

### Compose 部署失败 "port is already allocated"?

端口被其他容器占用。修改端口映射,或先停止占用端口的容器。

### 宿主机手动部署的容器在面板里看不到?

面板只显示**面板创建或接管**的资源。在 **Compose 页面** 粘贴其 compose 配置即可接管。详见[资源可见性](/guide/usage/#资源可见性说明)。

## 应用商店

### 应用商店是空的?

首次启动后台自动同步,可能尚未完成。点击右上角 **「同步应用商店」** 手动触发;同步失败检查到 GitHub 的网络,或配置 `DM_APPSTORE_URL` 内网镜像。

### 安装应用提示需要许可证?

应用商店安装属于 Pro 功能,需要有效[许可证](/guide/configuration/panel#许可证)。

## 更新

### 检查更新失败?

面板静默检查 GitHub Releases,网络不通或 API 限流会显示"检查更新失败",不影响使用。可稍后重试,或手动 `sudo bash install.sh update`。

### 更新后版本没变?

- 确认更新流程走完(在线更新需等待重建完成)
- compose 方式确认镜像标签为 `latest`
- 面板页脚显示的是当前运行版本

## 数据

### 数据在哪里?

见[数据目录与持久化](/guide/configuration/storage):compose 方式在 `./data`(脚本安装为 `/opt/docker-manager/data`),docker run 方式在卷 `docker-manager-data`。

### 如何备份 / 恢复?

```bash
sudo bash install.sh backup     # 一键备份
sudo bash install.sh restore    # 一键恢复
```

详见[备份与恢复](/guide/backup)。

### 删除容器后数据会丢吗?

**不会** —— 数据在卷 / 数据目录中,与容器生命周期无关。删除容器 ≠ 删除数据。

### 日志在哪里?

- compose 方式:`docker compose logs -f`
- 二进制方式:`journalctl -u docker-manager -f`
- 面板内:容器详情 → 日志;面板自身日志见 **面板设置 → 日志**

## 其他

### 面板支持哪些语言?

14 种界面语言:English、简体中文、繁體中文、日本語、한국어、Русский、Türkçe、Español、Português (Brasil)、Tiếng Việt、Indonesia、Українська、العربية、فارسی。自动检测浏览器语言,可一键切换。

### 许可证相关?

见[面板设置 → 许可证](/guide/configuration/panel#许可证)。

### 还有问题?

- 在 [GitHub Issues](https://github.com/DockOrae/DockOrae/issues) 提交问题(附上面板版本、部署方式、日志)
- 阅读 [Agent Skill 知识库](https://github.com/DockOrae/DockOrae/blob/master/.github/skills/docker-manager-user-guide/SKILL.md)
