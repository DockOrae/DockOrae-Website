---
title:
  en: One-Click Script Update
  zh-CN: 一键脚本更新
description:
  en: Update DockOrae with the install.sh one-click script (both Compose and binary deployment modes).
  zh-CN: 使用 install.sh 一键更新 DockOrae(Compose 与二进制两种部署方式)。
categories:
  - guide
  - update
top: 90500
---

:::: en

For panels installed with the one-click script, updating takes just one command:

```bash
sudo bash install.sh update
```

The script automatically performs the corresponding update based on the installation mode:

| Installation mode | Update action                                                                                             |
| ----------------- | --------------------------------------------------------------------------------------------------------- |
| Compose mode      | Pull the latest image → recreate the container with `docker compose up -d --force-recreate --pull always` |
| Binary mode       | Download the latest release → SHA256 verification → replace the binary → restart the systemd service      |

## Before Updating { lang="en" }

```bash
sudo bash install.sh status

# Backing up first is recommended (optional but recommended)
sudo bash install.sh backup
```

## After Updating { lang="en" }

```bash
sudo bash install.sh status   # confirm it is running properly
sudo bash install.sh info     # view the version and installation info
```

## Force Update { lang="en" }

Not needed in general. If the panel's version detection behaves abnormally, you can force a reinstall (data is kept):

```bash
DM_FORCE=1 sudo bash install.sh install
```

::: warning
`DM_FORCE=1` performs an overwrite reinstall but **keeps the data directory**; if you run into tricky issues, it is recommended to run `sudo bash install.sh backup` first.

:::
::::

:::: zh-CN

由一键脚本安装的面板,更新只需一条命令:

```bash
sudo bash install.sh update
```

脚本根据安装方式自动执行对应更新:

| 安装方式     | 更新动作                                                                      |
| ------------ | ----------------------------------------------------------------------------- |
| Compose 方式 | 拉取最新镜像 → `docker compose up -d --force-recreate --pull always` 重建容器 |
| 二进制方式   | 下载最新版本 → SHA256 校验 → 替换二进制 → 重启 systemd 服务                   |

## 更新前 { lang="zh-CN" }

```bash
sudo bash install.sh status

# 建议先备份(可选但推荐)
sudo bash install.sh backup
```

## 更新后 { lang="zh-CN" }

```bash
sudo bash install.sh status   # 确认运行正常
sudo bash install.sh info     # 查看版本与安装信息
```

## 强制更新 { lang="zh-CN" }

一般无需。若面板版本检测异常,可强制重装(数据保留):

```bash
DM_FORCE=1 sudo bash install.sh install
```

::: warning
`DM_FORCE=1` 会覆盖重装但**保留数据目录**;如遇疑难问题,建议先 `sudo bash install.sh backup` 再操作。

:::
::::
