---
title: 生态项目
description: DockOrae ecosystem — frontend, app store, license service and docs site.
---

# Ecosystem

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

See the [Contributing Guide](/en/development/contributing) for the workflow.
