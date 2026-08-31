let dockoraeVersionCache: string | null = null

// fetch the DockOrae's latest version smartly
export const fetchDockOraeVersion = async (): Promise<string> => {
  if (dockoraeVersionCache) return dockoraeVersionCache

  const sources = [
    // GitHub Releases
    {
      url: 'https://api.github.com/repos/DockOrae/DockOrae/releases/latest',
      handler: (json: any) => json.tag_name,
    },
    // npm registry (frontend)
    {
      url: 'https://registry.npmjs.org/dockorae-web/latest',
      handler: (json: any) => `v${json.version}`,
    },
  ]

  for (const { url, handler } of sources) {
    try {
      const controller = new AbortController()
      const timeoutId = setTimeout(() => controller.abort(), 2000)

      const res = await fetch(url, { signal: controller.signal })
      clearTimeout(timeoutId)

      const json = await res.json()
      const version = handler(json)

      if (typeof version === 'string' && /^v?\d+\.\d+\.\d+$/.test(version)) {
        return (dockoraeVersionCache = version.startsWith('v') ? version : `v${version}`)
      }
    } catch (e) {
      console.warn(`Failed to fetch version from ${url}`, e)
    }
  }
  console.error('All version sources failed, fallback to dev version')
  return 'dev'
}
