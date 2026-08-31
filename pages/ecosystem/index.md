---
title:
  en: 生态项目
  zh-CN: 生态项目
description:
  en: DockOrae ecosystem — frontend, app store, license service and docs site.
  zh-CN: DockOrae 生态项目 — 前端、应用商店、许可证服务与文档站。
categories:
  - ecosystem
top: 100000
---

::: en

DockOrae is built from several independent repositories that work together:

## Core Projects

| Project                    | Repository                                                                            | Description                                                                       |
| -------------------------- | ------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------- |
| **DockOrae (Panel)**       | [DockOrae/DockOrae](https://github.com/DockOrae/DockOrae)                             | Main project: Go backend with embedded frontend, single-binary releases           |
| **DockOrae-Frontend**      | [DockOrae/DockOrae-Frontend](https://github.com/DockOrae/DockOrae-Frontend)           | Frontend: Vue 3 + TypeScript, developed separately, dist distributed and embedded |
| **DockOrae-Apps**          | [DockOrae/DockOrae-Apps](https://github.com/DockOrae/DockOrae-Apps)                   | App store data source: 260+ apps (icons / parameter forms / multiple versions)    |
| **Docker_Manager_License** | [DockOrae/Docker_Manager_License](https://github.com/DockOrae/Docker_Manager_License) | License issuance service: Ed25519 signing, device binding, online verification    |
| **DockOrae-Website**       | [DockOrae/DockOrae-Website](https://github.com/DockOrae/DockOrae-Website)             | This documentation site: VitePress, Chinese & English                             |

## Relationship

```
DockOrae-Frontend (frontend)
       │ build artifacts (rolling release)
       ▼
DockOrae (panel, embedded via go:embed)
       │
       ├──▶ DockOrae-Apps (app store data)
       └──▶ Docker_Manager_License (online licensing)

DockOrae-Website (docs) maintained separately
```

## Development & Contribution

- Backend features → [DockOrae/DockOrae](https://github.com/DockOrae/DockOrae)
- Frontend UI → [DockOrae/DockOrae-Frontend](https://github.com/DockOrae/DockOrae-Frontend)
- App store submissions → [DockOrae/DockOrae-Apps](https://github.com/DockOrae/DockOrae-Apps)
- Docs improvements → [DockOrae/DockOrae-Website](https://github.com/DockOrae/DockOrae-Website)

See the [Contributing Guide](/development/contributing) for the workflow.
:::

::: zh-CN

DockOrae 由多个独立仓库组成,协同工作:

## 核心项目

| 项目                       | 仓库                                                                                  | 说明                                                  |
| -------------------------- | ------------------------------------------------------------------------------------- | ----------------------------------------------------- |
| **DockOrae(面板)**         | [DockOrae/DockOrae](https://github.com/DockOrae/DockOrae)                             | 主项目:Go 后端 + 前端产物嵌入,单二进制发布            |
| **DockOrae-Frontend**      | [DockOrae/DockOrae-Frontend](https://github.com/DockOrae/DockOrae-Frontend)           | 前端仓库:Vue 3 + TypeScript,独立开发,构建产物分发嵌入 |
| **DockOrae-Apps**          | [DockOrae/DockOrae-Apps](https://github.com/DockOrae/DockOrae-Apps)                   | 应用商店数据源:260+ 应用(图标 / 参数表单 / 多版本)    |
| **Docker_Manager_License** | [DockOrae/Docker_Manager_License](https://github.com/DockOrae/Docker_Manager_License) | 许可证签发服务:Ed25519 签名、设备绑定、在线验证       |
| **DockOrae-Website**       | [DockOrae/DockOrae-Website](https://github.com/DockOrae/DockOrae-Website)             | 本文档站:VitePress 构建,中英双语                      |

## 项目关系

```
DockOrae-Frontend(前端)
       │ 构建产物(rolling release)
       ▼
DockOrae(面板,go:embed 嵌入)
       │
       ├──▶ DockOrae-Apps(应用商店数据)
       └──▶ Docker_Manager_License(在线授权)

DockOrae-Website(文档站)独立维护
```

## 开发与贡献

- 后端功能开发 → [DockOrae/DockOrae](https://github.com/DockOrae/DockOrae)
- 前端界面开发 → [DockOrae/DockOrae-Frontend](https://github.com/DockOrae/DockOrae-Frontend)
- 应用商店应用提交 → [DockOrae/DockOrae-Apps](https://github.com/DockOrae/DockOrae-Apps)
- 文档改进 → [DockOrae/DockOrae-Website](https://github.com/DockOrae/DockOrae-Website)

各仓库的贡献流程见[贡献指南](/development/contributing)。
:::
