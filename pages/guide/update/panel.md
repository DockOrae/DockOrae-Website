---
title:
  en: Panel Online Update
  zh-CN: 面板在线更新
description:
  en: Update DockOrae with one click in the panel — automatically detects new versions and routes the update flow by deployment method.
  zh-CN: 在面板内一键更新 DockOrae — 自动检测新版本、按部署方式自动分流更新流程。
categories:
  - guide
  - update
top: 90000
---

:::: en

DockOrae has a built-in **online update** feature — complete upgrades with one click in the panel, without logging into the server.

## Check for Updates { lang="en" }

- The panel silently checks GitHub Releases **every 10 minutes**
- When a new version is available, a **pink dot indicator** appears next to the footer version number

## Perform the Update { lang="en" }

1. Click the footer version number (or the pink dot)
2. The update details pop up: current version vs. latest version, release time, and release notes
3. Click **Update Now**; after confirmation, the update runs automatically

## How the Update Works { lang="en" }

The panel automatically detects the deployment method and chooses the corresponding update flow:

| Deployment method                       | Update flow                                                                                                                                                                                                                                                                            |
| --------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Compose deployment** (in a container) | Detect the host's compose file → start an independent `dm-update-helper` helper container (mounts docker.sock, cleans up automatically) → run `compose up -d --force-recreate --pull always` → the panel container is recreated and recovers automatically after a brief disconnection |
| **Binary deployment** (systemd)         | Download the latest binary → atomic replacement (keeping a `.old` backup) → restart the service after 1.5 seconds                                                                                                                                                                      |

- Deployment method auto-detection: inside a container (cgroup contains a container ID) = compose, otherwise = binary
- You can force it with the `DM_DEPLOY_MODE=compose|binary` environment variable
- After the update finishes, the frontend automatically confirms the new version is live and shows a success message

## Notes { lang="en" }

| Scenario                                  | Description                                                                                                                                                           |
| ----------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Compose mode cannot find the compose file | The panel shows the **detected paths**; for special cases such as the data directory not being under the install directory, use `sudo bash install.sh update` instead |
| Binary mode permissions                   | root permissions are required (write to `/usr/local/bin` + systemctl)                                                                                                 |
| Detection failure                         | Shows "Failed to check for updates" (network unreachable / GitHub API rate-limited); this does not affect panel usage, and it retries automatically on the next cycle |

## After Updating { lang="en" }

- The footer version number updates to the latest version
- Data (settings, containers, app store) is unaffected
- If something goes wrong after the update, go back to the server and run `sudo bash install.sh update`, or check the [FAQ](/faq)

::::
:::: zh-CN

DockOrae 内置**在线更新**功能,无需登录服务器,在面板中一键完成升级。

## 检查更新 { lang="zh-CN" }

- 面板**每 10 分钟**静默检查一次 GitHub Releases
- 有新版本时,页脚版本号旁出现**粉色圆点提示**

## 执行更新 { lang="zh-CN" }

1. 点击页脚版本号(或粉色圆点)
2. 弹出更新详情:当前版本 vs 最新版本、发布时间、更新说明
3. 点击 **立即更新**,确认后自动执行

## 更新原理 { lang="zh-CN" }

面板自动检测部署方式,选择对应更新流程:

| 部署方式                 | 更新流程                                                                                                                                                                         |
| ------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Compose 部署**(容器内) | 探测宿主机 compose 文件 → 启动独立 `dm-update-helper` 辅助容器(挂载 docker.sock,自动清理)→ 执行 `compose up -d --force-recreate --pull always` → 面板容器重建,短暂断连后自动恢复 |
| **二进制部署**(systemd)  | 下载最新二进制 → 原子替换(保留 `.old` 备份)→ 1.5 秒后重启服务                                                                                                                    |

- 部署方式自动判断:容器内(cgroup 含容器 ID)= compose,否则 = binary
- 可用 `DM_DEPLOY_MODE=compose|binary` 环境变量强制指定
- 更新完成后前端自动确认新版本上线,提示成功

## 注意事项 { lang="zh-CN" }

| 场景                            | 说明                                                                                             |
| ------------------------------- | ------------------------------------------------------------------------------------------------ |
| Compose 方式找不到 compose 文件 | 面板会提示**已探测的路径**;数据目录不在安装目录下等特殊情况,请改用 `sudo bash install.sh update` |
| 二进制方式权限                  | 需要 root 权限(写 `/usr/local/bin` + systemctl)                                                  |
| 检测失败                        | 显示「检查更新失败」(网络不通 / GitHub API 限流),不影响面板使用,下个周期自动重试                 |

## 更新后 { lang="zh-CN" }

- 页脚版本号更新为最新版本
- 数据(设置、容器、应用商店)不受影响
- 如更新后异常,可回到服务器执行 `sudo bash install.sh update` 或查看[常见问题](/faq)

::::
