---
title:
  en: Volume Management
  zh-CN: 存储卷管理
description:
  en: Create local and NFS storage volumes, delete and inspect volume details, understand the relationship between volumes and data persistence.
  zh-CN: 创建本地与 NFS 存储卷、删除与检查卷详情,理解卷与数据持久化的关系。
categories:
  - guide
  - usage
top: 94000
---

:::: en

Go to the **Volumes** page to manage Docker volumes.

## What Is a Volume { lang="en" }

A Docker volume is a data storage unit **independent of the container lifecycle**. The volume and its data remain after the container is deleted, making volumes the standard way to persist data:

```
Container (can be deleted and recreated anytime)
   │ mount
   ▼
Docker volume (data persists independently)
```

## Volume List { lang="en" }

Displays the volume name, driver, mount point, and the containers using it.

## Creating a Volume { lang="en" }

Click **Create Volume**; two types are supported:

| Type             | Description                                                                                    |
| ---------------- | ---------------------------------------------------------------------------------------------- |
| **Local volume** | Data is stored in the Docker data directory on the host; ready to use as soon as it is created |
| **NFS volume**   | Mounts remote NFS shared storage; suitable for sharing data across multiple machines           |

NFS volumes require: server address, shared path, and mount options (e.g. `addr=<ip>,rw`).

## Viewing Details { lang="en" }

Click a volume to view its details: mount point, creation time, connected containers, and volume labels.

## Deleting a Volume { lang="en" }

::: danger
Deleting a volume will **permanently delete all the data in it**! First make sure no container is using it, and confirm that the data has been backed up.

:::

## FAQ { lang="en" }

**Cannot delete volume "volume is in use"?** Containers still have the volume mounted. Delete (or stop) the related containers first.

**Does the volume still exist after the container is deleted?** Yes — Docker volumes are not deleted along with containers by default. That is why **deleting a container ≠ deleting the data**.

::::
:::: zh-CN

进入 **存储卷** 页面,管理 Docker 存储卷(Volumes)。

## 存储卷是什么 { lang="zh-CN" }

Docker 卷是**独立于容器生命周期**的数据存储单元。容器删除后卷与数据仍然保留,是数据持久化的标准方式:

```
容器(可随时删除重建)
   │ 挂载
   ▼
Docker 卷(数据独立存在)
```

## 卷列表 { lang="zh-CN" }

显示卷名称、驱动、挂载点与使用它的容器。

## 创建卷 { lang="zh-CN" }

点击 **创建卷**,支持两种类型:

| 类型              | 说明                                      |
| ----------------- | ----------------------------------------- |
| **本地卷(Local)** | 数据保存在宿主机 Docker 数据目录,创建即用 |
| **NFS 卷**        | 挂载远程 NFS 共享存储,适合多机共享数据    |

NFS 卷需填写:服务器地址、共享路径、挂载选项(如 `addr=<ip>,rw`)。

## 查看详情 { lang="zh-CN" }

点击卷查看详情:挂载点、创建时间、连接容器与卷标签。

## 删除卷 { lang="zh-CN" }

::: danger
删除卷会**永久删除其中的所有数据**!请先确认没有容器正在使用,并确认数据已备份。

:::

## 常见问题 { lang="zh-CN" }

**无法删除卷 "volume is in use"?** 还有容器挂载着该卷,先删除(或停止)相关容器。

**容器删除后卷还在吗?** 在的 —— Docker 卷默认不会随容器删除。这也是为什么**删除容器 ≠ 删除数据**。

::::
