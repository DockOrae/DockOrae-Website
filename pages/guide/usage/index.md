---
title:
  en: Basic Usage
  zh-CN: 基础使用
description:
  en: Log in to the panel, get familiar with the interface, first-time configuration (password change / image acceleration / security entry), and common operation entry points.
  zh-CN: 登录面板、认识界面、首次配置(改密/镜像加速/安全入口)与常用操作入口。
categories:
  - guide
  - usage
top: 96000
---

:::: en

This article introduces the interface layout after logging into the panel, first-time configuration, and common operation entry points.

## Log In { lang="en" }

Visit `http://<server-ip>:8080` in a browser and log in with the default credentials:

- Username: `admin`
- Password: `123456`

::: danger Change your password immediately after first login
Go to **Panel Settings → Security → Admin Credentials** and change the default password to a strong one. With the default password, anyone can log into your panel.

:::

## Interface Overview { lang="en" }

After logging in you land on the **Dashboard** (system status page):

- **Top navigation** — panel name, language switcher, theme switcher, user menu
- **Left navigation** — all feature entry points:
  - **Dashboard** — system status
  - **Containers** — container management
  - **Images** — image management
  - **Networks** — network management
  - **Volumes** — volume management
  - **Compose** — Compose stack management
  - **App Store** — one-click app installation
  - **Panel Settings** — General / Security / Telegram / Email / License / About
- **Footer version number** — shows the current version; a **pink dot indicator** appears when a new version is available; click it to go to [online update](/guide/update/panel)

## Dashboard (System Status) { lang="en" }

The status page is modeled after 3x-ui and displays in real time:

- **Resource cards** — CPU, memory, swap, storage (with mini sparkline charts)
- **Network and disk** — network throughput and disk I/O curves
- **Count statistics** — number of containers / images / volumes
- **Panel process** — the panel's own resource usage
- **Public IP** — can be toggled shown / hidden

## First-time Configuration Recommendations { lang="en" }

After logging in, we recommend completing these in order:

### 1. Change the default password { lang="en" }

**Panel Settings → Security → Admin Credentials**, a four-field form: original username, original password, new username, new password (leaving new fields empty = no change). We recommend changing both the username and the password.

### 2. (Strongly recommended) Set a security entry { lang="en" }

**Panel Settings → General → Security Entry**, fill in something like `/dm123`.

Once set, the panel can only be accessed via `http://<server-ip>:8080/dm123/`; all other paths automatically redirect to the entry, effectively hiding the panel's real path and reducing scan attacks.

::: warning Remember your security entry
Once a security entry is set, you must access it via `/entry`. If you forget the entry: after restarting the panel, visiting the root path will automatically 302 to the entry address, which is shown in the browser address bar.

:::

### 3. (Optional) Configure image acceleration { lang="en" }

**Panel Settings → General → Image Acceleration**, fill in an accelerator address (e.g. `https://docker.1panel.live`). On save, it is automatically written to the host's `daemon.json` and the Docker service is restarted, significantly speeding up image pulls.

::: info How image acceleration works
The panel reads/writes the host's `daemon.json` through the mounted `/etc/docker:/host/etc/docker:ro` (Compose mode), writes the `registry-mirrors` configuration, and restarts Docker for it to take effect.

:::

### 4. (Optional) Bind a domain and HTTPS { lang="en" }

Refer to [Domain and HTTPS](/guide/configuration/https), using the one-click script:

```bash
sudo bash install.sh ssl
```

### 5. (Optional) Configure notifications { lang="en" }

**Panel Settings → Telegram / Email**, after configuring a bot or SMTP, events such as login failures and license status can be pushed to Telegram or email in real time. Periodic reports and database backup attachments are supported.

## Resource Visibility Notes { lang="en" }

