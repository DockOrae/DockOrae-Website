# DockOrae Docs

DockOrae 官方文档站 — 基于 [OpenList-Docs](https://github.com/OpenListTeam/OpenList-Docs) 模板(Valaxy + valaxy-theme-press),部署于 GitHub Pages。

> [English](#dockorae-docs) · [简体中文](#dockorae-文档)

## DockOrae 文档

### 简介

这是 [DockOrae](https://github.com/DockOrae/DockOrae)(现代化 Docker 管理面板)的官方文档仓库。包含安装、使用、配置、更新、卸载、FAQ 与生态,支持简体中文与英文。

在线地址:<https://dockorae.github.io/DockOrae-Website/>

### 技术栈

- [Valaxy](https://valaxy.site) + [valaxy-theme-press](https://www.npmjs.com/package/valaxy-theme-press)(模板继承自 [OpenList-Docs](https://github.com/OpenListTeam/OpenList-Docs))
- 本地全文搜索(fuse)
- GitHub Actions 自动构建部署到 GitHub Pages

### 本地开发

```bash
pnpm install
pnpm dev          # 开发服务器
pnpm build        # 生产构建(SSG,输出 dist/)
pnpm serve        # 预览构建产物
```

### 目录结构

```
pages/                   # 文档内容(::: en / ::: zh-CN 双语块)
locales/                 # 导航/页脚/分类文案(en.yml / zh-CN.yml)
components/              # 组件(继承模板)
layouts/                 # 布局(继承模板)
styles/                  # 样式(继承模板,勿改动)
assets/                  # 品牌 logo
public/                  # 静态资源(favicon / logo)
valaxy.config.ts         # 站点配置
.github/workflows/gh-pages.yml  # GitHub Pages 部署
```

### 部署

推送 `main` 分支(仅文档相关改动触发)自动构建并部署:

- 项目页地址:`/DockOrae-Website/`(workflow 中 `VITE_BASE` 自动设置)
- 绑定自定义域名时,将 workflow 中 `VITE_BASE` 改为 `/`、`SITE_URL` 改为域名

### 模板说明

本站模板继承自 [OpenList-Docs](https://github.com/OpenListTeam/OpenList-Docs)(AGPL-3.0),仅替换内容与品牌素材,样式/布局/组件保持模板原样。

---

## DockOrae Docs

### About

Official documentation for [DockOrae](https://github.com/DockOrae/DockOrae), a modern Docker management panel. Built on the [OpenList-Docs](https://github.com/OpenListTeam/OpenList-Docs) template (Valaxy + valaxy-theme-press), in Chinese & English.

Live site: <https://dockorae.github.io/DockOrae-Website/>

### Development

```bash
pnpm install
pnpm dev          # dev server
pnpm build        # production build (SSG, outputs dist/)
pnpm serve        # preview the build
```

### Template

This site is templated from [OpenList-Docs](https://github.com/OpenListTeam/OpenList-Docs) (AGPL-3.0); only content and branding were replaced — styles, layouts and components are kept as the template.
