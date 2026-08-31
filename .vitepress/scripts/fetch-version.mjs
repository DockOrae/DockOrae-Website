#!/usr/bin/env node
/**
 * 构建前获取 DockOrae 最新 Release 版本号,写入 .vitepress/version.json
 * 供 config.ts 注入导航栏版本徽标 / 页脚。
 *
 * 优先级:
 *   1. 环境变量 VERSION(显式指定)
 *   2. GitHub API releases/latest(带 GITHUB_TOKEN 避免限流)
 *   3. 已有缓存文件(离线构建不失败)
 *   4. 兜底 { tag: 'latest' }
 */
import { writeFileSync, existsSync, readFileSync, mkdirSync } from 'node:fs'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const here = dirname(fileURLToPath(import.meta.url))
const outFile = resolve(here, '../version.json')
const fallback = {
  tag: 'latest',
  name: 'latest',
  html_url: 'https://github.com/DockOrae/DockOrae/releases/latest'
}

async function main() {
  if (process.env.VERSION) {
    writeVersion({ ...fallback, tag: process.env.VERSION, name: process.env.VERSION })
    console.log(`[version] 使用环境变量 VERSION=${process.env.VERSION}`)
    return
  }

  try {
    const headers = { Accept: 'application/vnd.github+json', 'User-Agent': 'dockorae-docs' }
    if (process.env.GITHUB_TOKEN) headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`
    const res = await fetch('https://api.github.com/repos/DockOrae/DockOrae/releases/latest', {
      headers
    })
    if (!res.ok) throw new Error(`GitHub API HTTP ${res.status}`)
    const d = await res.json()
    if (!d.tag_name) throw new Error('no tag_name')
    writeVersion({
      tag: d.tag_name,
      name: d.name || d.tag_name,
      html_url: d.html_url,
      published_at: d.published_at
    })
    console.log(`[version] GitHub Release: ${d.tag_name}`)
  } catch (err) {
    if (existsSync(outFile)) {
      console.warn(
        `[version] 获取失败(${err.message}),沿用缓存: ${readFileSync(outFile, 'utf-8').trim()}`
      )
    } else {
      writeVersion(fallback)
      console.warn(`[version] 获取失败(${err.message}),使用兜底 latest`)
    }
  }
}

function writeVersion(data) {
  mkdirSync(dirname(outFile), { recursive: true })
  writeFileSync(outFile, JSON.stringify(data, null, 2) + '\n')
}

main()
