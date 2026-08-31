---
title: 数据目录与持久化
description: DockOrae 数据存储结构、Docker Socket 说明与安全风险、数据持久化最佳实践。
---

# 数据目录与持久化

## 数据目录结构

面板数据统一存放在数据目录(容器内 `/data`):

```
/data
├── docker-manager.db     # SQLite 数据库(用户、设置、事件)
├── config.json           # JWT 密钥(自动生成)
├── license.json          # 许可证激活令牌
├── cert/                 # HTTPS 证书(compose 方式挂载自宿主机 ./cert)
└── ...                   # 应用商店数据等
```

| 安装方式          | 宿主机数据位置                     |
| ----------------- | ---------------------------------- |
| 一键脚本(compose) | `/opt/docker-manager/data`         |
| 一键脚本(二进制)  | `/opt/docker-manager/data`         |
| 手动 compose      | `./data`(compose 文件所在目录)     |
| 手动 docker run   | Docker 卷 `docker-manager-data`    |
| 手动二进制        | `DATA_DIR` 环境变量(默认 `./data`) |

## 数据持久化原理

```
宿主机存储(数据真正所在)
     │  volume / bind mount
     ▼
容器内 /data
     │
     ▼
SQLite / 配置 / 证书 / 应用商店数据
```

**核心结论:删除容器 ≠ 删除数据。**

- 容器随时可以删除、重建、升级,只要卷或挂载目录还在,数据就不会丢
- 升级 / 卸载前确认数据目录位置,备份或保留它

## Docker Socket

面板通过 Docker Socket 与 Docker daemon 通信:

```
DockOrae(容器)
   ↓ 挂载 /var/run/docker.sock
Docker API
   ↓
Docker Engine
```

- **Linux**:`/var/run/docker.sock`(必须挂载,compose 与 docker run 方式)
- **二进制方式**:面板直接访问本机 socket,无需挂载
- **远程 daemon**:设置 `DOCKER_HOST=tcp://<host>:2375`(同时不要挂载 socket)

::: danger 安全警告
`/var/run/docker.sock` 拥有对 Docker daemon 的**完整控制权,等价于宿主机 root 权限**。请勿:

- 将面板的 8080 端口直接暴露到公网(建议防火墙限制来源 IP 或走 HTTPS 反代)
- 将 docker.sock 挂载到不可信容器

这是 Docker 生态的通用安全模型(与 Portainer 等面板相同),务必重视。
:::

### Docker rootless

rootless Docker 的 socket 位于用户目录:

```yaml
volumes:
  - /run/user/1000/docker.sock:/var/run/docker.sock
```

## 备份数据

备份 = 打包数据目录:

```bash
# 一键脚本
sudo bash install.sh backup        # 生成到 /opt/docker-manager/backups/

# 手动(compose 方式)
tar -czf dm-backup.tar.gz -C /opt/docker-manager/data .

# 手动(docker run 方式,卷)
docker run --rm -v docker-manager-data:/data -v $(pwd):/backup alpine \
  tar -czf /backup/dm-backup.tar.gz -C /data .
```

恢复与更多说明见[备份与恢复](/guide/backup)。

## 清理数据

彻底删除所有数据(谨慎,不可恢复):

```bash
# 脚本安装
sudo rm -rf /opt/docker-manager/data

# docker run 安装
docker volume rm docker-manager-data

# compose 安装
rm -rf ./data
```
