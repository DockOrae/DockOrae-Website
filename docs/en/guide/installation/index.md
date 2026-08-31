---
title: Installation Method Comparison
description: Comparison of the four DockOrae installation methods (Docker / Docker Compose / binary / one-click script) and recommendations for choosing one.
---

# Install DockOrae

DockOrae offers four installation methods, sorted by recommendation:

| Method                                                    | Best for                               | Difficulty | Update method                                | Notes                                                                                            |
| --------------------------------------------------------- | -------------------------------------- | ---------- | -------------------------------------------- | ------------------------------------------------------------------------------------------------ |
| [One-click install script](/en/guide/installation/script) | Most Linux users                       | ⭐         | `bash install.sh update`                     | Interactive installation, auto-detects network and architecture, optional Compose / binary modes |
| [Docker Compose](/en/guide/installation/docker-compose)   | VPS / server deployment                | ⭐         | `docker compose pull && up -d`               | Image-based, easy to update and roll back                                                        |
| [Docker](/en/guide/installation/docker)                   | Quick trial / single machine           | ⭐         | Re-pull the image and recreate the container | Single `docker run` command to start                                                             |
| [Binary](/en/guide/installation/binary)                   | No Docker environment / advanced users | ⭐⭐       | Replace the binary and restart               | Runs directly, no Docker required                                                                |

::: tip Recommendation
**For server deployment, prefer the [one-click script](/en/guide/installation/script) or [Docker Compose](/en/guide/installation/docker-compose):**

- Runs from an image, making updates and rollbacks simple
- Data is stored in a host directory, easy to back up
- The panel's built-in [online update](/en/guide/update/panel) has the best support for these two deployment methods
  :::

## Supported Platforms

| Platform               | amd64 | arm64 | armv7 | armv6 | armv5 | 386 | s390x |
| ---------------------- | ----- | ----- | ----- | ----- | ----- | --- | ----- |
| Docker image           | ✅    | ✅    | ✅    | ✅    | —     | —   | ✅    |
| Binary (runs directly) | ✅    | ✅    | ✅    | ✅    | ✅    | ✅  | ✅    |

- **Panel runtime**: Linux (production); Windows for development only
- **Image architectures**: `linux/amd64`、`linux/arm64`、`linux/arm/v7`、`linux/arm/v6`、`linux/s390x`
- The binary runs on various x86 and ARM Linux distributions (requires systemd or running in the foreground)

## Recommendation

| Your situation                                               | Recommended method                                                                                           |
| ------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------ |
| You have a Linux VPS / server                                | [One-click script](/en/guide/installation/script) or [Docker Compose](/en/guide/installation/docker-compose) |
| You want to try it out quickly                               | [Docker](/en/guide/installation/docker) with a single command                                                |
| Your server has no Docker and you don't want to install it   | [Binary](/en/guide/installation/binary) or the script's binary mode                                          |
| Your server is in mainland China with limited network access | [One-click script](/en/guide/installation/script) (automatically uses an accelerated mirror)                 |
| Raspberry Pi / ARM device                                    | One-click script or binary (auto-detects architecture)                                                       |

## General Information

No matter which method you choose, the following facts stay the same:

- **Default port**: `8080`
- **Default credentials**: `admin / 123456` (change them immediately after the first login)
- **Data directory**: `/data` inside the container; the host location depends on the installation method (see [data directory and persistence](/en/guide/configuration/storage))
- **Docker Socket**: `/var/run/docker.sock`, the entry point through which the panel manages Docker — it must be mounted (the binary method accesses it directly)
- **Image**: `dockorae/dockorae:latest` ([Docker Hub](https://hub.docker.com/r/dockorae/dockorae))
