<script setup lang="ts">
import { computed, ref } from 'vue'
import { useData } from 'vitepress'

interface InstallOption {
  key: string
  label: Record<'zh' | 'en', string>
  command: string[]
  note: Record<'zh' | 'en', string>
  docLink: Record<'zh' | 'en', string>
  docText: Record<'zh' | 'en', string>
}

const { lang } = useData()
const isEn = computed(() => lang.value === 'en')

const options: InstallOption[] = [
  {
    key: 'script',
    label: { zh: '一键脚本', en: 'One-click Script' },
    command: [
      'bash <(curl -Ls https://raw.githubusercontent.com/DockOrae/DockOrae/master/install.sh)'
    ],
    note: {
      zh: '交互式菜单:选择 Compose 或二进制方式;自动检测网络(国内走加速源),缺少 Docker 时自动安装。',
      en: 'Interactive menu: choose Compose or binary install; auto-detects network (mirrors in CN), auto-installs Docker if missing.'
    },
    docLink: { zh: '/guide/installation/script', en: '/en/guide/installation/script' },
    docText: { zh: '一键脚本文档', en: 'Script docs' }
  },
  {
    key: 'compose',
    label: { zh: 'Docker Compose', en: 'Docker Compose' },
    command: [
      'curl -fsSL https://raw.githubusercontent.com/DockOrae/DockOrae/master/docker-compose.yml -o docker-compose.yml',
      'docker compose up -d'
    ],
    note: {
      zh: 'VPS / 服务器部署首选,基于镜像,更新方便。',
      en: 'Recommended for VPS / servers. Image-based, easy to update.'
    },
    docLink: {
      zh: '/guide/installation/docker-compose',
      en: '/en/guide/installation/docker-compose'
    },
    docText: { zh: 'Compose 安装文档', en: 'Compose docs' }
  },
  {
    key: 'docker',
    label: { zh: 'Docker', en: 'Docker' },
    command: [
      'docker run -d --name docker-manager-go \\',
      '  -p 8080:8080 \\',
      '  -v /var/run/docker.sock:/var/run/docker.sock \\',
      '  -v docker-manager-data:/data \\',
      '  dockorae/dockorae:latest'
    ],
    note: {
      zh: '单容器快速体验,数据保存在 Docker 卷中。',
      en: 'Single container for a quick start; data lives in a Docker volume.'
    },
    docLink: { zh: '/guide/installation/docker', en: '/en/guide/installation/docker' },
    docText: { zh: 'Docker 安装文档', en: 'Docker docs' }
  },
  {
    key: 'binary',
    label: { zh: '二进制', en: 'Binary' },
    command: [
      'VERSION=$(curl -fsSL https://api.github.com/repos/DockOrae/DockOrae/releases/latest \\',
      '  | grep -oP "\\"tag_name\\":\\s*\\"\\K[^\\"]+")',
      'curl -fsSL -o dockorae.tar.gz \\',
      '  "https://github.com/DockOrae/DockOrae/releases/download/${VERSION}/dockorae-linux-amd64.tar.gz"',
      'tar xzf dockorae.tar.gz && sudo mv dockorae/dockorae /usr/local/bin/'
    ],
    note: {
      zh: '无需 Docker;也可用 install.sh 的二进制方式自动完成(systemd 托管)。',
      en: 'No Docker required; or let install.sh do it automatically (systemd).'
    },
    docLink: { zh: '/guide/installation/binary', en: '/en/guide/installation/binary' },
    docText: { zh: '二进制安装文档', en: 'Binary docs' }
  }
]

const active = ref('script')

function copy(cmd: string[]) {
  const text = cmd.join('\n')
  navigator.clipboard?.writeText(text).catch(() => undefined)
}
</script>

<template>
  <section class="home-install">
    <h2 class="hi-title">{{ isEn ? 'Quick Install' : '快速安装' }}</h2>
    <p class="hi-sub">
      {{
        isEn
          ? 'Pick an install method and get DockOrae running in minutes.'
          : '选择一种安装方式,几分钟内启动 DockOrae'
      }}
    </p>

    <div class="hi-tabs" role="tablist">
      <button
        v-for="opt in options"
        :key="opt.key"
        class="hi-tab"
        :class="{ active: active === opt.key }"
        role="tab"
        :aria-selected="active === opt.key"
        @click="active = opt.key"
      >
        {{ opt.label[isEn ? 'en' : 'zh'] }}
      </button>
    </div>

    <div v-for="opt in options" v-show="active === opt.key" :key="opt.key" class="hi-panel">
      <div class="hi-code">
        <button class="hi-copy" :title="isEn ? 'Copy' : '复制命令'" @click="copy(opt.command)">
          {{ isEn ? 'Copy' : '复制' }}
        </button>
        <pre><code><span v-for="(line, i) in opt.command" :key="i">{{ line }}<template v-if="i < opt.command.length - 1"><br></template></span></code></pre>
      </div>
      <div class="hi-note">
        <span>{{ opt.note[isEn ? 'en' : 'zh'] }}</span>
        <a :href="opt.docLink[isEn ? 'en' : 'zh']">{{ opt.docText[isEn ? 'en' : 'zh'] }} →</a>
      </div>
    </div>
  </section>
</template>
