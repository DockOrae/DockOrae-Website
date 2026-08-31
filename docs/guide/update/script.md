---
title: 一键脚本更新
description: 使用 install.sh 一键更新 DockOrae(Compose 与二进制两种部署方式)。
---

# 一键脚本更新

由一键脚本安装的面板,更新只需一条命令:

```bash
sudo bash install.sh update
```

脚本根据安装方式自动执行对应更新:

| 安装方式     | 更新动作                                                                      |
| ------------ | ----------------------------------------------------------------------------- |
| Compose 方式 | 拉取最新镜像 → `docker compose up -d --force-recreate --pull always` 重建容器 |
| 二进制方式   | 下载最新版本 → SHA256 校验 → 替换二进制 → 重启 systemd 服务                   |

## 更新前

```bash
# 确认已安装与当前状态
sudo bash install.sh status

# 建议先备份(可选但推荐)
sudo bash install.sh backup
```

## 更新后

```bash
sudo bash install.sh status   # 确认运行正常
sudo bash install.sh info     # 查看版本与安装信息
```

## 强制更新

一般无需。若面板版本检测异常,可强制重装(数据保留):

```bash
DM_FORCE=1 sudo bash install.sh install
```

::: warning
`DM_FORCE=1` 会覆盖重装但**保留数据目录**;如遇疑难问题,建议先 `sudo bash install.sh backup` 再操作。
:::
