#!/usr/bin/env node
/**
 * 构建后生成 sitemap.xml(写入 dist 根目录)。
 * 尊重 VITE_BASE(自定义域名时置 /)与 SITE_URL。
 */
import { readdirSync, statSync, writeFileSync } from 'node:fs'
import { join, relative } from 'node:path'

const dist = join(process.cwd(), '.vitepress/dist')
const base = (process.env.VITE_BASE || '/DockOrae-Website/').replace(/\/?$/, '/')
const host = (process.env.SITE_URL || 'https://dockorae.github.io').replace(/\/$/, '')

function walk(dir) {
  const out = []
  for (const name of readdirSync(dir)) {
    const p = join(dir, name)
    if (statSync(p).isDirectory()) out.push(...walk(p))
    else if (name.endsWith('.html')) out.push(p)
  }
  return out
}

const urls = walk(dist)
  .filter((f) => !f.endsWith('404.html'))
  .map((f) => {
    let url = base + relative(dist, f).replace(/\\/g, '/')
    if (url.endsWith('index.html')) url = url.slice(0, -'index.html'.length)
    const lastmod = statSync(f).mtime.toISOString().slice(0, 10)
    return `  <url>\n    <loc>${host}${url}</loc>\n    <lastmod>${lastmod}</lastmod>\n  </url>`
  })
  .sort()

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.join('\n')}
</urlset>
`

writeFileSync(join(dist, 'sitemap.xml'), xml + '\n')
console.log(`[sitemap] ${urls.length} 个 URL → sitemap.xml (host=${host}${base})`)
