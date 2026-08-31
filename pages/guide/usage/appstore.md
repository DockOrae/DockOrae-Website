---
title:
  en: App Store
  zh-CN: 应用商店
description:
  en: DockOrae App Store — one-click install and upgrade of 260+ apps, automatic sync, upgrade badges, and parameter forms.
  zh-CN: DockOrae 应用商店 — 260+ 应用一键安装与升级、自动同步、可升级徽标与参数表单。
categories:
  - guide
  - usage
top: 93000
---

:::: en

Go to the **App Store** page to install commonly used apps with one click (Nginx, MySQL, Redis, WordPress, and 260+ more; the data source is aligned with the 1Panel App Store).

## Automatic Sync on First Launch { lang="en" }

App store data (icons, parameter forms, multi-version compose templates) comes from the [DockOrae/DockOrae-Apps](https://github.com/DockOrae/DockOrae-Apps) repository.

**On first launch, the panel automatically syncs once in the background** (data is only fetched when the data directory is empty — idempotent), so a fresh deployment already has data when the App Store is opened, **with no manual action required**.

## Browsing and Searching { lang="en" }

- **Category** filter on the left (categories include Website, Database, Dev Tools, etc.)
- Search box at the top to find apps by name

## Installing an App { lang="en" }

1. Select an app to open its detail page
2. Choose the **version** (multiple versions are supported)
3. Fill in the **parameter form** (same structure as 1Panel: ports, passwords, storage directories, etc., with input hints)
4. Click **Install**

Installation process:

- Automatically creates the `1panel-network` external network
- Renders the compose from the template and deploys it, showing logs in real time
- Once finished, the app appears in the container list

::: info
Installing apps is a Pro feature and requires a valid [license](/guide/configuration/panel#license).

:::

## Upgrading an App { lang="en" }

If a newer version of an installed app is available, a yellow **"Upgrade available"** badge is shown at the top-right corner of the card:

1. Click **Upgrade** on the app card
2. The panel re-renders the template of the latest version (keeping your parameters)
3. Confirm to recreate the container

## Sync and Updates { lang="en" }

- The **"Sync App Store"** button at the top right — manually fetches the latest app data (new apps / new versions)
- The panel also automatically checks for sync on every startup

### Offline / Intranet Environments { lang="en" }

Override the data source via environment variables (in Compose deployments, configure them in `environment`):

| Variable           | Description                                                   |
| ------------------ | ------------------------------------------------------------- |
| `DM_APPSTORE_REPO` | Data repository, default `DockOrae/DockOrae-Apps`             |
| `DM_APPSTORE_URL`  | Data package download URL (use when mirroring on an intranet) |

## Uninstalling an App { lang="en" }

Click **Uninstall** on the app detail page to remove the app's containers and networks (**data volumes are kept by default** and must be cleaned up manually).

## FAQ { lang="en" }

**App store is empty?** The initial sync may not have finished yet (it runs asynchronously in the background); click **"Sync App Store"** at the top right to trigger it manually. If the sync fails, check the network from the server to GitHub, or configure the `DM_APPSTORE_URL` intranet mirror.

**How does the "Upgrade available" badge appear?** The panel compares the installed version with the latest version in the store and shows the badge when they do not match; click Upgrade to update.

::::
:::: zh-CN

进入 **应用商店** 页面,一键安装常用应用(Nginx、MySQL、Redis、WordPress 等 260+ 个,数据源对齐 1Panel 应用商店)。

## 首次启动自动同步 { lang="zh-CN" }

应用商店数据(图标、参数表单、多版本 compose 模板)来自 [DockOrae/DockOrae-Apps](https://github.com/DockOrae/DockOrae-Apps) 仓库。

**首次启动时面板会在后台自动同步一次**(检测数据目录中无数据才拉取,幂等),全新部署打开应用商店即有数据,**无需手动操作**。

## 浏览与搜索 { lang="zh-CN" }

- 左侧**分类**筛选(中文分类,如 建站 / 数据库 / 开发工具 等)
- 顶部搜索框按名称查找

## 安装应用 { lang="zh-CN" }

1. 选择应用,进入详情页
2. 选择**版本**(支持多版本)
3. 填写**参数表单**(1Panel 同款结构:端口、密码、存储目录等,带填写提示)
4. 点击 **安装**

安装过程:

- 自动创建 `1panel-network` 外部网络
- 按模板渲染 compose 并部署,实时显示日志
- 完成后应用出现在容器列表中

::: info
安装应用属于 Pro 功能,需要有效[许可证](/guide/configuration/panel#许可证)。

:::

## 升级应用 { lang="zh-CN" }

已安装的应用若存在新版本,卡片右上角显示**「可升级」黄色徽标**:

1. 点击应用卡片上的 **升级**
2. 面板重新渲染最新版本模板(保留你的参数)
3. 确认后重建容器

## 同步与更新 { lang="zh-CN" }

- 右上角 **「同步应用商店」** 按钮 — 手动拉取最新应用数据(新增应用 / 新版本)
- 面板每次启动也会自动检测同步

### 离线 / 内网环境 { lang="zh-CN" }

通过环境变量覆盖数据源(Compose 方式在 `environment` 中配置):

| 变量               | 说明                                   |
| ------------------ | -------------------------------------- |
| `DM_APPSTORE_REPO` | 数据仓库,默认 `DockOrae/DockOrae-Apps` |
| `DM_APPSTORE_URL`  | 数据包下载地址(内网镜像时使用)         |

## 卸载应用 { lang="zh-CN" }

应用详情页点击 **卸载**,删除应用容器与网络(**数据卷默认保留**,需手动清理)。

## 常见问题 { lang="zh-CN" }

**应用商店是空的?** 首次同步可能尚未完成(后台异步);点击右上角「同步应用商店」手动触发。若同步失败,检查服务器到 GitHub 的网络,或配置 `DM_APPSTORE_URL` 内网镜像。

**「可升级」徽标怎么出现的?** 面板对比已安装版本与商店最新版本,不一致时显示;点击升级即可。

::::
