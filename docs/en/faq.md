---
title: FAQ
description: Quick answers to common questions about DockOrae installation, connections, the Docker Socket, ports, updates, data backup, and more.
---

# FAQ

## Installation and Startup

### The panel fails to start / the container keeps restarting?

Troubleshoot in order:

```bash
# Check the container status and logs
docker compose ps
docker compose logs --tail 50
```

Common causes:

- **Forced HTTPS is enabled but the certificate is invalid** — the panel refuses to start; fix the certificate path or disable forced HTTPS
- **Port already in use** — port 8080 is occupied by another program; use a different port
- **Docker Socket mounted as a directory** — when the daemon is not ready, the socket can be mounted as an empty directory; restart Docker and recreate the container

### The one-click script says "This script only supports Linux systems"?

The installation script only supports Linux. On Windows / macOS, use [Docker installation](/en/guide/installation/docker).

### The installer reports that curl / tar was not detected?

```bash
apt install curl tar -y    # Debian / Ubuntu
```

## Cannot Connect to Docker

### The panel says it cannot connect to Docker?

1. Confirm the Docker service is running: `systemctl status docker`
2. Confirm the socket exists: `ls -l /var/run/docker.sock`
3. Container deployments must mount the socket (see [docker-compose.yml](/en/guide/installation/docker-compose))
4. For a remote daemon, set `DOCKER_HOST=tcp://<host>:2375` and enable remote access on the daemon

### Docker Socket permission risk?

`/var/run/docker.sock` is equivalent to root access on the host. **Do not** expose the panel's port 8080 directly to the public internet; set up a [security entry](/en/guide/configuration/panel) and [HTTPS](/en/guide/configuration/https) first. See [data directory and persistence](/en/guide/configuration/storage#docker-socket) for details.

## Access and Login

### The panel cannot be opened from the public internet?

```bash
# 1. Test locally first
curl -sI http://127.0.0.1:8080/ | head -3

# 2. Allow the ports through the firewall (8080 / 80 / 443)
# Using ufw as an example:
ufw allow 8080/tcp
```

### Changed the port / security entry but it does not take effect?

**The panel's listening port, listening IP, and security entry only take effect after the panel is restarted** (the routes are built at startup). Restart the panel after changing them:

```bash
# Compose method
docker compose restart

# Binary method
sudo systemctl restart docker-manager
```

### Old links do not work after setting a security entry?

That is expected — once an entry is set, all paths are 302-redirected to it. Access the panel via `http://<IP>:8080/<entry>/`.

### Direct IP access does not work after setting a listening domain?

That is expected — the listening domain acts as a Host whitelist; once set, only that domain can access the panel (`localhost` is not restricted).

### Login says the password has expired?

The password policy forces a password change when it expires. Go to **Settings → Security → Admin credentials** to change the password.

### Forgot the password?

```bash
sudo bash install.sh reset-passwd   # Reset to admin / 123456
```

## Containers and Compose

### A container cannot start?

Check the container logs to find the cause (**Container details → Logs**); common causes: port conflicts, incorrect environment variables, issues with the image's start command, and volume permissions.

### Compose deployment fails with "port is already allocated"?

The port is occupied by another container. Change the port mapping, or stop the container that occupies the port first.

### Containers deployed manually on the host are not visible in the panel?

The panel only shows resources **created or adopted by the panel**. Paste the compose configuration on the **Compose page** to adopt it. See [resource visibility](/en/guide/usage/#resource-visibility-notes) for details.

## App Store

### The app store is empty?

The background sync on first launch may not have finished yet. Click **"Sync App Store"** at the top right to trigger it manually; if the sync fails, check the network to GitHub, or configure the `DM_APPSTORE_URL` intranet mirror.

### Installing an app asks for a license?

Installing from the app store is a Pro feature and requires a valid [license](/en/guide/configuration/panel#license).

## Updates

### Checking for updates fails?

The panel silently checks GitHub Releases; if the network is unreachable or the API is rate-limited, it shows "Check for updates failed", which does not affect usage. Retry later, or run `sudo bash install.sh update` manually.

### Version unchanged after updating?

- Make sure the update process completed (online updates need to wait for the rebuild to finish)
- For Compose deployments, make sure the image tag is `latest`
- The panel footer shows the currently running version

## Data

### Where is the data?

See [data directory and persistence](/en/guide/configuration/storage): `./data` for Compose deployments (`/opt/docker-manager/data` for script installations), and the `docker-manager-data` volume for `docker run` deployments.

### How to back up / restore?

```bash
sudo bash install.sh backup     # One-click backup
sudo bash install.sh restore    # One-click restore
```

See [backup and restore](/en/guide/backup) for details.

### Will data be lost after deleting a container?

**No** — the data lives in volumes / the data directory, independent of the container lifecycle. Deleting a container ≠ deleting the data.

### Where are the logs?

- Compose method: `docker compose logs -f`
- Binary method: `journalctl -u docker-manager -f`
- In the panel: Container details → Logs; the panel's own logs are in **Panel settings → Logs**

## Other

### Which languages does the panel support?

14 interface languages: English, 简体中文, 繁體中文, 日本語, 한국어, Русский, Türkçe, Español, Português (Brasil), Tiếng Việt, Indonesia, Українська, العربية, فارسی. The browser language is detected automatically, and you can switch with one click.

### License-related questions?

See [Panel settings → License](/en/guide/configuration/panel#license).

### Still have questions?

- File an issue on [GitHub Issues](https://github.com/DockOrae/DockOrae/issues) (include the panel version, deployment method, and logs)
- Read the [Agent Skill knowledge base](https://github.com/DockOrae/DockOrae/blob/master/.github/skills/docker-manager-user-guide/SKILL.md)
