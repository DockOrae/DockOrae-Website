---
title: 域名与 HTTPS
description: 为 DockOrae 绑定域名并启用 HTTPS — 一键脚本 acme.sh 自动签发 Let's Encrypt 证书、手动配置证书、反向代理。
---

# 域名与 HTTPS

为面板绑定域名并启用 HTTPS,是公网访问的推荐方式(不用记 IP 和端口,传输加密)。

## 方式一:一键脚本自动签发(推荐)

使用安装脚本的 SSL 功能,自动完成:校验域名解析 → acme.sh 申请 Let's Encrypt 证书 → 写入面板配置 → 切换 HTTPS。

### 前置条件

1. 域名 A 记录已解析到**本机公网 IP**(脚本会强制校验,解析错误直接终止)
2. 服务器 **80 端口空闲**(acme.sh standalone 验证需要)
3. 防火墙放行 80 / 443

### 执行

```bash
sudo bash install.sh ssl
```

进入 SSL 管理菜单,选择 **1) 申请域名证书**,输入域名。脚本将自动:

1. 校验域名 A 记录 == 本机公网 IP(不一致立即终止)
2. 安装 acme.sh 并申请证书
3. 证书写入宿主 `/opt/docker-manager/cert/<域名>/`
4. 通过面板 API 自动写入配置(监听域名 + 证书路径)
5. Compose 方式自动将端口映射改为 `443:8080`
6. 重建容器,HTTPS 生效

完成后访问:

```
https://<你的域名>/          # 无需端口号
```

::: note

- 申请到的证书为 ECC 证书(`fullchain.cer` + `<域名>.key`),有效期 90 天,acme.sh 会自动续期
- 续期后证书自动生效(安装时已配置证书路径);若未生效执行 `sudo bash install.sh restart`
  :::

### 常用 SSL 命令

```bash
sudo bash install.sh ssl       # SSL 管理菜单
sudo bash install.sh ssl renew # 强制续期(菜单选项 3)
```

## 方式二:手动配置证书

已有证书(如从其他 CA 签发)时,手动配置:

1. 将证书文件放到宿主机证书目录(compose 方式默认 `./cert`):
   ```
   ./cert/
   ├── fullchain.pem
   └── privkey.pem
   ```
2. 面板 → **设置 → 常规 → 证书**,填写容器内路径:
   - 证书公钥:`/data/cert/fullchain.pem`
   - 证书密钥:`/data/cert/privkey.pem`
3. 重启面板(证书配置重启生效)

::: tip 证书文件命名
面板只认你填写的路径 —— 文件名随意,只要与填写一致。常见为 `fullchain.cer` / `example.com.key`(脚本签发)或 `fullchain.pem` / `privkey.pem`(标准部署)。
:::

## 方式三:反向代理(可选)

面板本身已内置 HTTPS,但如果你已有 Nginx / Caddy 等反代:

1. 面板设置 → 常规 → 面板监听 IP 填 `127.0.0.1`(仅本机可访问)
2. 反代配置将域名转发到 `http://127.0.0.1:8080`
3. 反代层负责 TLS 终结

## 强制 HTTPS

面板设置 → 常规 → 证书,勾选**强制 HTTPS** 后,证书无效时面板**拒绝启动**(不降级 HTTP),请确保证书路径正确后再启用。

## 常见问题

**证书申请失败?** 按脚本提示排查:域名 A 记录是否指向本机公网 IP、80 端口是否被占用、防火墙是否放行 80。

**HTTPS 打不开,wrong version number 报错?** 证书路径没写进面板配置或容器内路径不存在:

```bash
docker exec dockorae ls -la /data/cert/    # 检查容器内证书文件
```

然后重新执行 `sudo bash install.sh ssl`。

**绑定域名后 IP 直访打不开了?** 正常 —— 面板监听域名是 Host 白名单,设置后仅该域名可访问(`localhost` 不受限)。
