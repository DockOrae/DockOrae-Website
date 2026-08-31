---
title: App Store
description: DockOrae App Store — one-click install and upgrade of 260+ apps, automatic sync, upgrade badges, and parameter forms.
---

# App Store

Go to the **App Store** page to install commonly used apps with one click (Nginx, MySQL, Redis, WordPress, and 260+ more; the data source is aligned with the 1Panel App Store).

## Automatic Sync on First Launch

App store data (icons, parameter forms, multi-version compose templates) comes from the [DockOrae/DockOrae-Apps](https://github.com/DockOrae/DockOrae-Apps) repository.

**On first launch, the panel automatically syncs once in the background** (data is only fetched when the data directory is empty — idempotent), so a fresh deployment already has data when the App Store is opened, **with no manual action required**.

## Browsing and Searching

- **Category** filter on the left (categories include Website, Database, Dev Tools, etc.)
- Search box at the top to find apps by name

## Installing an App

1. Select an app to open its detail page
2. Choose the **version** (multiple versions are supported)
3. Fill in the **parameter form** (same structure as 1Panel: ports, passwords, storage directories, etc., with input hints)
4. Click **Install**

Installation process:

- Automatically creates the `1panel-network` external network
- Renders the compose from the template and deploys it, showing logs in real time
- Once finished, the app appears in the container list

::: note
Installing apps is a Pro feature and requires a valid [license](/en/guide/configuration/panel#license).
:::

## Upgrading an App

If a newer version of an installed app is available, a yellow **"Upgrade available"** badge is shown at the top-right corner of the card:

1. Click **Upgrade** on the app card
2. The panel re-renders the template of the latest version (keeping your parameters)
3. Confirm to recreate the container

## Sync and Updates

- The **"Sync App Store"** button at the top right — manually fetches the latest app data (new apps / new versions)
- The panel also automatically checks for sync on every startup

### Offline / Intranet Environments

Override the data source via environment variables (in Compose deployments, configure them in `environment`):

| Variable           | Description                                                   |
| ------------------ | ------------------------------------------------------------- |
| `DM_APPSTORE_REPO` | Data repository, default `DockOrae/DockOrae-Apps`             |
| `DM_APPSTORE_URL`  | Data package download URL (use when mirroring on an intranet) |

## Uninstalling an App

Click **Uninstall** on the app detail page to remove the app's containers and networks (**data volumes are kept by default** and must be cleaned up manually).

## FAQ

**App store is empty?** The initial sync may not have finished yet (it runs asynchronously in the background); click **"Sync App Store"** at the top right to trigger it manually. If the sync fails, check the network from the server to GitHub, or configure the `DM_APPSTORE_URL` intranet mirror.

**How does the "Upgrade available" badge appear?** The panel compares the installed version with the latest version in the store and shows the badge when they do not match; click Upgrade to update.
