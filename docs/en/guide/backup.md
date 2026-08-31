---
title: Backup & Restore
description: DockOrae data backup and restore — install.sh backup/restore, manual backups, data directory migration.
---

# Backup & Restore

All of DockOrae's data (database, settings, users, app store data) lives in the **data directory** — backing up means archiving the data directory, and restoring means extracting it back.

## One-click backup / restore (recommended)

For panels installed with the one-click script:

```bash
# Backup: generates /opt/docker-manager/backups/dm-backup-<timestamp>.tar.gz
sudo bash install.sh backup

# Restore: lists backups to choose from and stops the services automatically before restoring
sudo bash install.sh restore
```

The script backs up the entire data directory (`DM_DATA_DIR`), including the database, settings, and users.

## Manual backup

### Compose method

```bash
# Stop the panel for a safer backup (optional)
docker compose stop

# Archive the data directory
tar -czf dm-backup-$(date +%F).tar.gz -C /opt/docker-manager/data .

# Start it again after backing up
docker compose start
```

### Docker method (data volume)

```bash
docker run --rm \
  -v docker-manager-data:/data \
  -v $(pwd):/backup \
  alpine tar -czf /backup/dm-backup.tar.gz -C /data .
```

### Binary method

```bash
tar -czf dm-backup.tar.gz -C /opt/docker-manager/data .
```

## Restore

```bash
# Compose method
docker compose stop
rm -rf /opt/docker-manager/data && mkdir -p /opt/docker-manager/data
tar xzf dm-backup.tar.gz -C /opt/docker-manager/data
docker compose start

# docker run method
docker run --rm -v docker-manager-data:/data -v $(pwd):/backup alpine \
  sh -c "rm -rf /data/* && tar xzf /backup/dm-backup.tar.gz -C /data"
docker restart docker-manager-go
```

::: warning
Restoring **overwrites the current data**. If the current data has any additions since the last backup, back it up first before restoring.
:::

## Scheduled backups (optional)

Example host crontab: back up every day at 02:00 and keep 7 days of backups:

```txt
0 2 * * * tar -czf /backup/dm-$(date +\%F).tar.gz -C /path/to/compose/data . && \
  find /backup -name 'dm-*.tar.gz' -mtime +7 -delete
```

::: tip Backup strategy recommendations

- The database file is small (a few MB), so archiving is fast — feel free to back up frequently
- Store backup files on a **different disk/machine than the panel data** (off-site backup)
- Get into the habit of backing up before upgrades and major operations
  :::

## Data migration

To migrate data when switching servers or reinstalling the OS:

1. On the old machine: back up the data directory (see above)
2. On the new machine: install the panel following the [installation docs](/en/guide/installation/)
3. Stop the panel → extract the backup into the new data directory → start the panel

> Note: app store data is also included in the data directory; after migration, the store's app list is restored automatically.
