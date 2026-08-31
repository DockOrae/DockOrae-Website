---
layout: home

title: DockOrae Docs
description: 'Official DockOrae documentation — a modern Docker management panel: containers, images, networks, volumes, Compose, and app store management in one place.'

hero:
  name: DockOrae
  text: Modern Docker Management Platform
  tagline: A lightweight Docker management panel written in Go. Manage your Docker environment — containers, images, networks, volumes, Compose, and app store — all in one place.
  image:
    src: /logo.svg
    alt: DockOrae
  actions:
    - theme: brand
      text: Quick Start
      link: /en/getting-started
    - theme: alt
      text: Install DockOrae
      link: /en/guide/installation/docker-compose

features:
  - icon: 🐳
    title: Container Management
    details: Create, start, stop, restart, pause, delete and inspect containers, with a built-in web terminal and real-time logs.
  - icon: 📦
    title: Image Management
    details: Pull images with real-time progress, build from Dockerfile, delete and clean up unused images.
  - icon: 🕸️
    title: Network Management
    details: Create custom networks, configure subnets and gateways, and view container connection relationships.
  - icon: 💾
    title: Volume Management
    details: Create, delete and inspect local and NFS volumes.
  - icon: 🧩
    title: Compose Stacks
    details: YAML editor with one-click deployment (streaming output), start, stop and teardown.
  - icon: 🛍️
    title: App Store
    details: One-click install and upgrade of 260+ apps, with data sources automatically synced on first launch.
  - icon: 📊
    title: Real-time Monitoring
    details: Real-time charts for CPU, memory, network throughput and disk I/O — panel status at a glance.
  - icon: 🛡️
    title: Security
    details: TOTP two-factor authentication, security entry, domain whitelist, and Fail2ban login protection.
---

<HomeInstall />

## Documentation Navigation

| Section                                   | Content                                                                         |
| ----------------------------------------- | ------------------------------------------------------------------------------- |
| [Quick Start](/en/getting-started)        | Introduction, installation and first launch                                     |
| [Installation](/en/guide/installation/)   | Comparison of four methods: Docker / Compose / binary / one-click script        |
| [Usage Guide](/en/guide/usage/)           | Operations for containers, images, networks, volumes, Compose and the app store |
| [Configuration](/en/guide/configuration/) | Environment variables, panel settings, data directory and HTTPS                 |
| [Update & Uninstall](/en/guide/update/)   | Upgrading, online updates and uninstalling                                      |
| [Backup & Restore](/en/guide/backup)      | Data backup and restore                                                         |
| [FAQ](/en/faq)                            | Installation, connection and troubleshooting                                    |
| [Development](/en/development/)           | Local development, building and contribution guide                              |

## Community & Support

- [GitHub Repository](https://github.com/DockOrae/DockOrae) — Source code, Issues and Releases
- [Releases Page](https://github.com/DockOrae/DockOrae/releases) — Version history and binary downloads
- [GitHub Issues](https://github.com/DockOrae/DockOrae/issues) — Bug reports and feature suggestions
