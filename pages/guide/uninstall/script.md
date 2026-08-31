---
title:
  en: One-click Script Uninstall
  zh-CN: 一键脚本卸载
description:
  en: Uninstall DockOrae with install.sh uninstall, plus data cleanup and reinstallation instructions.
  zh-CN: 使用 install.sh uninstall 卸载 DockOrae,以及数据清理与重装说明。
categories:
  - guide
  - uninstall
top: 87500
---

:::: en

For panels installed with the one-click script, uninstalling takes a single command:

```bash
sudo bash install.sh uninstall
```

The script will:

1. Confirm the uninstall (defaults to **keeping your data**)
2. Compose method: run `docker compose down` to stop and remove the containers
3. Binary method: stop and disable the systemd service, remove the service file and the `/usr/local/bin/dockorae` symlink
4. Ask whether to also delete the installation directory (**data is still kept**)

## After uninstalling { lang="en" }

- The panel is stopped and the data remains in `/opt/docker-manager/data`
- To reinstall, run `bash <(curl -Ls https://raw.githubusercontent.com/DockOrae/DockOrae/master/install.sh)` and your data will be restored automatically

## Deleting data permanently { lang="en" }

::: danger Irrecoverable

```bash
sudo rm -rf /opt/docker-manager/data

# To delete the installation directory as well
sudo rm -rf /opt/docker-manager
```

:::

## Reinstalling { lang="en" }

```bash
# Reinstall while keeping the data
bash <(curl -Ls https://raw.githubusercontent.com/DockOrae/DockOrae/master/install.sh)

# Force reinstall with overwrite (data kept)
DM_FORCE=1 sudo bash install.sh install
```

::::
:::: zh-CN

由一键脚本安装的面板,卸载一条命令:

```bash
sudo bash install.sh uninstall
```

脚本会:

1. 确认卸载(默认 **保留数据**)
2. Compose 方式:`docker compose down` 停止并删除容器
3. 二进制方式:停止并禁用 systemd 服务、删除服务文件与 `/usr/local/bin/dockorae` 链接
4. 询问是否同时删除安装目录(**数据仍然保留**)

## 卸载后 { lang="zh-CN" }

- 面板已停止,数据仍在 `/opt/docker-manager/data`
- 重新安装时执行 `bash <(curl -Ls https://raw.githubusercontent.com/DockOrae/DockOrae/master/install.sh)`,数据自动恢复

## 彻底删除数据 { lang="zh-CN" }

::: danger 不可恢复

```bash
sudo rm -rf /opt/docker-manager/data

# 如需连安装目录一起删除
sudo rm -rf /opt/docker-manager
```

:::

## 重新安装 { lang="zh-CN" }

```bash
# 保留数据重装
bash <(curl -Ls https://raw.githubusercontent.com/DockOrae/DockOrae/master/install.sh)

# 强制覆盖重装(数据保留)
DM_FORCE=1 sudo bash install.sh install
```

::::
