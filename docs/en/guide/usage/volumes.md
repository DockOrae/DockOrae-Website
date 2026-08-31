---
title: Volume Management
description: Create local and NFS storage volumes, delete and inspect volume details, understand the relationship between volumes and data persistence.
---

# Volume Management

Go to the **Volumes** page to manage Docker volumes.

## What Is a Volume

A Docker volume is a data storage unit **independent of the container lifecycle**. The volume and its data remain after the container is deleted, making volumes the standard way to persist data:

```
Container (can be deleted and recreated anytime)
   │ mount
   ▼
Docker volume (data persists independently)
```

## Volume List

Displays the volume name, driver, mount point, and the containers using it.

## Creating a Volume

Click **Create Volume**; two types are supported:

| Type             | Description                                                                                    |
| ---------------- | ---------------------------------------------------------------------------------------------- |
| **Local volume** | Data is stored in the Docker data directory on the host; ready to use as soon as it is created |
| **NFS volume**   | Mounts remote NFS shared storage; suitable for sharing data across multiple machines           |

NFS volumes require: server address, shared path, and mount options (e.g. `addr=<ip>,rw`).

## Viewing Details

Click a volume to view its details: mount point, creation time, connected containers, and volume labels.

## Deleting a Volume

::: danger
Deleting a volume will **permanently delete all the data in it**! First make sure no container is using it, and confirm that the data has been backed up.
:::

## FAQ

**Cannot delete volume "volume is in use"?** Containers still have the volume mounted. Delete (or stop) the related containers first.

**Does the volume still exist after the container is deleted?** Yes — Docker volumes are not deleted along with containers by default. That is why **deleting a container ≠ deleting the data**.
