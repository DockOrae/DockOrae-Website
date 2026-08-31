---
title: 构建与发布
description: DockOrae 二进制构建、交叉编译、Docker 镜像构建与 GitHub Releases 发布流程。
---

# 构建与发布

## 二进制构建

主仓库提供 `Makefile` 管理构建:

```bash
make             # 完整构建:下载前端 dist + 编译后端
make web         # 仅下载前端 dist(DockOrae-Frontend rolling release → public/dist)
make backend     # 仅编译后端(需先 make web)
make cross       # 交叉编译全部 Linux 架构 → dist/*.tar.gz
make clean       # 清理构建产物
```

版本号通过 Git tag 自动注入(`git describe --tags`),也可用 `VERSION=x.y.z` 覆盖:

```bash
make cross VERSION=v1.0.5
```

## 交叉编译产物

`make cross` 生成(每个含 `.sha256` 校验文件):

```
dist/
├── dockorae-linux-amd64.tar.gz
├── dockorae-linux-arm64.tar.gz
├── dockorae-linux-armv5.tar.gz
├── dockorae-linux-armv6.tar.gz
├── dockorae-linux-armv7.tar.gz
├── dockorae-linux-386.tar.gz
└── dockorae-linux-s390x.tar.gz
```

## Docker 镜像构建

镜像由 CI 自动构建(`docker-publish.yml`),推送至 [Docker Hub](https://hub.docker.com/r/dockorae/dockorae):

- 多架构:`linux/amd64`、`linux/arm64`、`linux/arm/v7`、`linux/arm/v6`、`linux/s390x`
- 标签:`latest` + 最近 Git tag(如 `v1.0.4`)
- 镜像内置 `docker-compose` 二进制(在线更新 Compose 模式使用)

本地构建:

```bash
docker build -t dockorae/dockorae:latest .
```

::: note
前端产物通过 `go:embed` 嵌入二进制 —— 修改前端后必须重新构建后端(或重新拉取前端 dist)才生效。
:::

## 发布流程(GitHub Actions)

### 二进制 Release

推送 `v*` tag 自动触发 `release.yml`:

```bash
git tag v1.0.5
git push origin v1.0.5
```

流程:`make cross VERSION=<tag>` → 上传全部 `dist/*.tar.gz` + `.sha256` 到 GitHub Release。

### Docker 镜像

推送 `master` 分支(仅源码/前端/Dockerfile 改动)触发 `docker-publish.yml`,自动构建多架构镜像并推送 Docker Hub。

## 版本号管理

- 版本号以 **Git tag** 为准(`v1.0.4` 格式),打 tag 即可发布,无需改源码
- 构建时通过 ldflags 注入 `cmd.Version` / `cmd.Commit` / `cmd.BuildTime`
- 面板「关于」页与在线更新均读取该版本号
