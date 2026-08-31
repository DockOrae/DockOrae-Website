---
title:
  en: Panel Settings
  zh-CN: 面板设置
description:
  en: Detailed explanation of each panel settings tab — General, Certificates, Date and Time, Security (admin credentials / two-factor), Telegram, Email, License.
  zh-CN: 面板设置各选项卡详解 — 常规、证书、日期和时间、安全(管理员凭证/双因素)、Telegram、邮件、许可证。
categories:
  - configuration
top: 84000
---

:::: en

Open **Panel Settings**, which includes the submenus: **General / Security / Telegram / Email / License / About**.

::: info Effect rules

- **Take effect immediately**: panel listen domain, unauthenticated settings, session duration, IP whitelist, registry mirror
- **Panel restart required**: panel listen IP, listen port, secure entry, certificate paths

:::

## General { lang="en" }

### Basic { lang="en" }

| Item                     | Description                                                                                                                                             |
| ------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Panel listen IP          | Empty = listen on all interfaces (0.0.0.0); set `127.0.0.1` to allow access only from the local machine (pair with a reverse proxy)                     |
| Panel listen domain      | **Host whitelist**: once set, only that domain can access the panel; other Hosts (including direct IP access) return 404; `localhost` is always allowed |
| Panel listen port        | Default 8080; takes effect after restarting the panel                                                                                                   |
| Secure entry             | Once `/xxx` is set, the panel can only be accessed via the `/xxx/` prefix; all other paths get a 302 redirect to the entry                              |
| Unauthenticated settings | Response code for unauthenticated API access: 200 (disguised help page) / 400 / 401 / 403 / 404 / 408 / 416 / 444 (drop connection) / 500; default 401  |
| Session duration         | Login session validity in minutes; default 10080 (7 days)                                                                                               |
| IP restriction whitelist | CIDR / single IP; IPs in the whitelist are not affected by failed-login counting or bans                                                                |

### Registry Mirror { lang="en" }

Enter mirror source addresses (multiple allowed, comma-separated); after saving, they are automatically written to the host's `daemon.json` and the Docker service is restarted.

Common mirrors (China): `https://docker.1panel.live`, `https://dockerpull.org`

::: warning
Changing the registry mirror restarts the host's Docker service; running containers will be briefly interrupted.

:::

## Certificates { lang="en" }

| Item                                   | Description                                                  |
| -------------------------------------- | ------------------------------------------------------------ |
| Panel certificate public key file path | Path inside the container, e.g. `/data/cert/fullchain.cer`   |
| Panel certificate key file path        | Path inside the container, e.g. `/data/cert/example.com.key` |

- When the certificate paths are valid, the panel automatically listens with **HTTPS**
- When the certificate is invalid, it automatically falls back to HTTP (to avoid losing access); the panel will not refuse to start
- It is recommended to use the one-click script to automatically issue certificates: [Domain & HTTPS](/guide/configuration/https)

## Date and Time { lang="en" }

- **Timezone** — default `Asia/Shanghai`
- **NTP server** — default `pool.ntp.org` (panel clock calibration; license validation depends on trusted time)
- **Date picker type** — calendar display style

## Security { lang="en" }

### Admin Credentials { lang="en" }

A four-field form:

| Field             | Description                         |
| ----------------- | ----------------------------------- |
| Original username | Pre-filled with the current account |
| Original password | Verifies the current identity       |
| New username      | Leave empty = no change             |
| New password      | Leave empty = no change             |

### Two-Factor Authentication (TOTP) { lang="en" }

1. Click **Enable** and enter the current password
2. Use an authenticator app (Google Authenticator, etc.) to scan the QR code or manually enter the key
3. Enter the 6-digit dynamic code to verify

Once enabled, login requires entering the password and then the dynamic code. Disabling requires the password + dynamic code.

### Password Policy { lang="en" }

- **Password expiration** — after setting an expiration period in days, login forces a password change when it expires (0 = never expires)
- **Password complexity** — 8-64 characters, must include uppercase and lowercase letters and digits

## Telegram Notifications { lang="en" }

After configuring a Telegram bot, panel events (failed logins, license status, container/image/network/volume changes) are pushed in real time to the specified chat:

