---
title: 本地开发
description: DockOrae 本地开发环境搭建 — 仓库结构、前后端开发模式、环境要求。
---

# 本地开发

## 仓库结构

DockOrae 采用前后端分离仓库:

| 仓库                                                                        | 说明                                         |
| --------------------------------------------------------------------------- | -------------------------------------------- |
| [DockOrae/DockOrae](https://github.com/DockOrae/DockOrae)                   | 主仓库:Go 后端(gin + Moby SDK)+ 前端产物嵌入 |
| [DockOrae/DockOrae-Frontend](https://github.com/DockOrae/DockOrae-Frontend) | 前端仓库:Vue 3 + TypeScript                  |
| [DockOrae/DockOrae-Apps](https://github.com/DockOrae/DockOrae-Apps)         | 应用商店数据源                               |
| [DockOrae/DockOrae-Website](https://github.com/DockOrae/DockOrae-Website)   | 本文档站                                     |

### 后端结构

```
main.go                    # 入口(极薄,仅调用 cmd.Execute())
cmd/
├── execute.go             # 启动流程:flags → config → state → server
├── server.go              # HTTP/HTTPS 服务(优雅关闭)
├── tls.go                 # TLS 配置(SNI 白名单)
├── web.go                 # 前端静态资源(go:embed)
├── version.go             # 构建信息(ldflags 注入)
└── flags/config.go        # 命令行 flag(-data / -port)
internal/
├── api/                   # gin 路由与 handler
├── appstore/              # 应用商店
├── auth/                  # JWT / TOTP
├── config/                # 配置加载
├── db/                    # SQLite(modernc.org/sqlite,无 CGO)
├── docker/                # Docker 客户端封装
├── settings/              # 面板设置
├── state/                 # 内存状态
└── service/               # 业务逻辑
```

## 环境要求

- **Go 1.22+**(以 `go.mod` 为准)
- **Node.js 20+**(前端)
- 本机运行 Docker(或 `DOCKER_HOST` 指向远程 daemon)

## 前端开发模式

```bash
# 1. 克隆前端仓库到主仓库同级目录
git clone https://github.com/DockOrae/DockOrae-Frontend.git ../DockOrae-Frontend

# 2. 启动后端(后端需能访问 Docker)
cd <主仓库目录>
go run .

# 3. 前端开发服务器(vite :5173,API 代理到 :8080)
make dev
# 或手动:
cd ../DockOrae-Frontend && npm install && npm run dev
```

访问 `http://localhost:5173`,前端热更新,API 自动代理到后端。

## 后端开发

```bash
# 完整构建(下载前端 dist + 编译后端)
make

# 仅构建后端(需先 make web 下载前端产物)
make backend

# 运行
make run
```

## 质量检查

```bash
# 与 CI 一致:go vet + go test + go test -race
make test
```

前端质量检查见前端仓库 `package.json`:

```bash
npm run typecheck   # vue-tsc 类型检查
npm run lint        # ESLint
npm run i18n-check  # 14 语言 key 一致性检查
```

## 本文档站开发

```bash
npm install
npm run dev          # http://localhost:5173(文档站)
npm run build        # 生产构建(含版本号拉取与 sitemap)
```

## 提交规范

- 后端改动需通过 `make test`(CI 中 `go-checks.yml` 会执行)
- 前端改动需通过 `typecheck` + `lint` + `i18n-check`
- 提交信息建议使用中文,清晰描述改动