The panel only shows resources **created or taken over by the panel** (containers with a `createdBy` label, or Compose projects in the panel's data directory):

- Containers created by the panel, apps installed from the App Store, Compose orchestrated by the panel → **shown**
- Resources created manually on the host with `docker run` / `docker compose` → **not shown**

If you already have resources on the host that you want to manage in the panel, paste their compose configuration into the **Compose page** to "take them over".

## Common Operations Quick Reference { lang="en" }

| What you want to do              | Where to go                                                                       |
| -------------------------------- | --------------------------------------------------------------------------------- |
| Create a container               | [Container management → Create container](/guide/usage/containers)                |
| Enter a container terminal       | [Container management → Web terminal](/guide/usage/containers#container-terminal) |
| Pull an image                    | [Image management → Pull](/guide/usage/images)                                    |
| Deploy an app                    | [App Store](/guide/usage/appstore)                                                |
| Orchestrate multi-container apps | [Compose management](/guide/usage/compose)                                        |
| View Docker events               | Dashboard event stream (real-time push)                                           |
| Disk cleanup                     | Panel Settings → Toolbox → Docker disk cleanup                                    |
| View failed login records        | Panel Settings → Logs                                                             |

::::
:::: zh-CN

本文介绍登录面板后的界面布局、首次配置与常用操作入口。

## 登录 { lang="zh-CN" }

浏览器访问 `http://<服务器IP>:8080`,使用默认账号登录:

- 用户名:`admin`
- 密码:`123456`

::: danger 首次登录请立即修改密码
前往 **面板设置 → 安全 → 管理员凭证**,将默认密码修改为强密码。默认密码下任何人都能登录你的面板。

:::

## 界面一览 { lang="zh-CN" }

登录后进入**仪表盘**(系统状态页):

- **顶部导航** — 面板名称、语言切换、主题切换、用户菜单
- **左侧导航** — 全部功能入口:
  - **仪表盘** — 系统状态
  - **容器** — 容器管理
  - **镜像** — 镜像管理
  - **网络** — 网络管理
  - **存储卷** — 卷管理
  - **Compose** — Compose 栈管理
  - **应用商店** — 一键安装应用
  - **面板设置** — 常规 / 安全 / Telegram / 邮件 / 许可证 / 关于
- **页脚版本号** — 显示当前版本;有新版本时出现**粉色圆点提示**,点击进入[在线更新](/guide/update/panel)

## 仪表盘(系统状态) { lang="zh-CN" }

状态页参照 3x-ui 设计,实时展示:

- **资源卡片** — CPU、内存、交换分区、存储(带迷你走势图)
- **网络与磁盘** — 网络吞吐、磁盘 I/O 曲线
- **数量统计** — 容器 / 镜像 / 存储卷数量
- **面板进程** — 面板自身的资源占用
- **公网 IP** — 可切换显示 / 隐藏

## 首次配置建议 { lang="zh-CN" }

登录后建议按顺序完成:

### 1. 修改默认密码 { lang="zh-CN" }

**面板设置 → 安全 → 管理员凭证**,四字段表单:原用户名、原密码、新用户名、新密码(新字段留空 = 不修改)。建议同时修改用户名与密码。

### 2. (强烈建议)设置安全入口 { lang="zh-CN" }

**面板设置 → 常规 → 安全入口**,填写如 `/dm123`。

设置后仅可通过 `http://<服务器IP>:8080/dm123/` 访问面板,其余路径自动跳转到入口,有效隐藏面板真实路径、减少扫描攻击。

::: warning 记住你的安全入口
设置安全入口后必须通过 `/入口` 访问。若忘记入口:重启面板后访问根路径会自动 302 到入口地址,浏览器地址栏会显示。

:::

### 3. (可选)配置镜像加速 { lang="zh-CN" }

**面板设置 → 常规 → 镜像加速**,填入加速源地址(如 `https://docker.1panel.live`)。保存后自动写入宿主机 `daemon.json` 并重启 Docker 服务,拉取镜像速度显著提升。

::: info 镜像加速原理
面板通过挂载的 `/etc/docker:/host/etc/docker:ro`(Compose 方式)读写宿主机的 `daemon.json`,写入 `registry-mirrors` 配置后重启 Docker 生效。

:::

### 4. (可选)绑定域名与 HTTPS { lang="zh-CN" }

参考[域名与 HTTPS](/guide/configuration/https),使用一键脚本:

```bash
sudo bash install.sh ssl
```

### 5. (可选)配置通知 { lang="zh-CN" }

**面板设置 → Telegram / 邮件**,配置机器人或 SMTP 后,登录失败、许可证状态等事件可实时推送到 Telegram 或邮箱。支持周期报告与数据库备份附件。

## 资源可见性说明 { lang="zh-CN" }

面板只显示**由面板创建或接管**的资源(带 `createdBy` 标签的容器,或在面板数据目录中的 Compose 项目):

- 面板创建的容器、应用商店安装的应用、面板编排的 Compose → **显示**
- 宿主机上手动 `docker run` / `docker compose` 的资源 → **不显示**

如果宿主机已有资源需要在面板中管理,在 **Compose 页面** 粘贴其 compose 配置「接管」即可。

## 常用操作入口速查 { lang="zh-CN" }

| 想做什么         | 入口                                                    |
| ---------------- | ------------------------------------------------------- |
| 创建容器         | [容器管理 → 创建容器](/guide/usage/containers)          |
| 进入容器终端     | [容器管理 → Web 终端](/guide/usage/containers#容器终端) |
| 拉取镜像         | [镜像管理 → 拉取](/guide/usage/images)                  |
| 部署应用         | [应用商店](/guide/usage/appstore)                       |
| 编排多容器应用   | [Compose 管理](/guide/usage/compose)                    |
| 查看 Docker 事件 | 仪表盘事件流(实时推送)                                  |
| 磁盘清理         | 面板设置 → 工具箱 → Docker 磁盘清理                     |
| 查看登录失败记录 | 面板设置 → 日志                                         |

::::