| Item                | Description                                                                                                       |
| ------------------- | ----------------------------------------------------------------------------------------------------------------- |
| Bot Token           | Get it from [@BotFather](https://t.me/BotFather)                                                                  |
| Admin Chat ID       | The chat ID that receives notifications                                                                           |
| Notification events | Select by group (license / system / container / image / network / volume, etc.)                                   |
| Periodic report     | Send a panel status report on a schedule (e.g. `@every 1h`, `@daily`), optionally with a database backup attached |
| Bot language        | Notification message language (defaults to the panel's language)                                                  |
| Custom API server   | Fill in when using a self-hosted Telegram API gateway                                                             |

## Email Notifications { lang="en" }

After configuring SMTP, event notifications are sent via email:

| Item               | Description                                       |
| ------------------ | ------------------------------------------------- |
| SMTP server / port | e.g. `smtp.qq.com:465`                            |
| Account / password | SMTP login credentials (authorization code)       |
| Sender / name      | Shown in the email header                         |
| Recipients         | Comma-separated; leave empty = send to the sender |
| Encryption         | `none` / `ssl` / `starttls`                       |

## License { lang="en" }

DockOrae's Pro features (creating containers, Compose deployments, app store installs) are gated by a license:

- Open the **License** page, click **Add**, and paste the License Key (issued by the License management panel)
- After activation, the status badge shows the online verification status
- The **Verify Now** button syncs the revocation status immediately (otherwise it takes effect within up to 24h)

::: info License notes

- Uses the official License Server (`https://manager.kejizero.xyz/license-api`) by default; no configuration needed
- Self-hosted License Server: deploy [Docker_Manager_License](https://github.com/DockOrae/Docker_Manager_License) and set `DM_LICENSE_SERVER_URL`
- Existing users keep the offline activation method

:::

## About { lang="en" }

Version info, project address, and documentation links.

## Toolbox { lang="en" }

The panel settings also include an operations toolbox:

- **Device info** — host hardware and system information
- **Docker disk cleanup** — clean up stopped containers, unused images and volumes, and build cache
- **Fail2ban login protection** — automatically bans brute-force IPs, with ban list and unban management

::: warning Restart Docker (privileged)
The "Restart Docker" option in the toolbox requires privileged mode (enable `privileged: true` for Compose deployments); it is disabled by default.

:::
::::

:::: zh-CN

进入 **面板设置**,包含子菜单:**常规 / 安全 / Telegram / 邮件 / 许可证 / 关于**。

::: info 生效规则

- **即时生效**:面板监听域名、未认证设置、会话时长、IP 白名单、镜像加速
- **需重启面板**:面板监听 IP、监听端口、安全入口、证书路径

:::

## 常规 { lang="zh-CN" }

### 基础 { lang="zh-CN" }

| 配置项        | 说明                                                                                                     |
| ------------- | -------------------------------------------------------------------------------------------------------- |
| 面板监听 IP   | 空 = 监听所有(0.0.0.0);填 `127.0.0.1` 可仅本机访问(配合反向代理)                                         |
| 面板监听域名  | **Host 白名单**:设置后仅该域名可访问,其他 Host(含 IP 直访)返回 404;`localhost` 始终放行                  |
| 面板监听端口  | 默认 8080,修改后重启面板生效                                                                             |
| 安全入口      | 设置 `/xxx` 后仅可通过 `/xxx/` 前缀访问,其余路径 302 到入口                                              |
| 未认证设置    | 未登录访问 API 的响应码:200(伪装帮助页)/ 400 / 401 / 403 / 404 / 408 / 416 / 444(断开连接)/ 500,默认 401 |
| 会话时长      | 登录会话有效期(分钟),默认 10080(7 天)                                                                    |
| IP 限制白名单 | CIDR / 单个 IP;白名单内 IP 不受登录失败计数与封禁影响                                                    |

### 镜像加速 { lang="zh-CN" }

填写加速源地址(可多个,逗号分隔),保存后自动写入宿主机 `daemon.json` 并重启 Docker 服务。

常用加速源(国内):`https://docker.1panel.live`、`https://dockerpull.org`

::: warning
修改镜像加速会重启宿主机 Docker 服务,正在运行的容器会短暂中断。

:::

## 证书 { lang="zh-CN" }

| 配置项               | 说明                                       |
| -------------------- | ------------------------------------------ |
| 面板证书公钥文件路径 | 容器内路径,如 `/data/cert/fullchain.cer`   |
| 面板证书密钥文件路径 | 容器内路径,如 `/data/cert/example.com.key` |

- 证书路径有效时面板自动以 **HTTPS** 监听
- 证书无效时自动降级 HTTP(防失联),不会拒绝启动
- 推荐用一键脚本自动签发证书:[域名与 HTTPS](/guide/configuration/https)

## 日期和时间 { lang="zh-CN" }

- **时区** — 默认 `Asia/Shanghai`
- **NTP 服务器** — 默认 `pool.ntp.org`(面板时钟校准,许可证校验依赖可信时间)
- **日期选择器类型** — 日历显示风格

## 安全 { lang="zh-CN" }

### 管理员凭证 { lang="zh-CN" }

四字段表单:

| 字段     | 说明          |
| -------- | ------------- |
| 原用户名 | 预填当前账号  |
| 原密码   | 验证当前身份  |
| 新用户名 | 留空 = 不修改 |
| 新密码   | 留空 = 不修改 |

### 双因素认证(TOTP) { lang="zh-CN" }

1. 点击 **启用**,输入当前密码
2. 用认证器 App(Google Authenticator 等)扫描二维码或手动输入密钥
3. 输入 6 位动态码验证

启用后登录需依次输入密码与动态码。禁用需密码 + 动态码。

### 密码策略 { lang="zh-CN" }

- **密码过期** — 设置过期天数后,到期登录强制修改密码(0 = 不过期)
- **密码复杂度** — 8-64 位,需包含大小写字母和数字

## Telegram 通知 { lang="zh-CN" }

配置 Telegram 机器人后,面板事件(登录失败、许可证状态、容器/镜像/网络/卷变更)实时推送到指定会话:

| 配置项            | 说明                                                                   |
| ----------------- | ---------------------------------------------------------------------- |
| Bot Token         | 从 [@BotFather](https://t.me/BotFather) 获取                           |
| 管理员 Chat ID    | 接收通知的会话 ID                                                      |
| 通知事件          | 按分组勾选(license / system / container / image / network / volume 等) |
| 周期报告          | 定时发送面板状态报告(如 `@every 1h`、`@daily`),可附带数据库备份        |
| Bot 语言          | 通知文案语言(默认跟随面板)                                             |
| 自定义 API 服务器 | 使用自建 Telegram API 网关时填写                                       |

## 邮件通知 { lang="zh-CN" }

配置 SMTP 后,事件通知通过邮件发送:

| 配置项             | 说明                           |
| ------------------ | ------------------------------ |
| SMTP 服务器 / 端口 | 如 `smtp.qq.com:465`           |
| 账号 / 密码        | SMTP 登录凭据(授权码)          |
| 发件人 / 名称      | 显示在邮件头                   |
| 收件人             | 逗号分隔;留空 = 发给发件人自己 |
| 加密方式           | `none` / `ssl` / `starttls`    |

## 许可证 { lang="zh-CN" }

DockOrae 的 Pro 功能(创建容器、Compose 部署、应用商店安装)由许可证门控:

- 打开 **许可证** 页面,点击 **添加**,粘贴 License Key(由 License 管理面板签发)
- 激活后状态徽标显示在线验证状态
- **立即验证** 按钮可即时同步吊销状态(否则最长 24h 生效)

::: info 许可证说明

- 默认使用官方 License Server(`https://manager.kejizero.xyz/license-api`),无需配置
- 自建 License Server:部署 [Docker_Manager_License](https://github.com/DockOrae/Docker_Manager_License) 并设置 `DM_LICENSE_SERVER_URL`
- 存量用户保留离线激活方式

:::

## 关于 { lang="zh-CN" }

版本信息、项目地址与文档链接。

## 工具箱 { lang="zh-CN" }

面板设置中还提供运维工具箱:

- **设备信息** — 宿主机硬件与系统信息
- **Docker 磁盘清理** — 清理已停止容器、未使用镜像与卷、构建缓存
- **Fail2ban 登录防护** — 自动封禁暴力破解 IP,封禁列表与解封管理

::: warning 重启 Docker(特权)
工具箱中的「重启 Docker」需要特权模式(Compose 部署时启用 `privileged: true`),默认关闭。

:::
::::
