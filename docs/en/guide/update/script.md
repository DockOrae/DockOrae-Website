---
title: One-Click Script Update
description: Update DockOrae with the install.sh one-click script (both Compose and binary deployment modes).
---

# One-Click Script Update

For panels installed with the one-click script, updating takes just one command:

```bash
sudo bash install.sh update
```

The script automatically performs the corresponding update based on the installation mode:

| Installation mode | Update action                                                                                             |
| ----------------- | --------------------------------------------------------------------------------------------------------- |
| Compose mode      | Pull the latest image → recreate the container with `docker compose up -d --force-recreate --pull always` |
| Binary mode       | Download the latest release → SHA256 verification → replace the binary → restart the systemd service      |

## Before Updating

```bash
# Confirm the installation and current status
sudo bash install.sh status

# Backing up first is recommended (optional but recommended)
sudo bash install.sh backup
```

## After Updating

```bash
sudo bash install.sh status   # confirm it is running properly
sudo bash install.sh info     # view the version and installation info
```

## Force Update

Not needed in general. If the panel's version detection behaves abnormally, you can force a reinstall (data is kept):

```bash
DM_FORCE=1 sudo bash install.sh install
```

::: warning
`DM_FORCE=1` performs an overwrite reinstall but **keeps the data directory**; if you run into tricky issues, it is recommended to run `sudo bash install.sh backup` first.
:::
