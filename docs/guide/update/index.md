---
title: 更新概览
description: DockOrae 各安装方式的更新方法与升级前备份注意事项。
---

# 更新 DockOrae

DockOrae 更新非常频繁(修复与功能迭代),建议保持最新版本。各安装方式对应更新方法:

| 安装方式       | 更新方法                                      | 难度 |
| -------------- | --------------------------------------------- | ---- |
| 一键脚本       | `sudo bash install.sh update`                 | ⭐   |
| Docker Compose | `docker compose pull && docker compose up -d` | ⭐   |
| Docker         | 重新拉取镜像重建容器                          | ⭐⭐ |
| 二进制         | 下载新版替换并重启服务                        | ⭐⭐ |
| 任意方式       | **面板在线更新**(设置 → 更新)                 | ⭐   |

::: tip 推荐
**面板内置在线更新**:任何部署方式都支持,在面板中一键完成,无需登录服务器。见[面板在线更新](/guide/update/panel)。
:::

## 升级前备份

更新前建议备份数据(升级失败可回滚):

```bash
# 一键脚本方式
sudo bash install.sh backup

# 手动备份(compose 方式)
tar -czf dm-backup.tar.gz -C /opt/docker-manager/data .

# 手动备份(docker run 方式)
docker run --rm -v docker-manager-data:/data -v $(pwd):/backup alpine \
  tar -czf /backup/dm-backup.tar.gz -C /data .
```

更多备份细节见[备份与恢复](/guide/backup)。

## 查看当前版本

- 面板页脚显示当前版本号
- 一键脚本:`sudo bash install.sh info`
- 有新版时页脚版本号出现**粉色圆点提示**

## 更新失败怎么办

1. 查看错误信息,常见为网络问题(拉取镜像 / 下载二进制失败)
2. 国内网络可配置[镜像加速](/guide/configuration/panel#镜像加速)后重试
3. 数据未丢失 —— 更新只替换程序,数据目录不动
4. 如面板无法启动,用[卸载](/guide/uninstall/)流程保留数据重装,或从备份恢复

---

按你的安装方式查看详细更新步骤:

- [Compose 更新](/guide/update/docker) — 手动 compose / docker run 部署
- [二进制更新](/guide/update/binary)
- [一键脚本更新](/guide/update/script)
- [面板在线更新](/guide/update/panel)
