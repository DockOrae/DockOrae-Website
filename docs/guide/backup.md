---
title: 备份与恢复
description: DockOrae 数据备份与恢复 — install.sh backup/restore、手动备份、数据目录迁移。
---

# 备份与恢复

DockOrae 的全部数据(数据库、设置、用户、应用商店数据)都在**数据目录**中,备份 = 打包数据目录,恢复 = 解压回去。

## 一键备份 / 恢复(推荐)

由一键脚本安装的面板:

```bash
# 备份:生成 /opt/docker-manager/backups/dm-backup-<时间戳>.tar.gz
sudo bash install.sh backup

# 恢复:列出备份供选择,恢复前自动停止服务
sudo bash install.sh restore
```

脚本备份的是整个数据目录(`DM_DATA_DIR`),包含数据库、设置与用户。

## 手动备份

### Compose 方式

```bash
# 停面板备份更稳(可选)
docker compose stop

# 打包数据目录
tar -czf dm-backup-$(date +%F).tar.gz -C /opt/docker-manager/data .

# 备份完再启动
docker compose start
```

### Docker 方式(数据卷)

```bash
docker run --rm \
  -v docker-manager-data:/data \
  -v $(pwd):/backup \
  alpine tar -czf /backup/dm-backup.tar.gz -C /data .
```

### 二进制方式

```bash
tar -czf dm-backup.tar.gz -C /opt/docker-manager/data .
```

## 恢复

```bash
# compose 方式
docker compose stop
rm -rf /opt/docker-manager/data && mkdir -p /opt/docker-manager/data
tar xzf dm-backup.tar.gz -C /opt/docker-manager/data
docker compose start

# docker run 方式
docker run --rm -v docker-manager-data:/data -v $(pwd):/backup alpine \
  sh -c "rm -rf /data/* && tar xzf /backup/dm-backup.tar.gz -C /data"
docker restart docker-manager-go
```

::: warning
恢复会**覆盖当前数据**。恢复前如当前数据有新增,先备份当前数据。
:::

## 定时备份(可选)

宿主机 crontab 示例:每天 02:00 备份,保留 7 天:

```txt
0 2 * * * tar -czf /backup/dm-$(date +\%F).tar.gz -C /path/to/compose/data . && \
  find /backup -name 'dm-*.tar.gz' -mtime +7 -delete
```

::: tip 备份策略建议

- 数据库文件较小(几 MB 级),打包速度快,可以放心高频备份
- 备份文件请存放在**与面板数据不同的磁盘/机器**上(异地备份)
- 升级前、大操作前养成备份习惯
  :::

## 数据迁移

换服务器 / 重装系统时迁移数据:

1. 旧机器:备份数据目录(见上)
2. 新机器:按[安装文档](/guide/installation/)安装面板
3. 停止面板 → 解压备份到新数据目录 → 启动面板

> 注意:应用商店数据也包含在数据目录中,迁移后商店应用列表自动恢复。
