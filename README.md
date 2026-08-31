# DockOrae Docs

DockOrae 官方文档站 — 基于 [VitePress](https://vitepress.dev) 构建,部署于 GitHub Pages。

> [English](#dockorae-docs) · [简体中文](#dockorae-文档)

## DockOrae 文档

### 简介

这是 [DockOrae](https://github.com/DockOrae/DockOrae)(现代化 Docker 管理面板)的官方文档仓库。包含安装、使用、配置、更新、卸载、FAQ 与开发指南,支持简体中文与英文。

在线地址:<https://dockorae.github.io/DockOrae-Website/>

### 技术栈

- [VitePress](https://vitepress.dev) 1.x + Vue 3 + TypeScript
- 本地全文搜索(中文/英文)
- GitHub Actions 自动构建部署到 GitHub Pages

### 本地开发

```bash
npm install
npm run dev          # 开发服务器 http://localhost:5173
npm run build        # 生产构建(自动拉取最新版本号 + 生成 sitemap)
npm run preview      # 预览生产构建
```

质量检查:

```bash
npm run typecheck    # vue-tsc 类型检查
npm run lint         # ESLint
npm run format:check # Prettier 格式检查
```

### 目录结构

```
docs/                  # 文档内容(简体中文,默认语言)
docs/en/               # 英文文档
public/                # 静态资源(logo / favicon / robots.txt)
.vitepress/
├── config.ts          # 站点配置(i18n / SEO / 搜索 / 版本注入)
├── theme/             # 主题定制(DockOrae 品牌粉色)
└── scripts/
    ├── fetch-version.mjs   # 构建时拉取 DockOrae 最新 Release 版本号
    └── gen-sitemap.mjs     # 构建后生成 sitemap.xml
.github/workflows/deploy.yml  # GitHub Pages 自动部署
```

### 部署

推送 `main` 分支(仅文档相关改动触发)自动构建并部署:

- 项目页地址:`/DockOrae-Website/`(默认 `base`)
- 绑定自定义域名时,在 workflow 中将 `VITE_BASE` 改为 `/`、`SITE_URL` 改为域名

### 文档约定

- 修改文档页面:直接编辑 `docs/` 下对应 markdown,页面右上角有「在 GitHub 上编辑此页」链接
- 中英文保持同步:新增页面时同时维护 `docs/en/` 对应文件
- 所有命令、URL、参数必须与 [DockOrae](https://github.com/DockOrae/DockOrae) 仓库实际一致,禁止虚构

---

## DockOrae Docs

### About

Official documentation for [DockOrae](https://github.com/DockOrae/DockOrae), a modern Docker management panel. Covers installation, usage, configuration, update, uninstall, FAQ and development — in Simplified Chinese and English.

Live site: <https://dockorae.github.io/DockOrae-Website/>

### Tech Stack

- [VitePress](https://vitepress.dev) 1.x + Vue 3 + TypeScript
- Local full-text search (Chinese & English)
- Auto build & deploy to GitHub Pages via GitHub Actions

### Development

```bash
npm install
npm run dev          # dev server at http://localhost:5173
npm run build        # production build (fetches latest version + generates sitemap)
npm run preview      # preview the production build
```

Quality checks:

```bash
npm run typecheck    # vue-tsc type check
npm run lint         # ESLint
npm run format:check # Prettier format check
```

### Deployment

Pushing to `main` (docs-related changes only) triggers the workflow to build and deploy:

- Project page path: `/DockOrae-Website/` (default `base`)
- To use a custom domain, set `VITE_BASE` to `/` and `SITE_URL` to your domain in the workflow

### License

[GPL-3.0](LICENSE)
