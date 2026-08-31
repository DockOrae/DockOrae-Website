---
layout: home

title: DockOrae Docs
description: 'DockOrae 官方文档 — 现代化的 Docker 管理面板:容器、镜像、网络、存储卷、Compose、应用商店一站式管理。'

hero:
  name: DockOrae
  text: 现代 Docker 管理平台
  tagline: 使用 Go 编写的轻量级 Docker 管理面板。容器、镜像、网络、存储卷、Compose 与应用商店,一站式管理你的 Docker 环境。
  image:
    src: /logo.svg
    alt: DockOrae
  actions:
    - theme: brand
      text: 快速开始
      link: /getting-started
    - theme: alt
      text: 安装 DockOrae
      link: /guide/installation/docker-compose

features:
  - icon: 🐳
    title: 容器管理
    details: 创建、启动、停止、重启、暂停、删除与检查,内置 Web 终端与实时日志。
  - icon: 📦
    title: 镜像管理
    details: 实时进度拉取、从 Dockerfile 构建、删除与清理未使用的镜像。
  - icon: 🕸️
    title: 网络管理
    details: 创建自定义网络,配置子网与网关,查看容器连接关系。
  - icon: 💾
    title: 存储卷管理
    details: 本地与 NFS 卷的创建、删除与详情检查。
  - icon: 🧩
    title: Compose 栈
    details: YAML 编辑器与一键部署(流式输出),启动、停止与拆除。
  - icon: 🛍️
    title: 应用商店
    details: 260+ 个应用一键安装与升级,首次启动自动同步数据源。
  - icon: 📊
    title: 实时监控
    details: CPU、内存、网络吞吐与磁盘 I/O 实时曲线,一眼掌握面板状态。
  - icon: 🛡️
    title: 安全
    details: TOTP 双因素认证、安全入口、域名白名单、Fail2ban 登录防护。
---

<HomeInstall />

## 文档导航

| 章节                          | 内容                                             |
| ----------------------------- | ------------------------------------------------ |
| [快速开始](/getting-started)  | 简介、安装与第一次启动                           |
| [安装](/guide/installation/)  | Docker / Compose / 二进制 / 一键脚本四种方式对比 |
| [使用指南](/guide/usage/)     | 容器、镜像、网络、存储卷、Compose 与应用商店操作 |
| [配置](/guide/configuration/) | 环境变量、面板设置、数据目录与 HTTPS             |
| [更新与卸载](/guide/update/)  | 升级、在线更新与卸载                             |
| [备份与恢复](/guide/backup)   | 数据备份与恢复                                   |
| [常见问题](/faq)              | 安装、连接与排障                                 |
| [开发](/development/)         | 本地开发、构建与贡献指南                         |

## 社区与支持

- [GitHub 仓库](https://github.com/DockOrae/DockOrae) — 源码、Issue 与 Releases
- [Releases 发布页](https://github.com/DockOrae/DockOrae/releases) — 版本记录与二进制下载
- [GitHub Issues](https://github.com/DockOrae/DockOrae/issues) — 问题反馈与建议
