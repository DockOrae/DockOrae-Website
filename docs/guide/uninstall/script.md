---
title: 一键脚本卸载
description: 使用 install.sh uninstall 卸载 DockOrae,以及数据清理与重装说明。
---

# 一键脚本卸载

由一键脚本安装的面板,卸载一条命令:

```bash
sudo bash install.sh uninstall
```

脚本会:

1. 确认卸载(默认 **保留数据**)
2. Compose 方式:`docker compose down` 停止并删除容器
3. 二进制方式:停止并禁用 systemd 服务、删除服务文件与 `/usr/local/bin/dockorae` 链接
4. 询问是否同时删除安装目录(**数据仍然保留**)

## 卸载后

- 面板已停止,数据仍在 `/opt/docker-manager/data`
- 重新安装时执行 `bash <(curl -Ls https://raw.githubusercontent.com/DockOrae/DockOrae/master/install.sh)`,数据自动恢复

## 彻底删除数据

::: danger 不可恢复

```bash
# 数据目录(数据库、设置、用户)—— 确认已备份再执行
sudo rm -rf /opt/docker-manager/data

# 如需连安装目录一起删除
sudo rm -rf /opt/docker-manager
```

:::

## 重新安装

```bash
# 保留数据重装
bash <(curl -Ls https://raw.githubusercontent.com/DockOrae/DockOrae/master/install.sh)

# 强制覆盖重装(数据保留)
DM_FORCE=1 sudo bash install.sh install
```
