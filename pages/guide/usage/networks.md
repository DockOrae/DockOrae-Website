---
title:
  en: Network Management
  zh-CN: 网络管理
description:
  en: Create custom Docker networks, configure subnets and gateways, view container connections.
  zh-CN: 创建自定义 Docker 网络、配置子网与网关、查看容器连接关系。
categories:
  - guide
  - usage
top: 94500
---

:::: en

Go to the **Networks** page to manage Docker networks.

## Network List { lang="en" }

Displays the network name, driver type (bridge / host / overlay, etc.), scope, and the number of connected containers.

## Creating a Network { lang="en" }

Click **Create Network** and fill in:

| Field   | Description                                              |
| ------- | -------------------------------------------------------- |
| Name    | Network name                                             |
| Driver  | Defaults to `bridge` (single host); overlay is for Swarm |
| Subnet  | e.g. `172.20.0.0/24`                                     |
| Gateway | e.g. `172.20.0.1`                                        |

::: tip
When installing apps from the app store, the `1panel-network` external network is automatically created and used, so that apps managed by the panel can communicate with each other.

:::

## Viewing Details { lang="en" }

Click a network to view its details: subnet / gateway configuration and the **list of connected containers**.

## Deleting a Network { lang="en" }

::: warning
Before deleting a network, make sure no container is connected to it; if the network is in use, the deletion will fail.

:::

## FAQ { lang="en" }

**Creating a network fails with "subnet already exists"?** The subnet range conflicts with an existing network. Use a different range, or delete the network that occupies that range.

::::
:::: zh-CN

进入 **网络** 页面,管理 Docker 网络。

## 网络列表 { lang="zh-CN" }

显示网络名称、驱动类型(bridge / host / overlay 等)、作用域与已连接的容器数量。

## 创建网络 { lang="zh-CN" }

点击 **创建网络**,填写:

| 配置项 | 说明                                   |
| ------ | -------------------------------------- |
| 名称   | 网络名称                               |
| 驱动   | 默认 `bridge`(单机);overlay 用于 Swarm |
| 子网   | 如 `172.20.0.0/24`                     |
| 网关   | 如 `172.20.0.1`                        |

::: tip
应用商店安装应用时会自动创建并使用 `1panel-network` 外部网络,便于面板内各应用互通。

:::

## 查看详情 { lang="zh-CN" }

点击网络查看详情:子网 / 网关配置与**连接的容器列表**。

## 删除网络 { lang="zh-CN" }

::: warning
删除网络前请确保没有容器连接在该网络上;若网络被使用会删除失败。

:::

## 常见问题 { lang="zh-CN" }

**创建网络失败 "subnet already exists"?** 子网段与已有网络冲突,换一个网段,或删除占用该网段的网络。

::::
