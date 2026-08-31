---
title: 贡献指南
description: 参与 DockOrae 开发 — Issue 报告、代码贡献、文档改进与翻译。
---

# 贡献指南

感谢你愿意为 DockOrae 贡献!任何形式的帮助(报告问题、改进文档、提交代码)都非常欢迎。

## 报告问题

在 [GitHub Issues](https://github.com/DockOrae/DockOrae/issues) 提交 issue 时,请包含:

- **面板版本**(页脚版本号)与部署方式(compose / 二进制 / docker run)
- **复现步骤** — 如何触发问题
- **预期行为** vs **实际行为**
- **日志** — 面板日志(`docker compose logs --tail 50` 或 `journalctl -u docker-manager -n 50`)
- 环境信息(系统、Docker 版本、架构)

## 提交代码

### 1. Fork 并克隆

```bash
git clone https://github.com/<你的用户名>/DockOrae.git
cd DockOrae
git remote add upstream https://github.com/DockOrae/DockOrae.git
```

### 2. 创建分支

```bash
git checkout -b feat/你的改动
```

### 3. 开发与自测

- 后端:`make test`(go vet + go test + race,与 CI 一致)
- 前端(在 DockOrae-Frontend 仓库):`npm run typecheck && npm run lint && npm run i18n-check`
- 涉及 UI 的改动,本地跑起来确认效果后再提交

### 4. 提交并推送

```bash
git add .
git commit -m "feat: 描述你的改动"
git push origin feat/你的改动
```

### 5. 发起 Pull Request

- PR 标题清晰描述改动;涉及 UI 请附上截图
- 保持改动聚焦:一个 PR 解决一个问题
- CI 必须通过(go-checks / docker-publish)

## 代码规范

- **Go**:遵循标准格式(`gofmt`),`make test` 必须通过
- **前端**:TypeScript 严格模式,禁止 `any`;ESLint / Prettier 通过;14 语言包 key 全量同步(`npm run i18n-check`)
- **提交信息**:中文,动词开头(`feat:` / `fix:` / `docs:` / `refactor:`)

## 改进文档

本文档站(DockOrae-Website)同样欢迎贡献:

- 每个页面右上角有 **「在 GitHub 上编辑此页」** 链接,点击直接编辑
- 文档支持简体中文(根路径)与英文(`/en/`),两种语言需保持同步
- 修改仅文档内容时推送 `main` 分支即自动部署到 GitHub Pages

## 翻译

- 面板界面(14 种语言)的翻译在前端仓库 `src/locales/`,key 必须全语言一致
- 文档站翻译:在 `docs/en/` 下维护英文版

## 行为准则

- 友好、尊重地交流
- 不提交无意义改动(如格式化整个文件)
- 问题与 PR 用中文或英文均可
