---
title: 生态项目
description: DockOrae 生态项目 — 前端、应用商店、许可证服务与文档站。
---

# 生态项目

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
