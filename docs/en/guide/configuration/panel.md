---
title: Panel Settings
description: Detailed explanation of each panel settings tab — General, Certificates, Date and Time, Security (admin credentials / two-factor), Telegram, Email, License.
---

# Panel Settings

Open **Panel Settings**, which includes the submenus: **General / Security / Telegram / Email / License / About**.

::: note Effect rules

- **Take effect immediately**: panel listen domain, unauthenticated settings, session duration, IP whitelist, registry mirror
- **Panel restart required**: panel listen IP, listen port, secure entry, certificate paths
  :::

## General

### Basic

| Item                     | Description                                                                                                                                             |
| ------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Panel listen IP          | Empty = listen on all interfaces (0.0.0.0); set `127.0.0.1` to allow access only from the local machine (pair with a reverse proxy)                     |
| Panel listen domain      | **Host whitelist**: once set, only that domain can access the panel; other Hosts (including direct IP access) return 404; `localhost` is always allowed |
| Panel listen port        | Default 8080; takes effect after restarting the panel                                                                                                   |
| Secure entry             | Once `/xxx` is set, the panel can only be accessed via the `/xxx/` prefix; all other paths get a 302 redirect to the entry                              |
| Unauthenticated settings | Response code for unauthenticated API access: 200 (disguised help page) / 400 / 401 / 403 / 404 / 408 / 416 / 444 (drop connection) / 500; default 401  |
| Session duration         | Login session validity in minutes; default 10080 (7 days)                                                                                               |
| IP restriction whitelist | CIDR / single IP; IPs in the whitelist are not affected by failed-login counting or bans                                                                |

### Registry Mirror

Enter mirror source addresses (multiple allowed, comma-separated); after saving, they are automatically written to the host's `daemon.json` and the Docker service is restarted.

Common mirrors (China): `https://docker.1panel.live`, `https://dockerpull.org`

::: warning
Changing the registry mirror restarts the host's Docker service; running containers will be briefly interrupted.
:::

## Certificates

| Item                                   | Description                                                  |
| -------------------------------------- | ------------------------------------------------------------ |
| Panel certificate public key file path | Path inside the container, e.g. `/data/cert/fullchain.cer`   |
| Panel certificate key file path        | Path inside the container, e.g. `/data/cert/example.com.key` |

- When the certificate paths are valid, the panel automatically listens with **HTTPS**
- When the certificate is invalid, it automatically falls back to HTTP (to avoid losing access); the panel will not refuse to start
- It is recommended to use the one-click script to automatically issue certificates: [Domain & HTTPS](/en/guide/configuration/https)

## Date and Time

- **Timezone** — default `Asia/Shanghai`
- **NTP server** — default `pool.ntp.org` (panel clock calibration; license validation depends on trusted time)
- **Date picker type** — calendar display style

## Security

### Admin Credentials

A four-field form:

| Field             | Description                         |
| ----------------- | ----------------------------------- |
| Original username | Pre-filled with the current account |
| Original password | Verifies the current identity       |
| New username      | Leave empty = no change             |
| New password      | Leave empty = no change             |

### Two-Factor Authentication (TOTP)

1. Click **Enable** and enter the current password
2. Use an authenticator app (Google Authenticator, etc.) to scan the QR code or manually enter the key
3. Enter the 6-digit dynamic code to verify

Once enabled, login requires entering the password and then the dynamic code. Disabling requires the password + dynamic code.

### Password Policy

- **Password expiration** — after setting an expiration period in days, login forces a password change when it expires (0 = never expires)
- **Password complexity** — 8-64 characters, must include uppercase and lowercase letters and digits

## Telegram Notifications

After configuring a Telegram bot, panel events (failed logins, license status, container/image/network/volume changes) are pushed in real time to the specified chat:

| Item                | Description                                                                                                       |
| ------------------- | ----------------------------------------------------------------------------------------------------------------- |
| Bot Token           | Get it from [@BotFather](https://t.me/BotFather)                                                                  |
| Admin Chat ID       | The chat ID that receives notifications                                                                           |
| Notification events | Select by group (license / system / container / image / network / volume, etc.)                                   |
| Periodic report     | Send a panel status report on a schedule (e.g. `@every 1h`, `@daily`), optionally with a database backup attached |
| Bot language        | Notification message language (defaults to the panel's language)                                                  |
| Custom API server   | Fill in when using a self-hosted Telegram API gateway                                                             |

## Email Notifications

After configuring SMTP, event notifications are sent via email:

| Item               | Description                                       |
| ------------------ | ------------------------------------------------- |
| SMTP server / port | e.g. `smtp.qq.com:465`                            |
| Account / password | SMTP login credentials (authorization code)       |
| Sender / name      | Shown in the email header                         |
| Recipients         | Comma-separated; leave empty = send to the sender |
| Encryption         | `none` / `ssl` / `starttls`                       |

## License

DockOrae's Pro features (creating containers, Compose deployments, app store installs) are gated by a license:

- Open the **License** page, click **Add**, and paste the License Key (issued by the License management panel)
- After activation, the status badge shows the online verification status
- The **Verify Now** button syncs the revocation status immediately (otherwise it takes effect within up to 24h)

::: note License notes

- Uses the official License Server (`https://manager.kejizero.xyz/license-api`) by default; no configuration needed
- Self-hosted License Server: deploy [Docker_Manager_License](https://github.com/DockOrae/Docker_Manager_License) and set `DM_LICENSE_SERVER_URL`
- Existing users keep the offline activation method
  :::

## About

Version info, project address, and documentation links.

## Toolbox

The panel settings also include an operations toolbox:

- **Device info** — host hardware and system information
- **Docker disk cleanup** — clean up stopped containers, unused images and volumes, and build cache
- **Fail2ban login protection** — automatically bans brute-force IPs, with ban list and unban management

::: warning Restart Docker (privileged)
The "Restart Docker" option in the toolbox requires privileged mode (enable `privileged: true` for Compose deployments); it is disabled by default.
:::
