---
title: Domain & HTTPS
description: Bind a domain to DockOrae and enable HTTPS — one-click script with acme.sh to automatically issue Let's Encrypt certificates, manual certificate configuration, and reverse proxy.
---

# Domain & HTTPS

Binding a domain to the panel and enabling HTTPS is the recommended way to access it from the public internet (no need to remember an IP and port, and traffic is encrypted).

## Method 1: One-Click Script Auto-Issuance (Recommended)

Use the install script's SSL feature, which automatically: validates the domain DNS record → obtains a Let's Encrypt certificate via acme.sh → writes it to the panel configuration → switches to HTTPS.

### Prerequisites

1. The domain's A record resolves to **this machine's public IP** (the script validates this strictly and aborts immediately on a mismatch)
2. Port **80 is free** on the server (required for acme.sh standalone validation)
3. The firewall allows 80 / 443

### Execution

```bash
sudo bash install.sh ssl
```

Enter the SSL management menu, select **1) Issue a domain certificate**, and enter your domain. The script will automatically:

1. Validate that the domain's A record == this machine's public IP (aborts immediately on mismatch)
2. Install acme.sh and obtain the certificate
3. Write the certificate to the host's `/opt/docker-manager/cert/<domain>/`
4. Write the configuration automatically via the panel API (listen domain + certificate paths)
5. In Compose mode, automatically change the port mapping to `443:8080`
6. Recreate the container; HTTPS takes effect

After it finishes, visit:

```
https://<your-domain>/          # no port number needed
```

::: note

- The issued certificate is an ECC certificate (`fullchain.cer` + `<domain>.key`) valid for 90 days; acme.sh renews it automatically
- The renewed certificate takes effect automatically (the certificate paths were configured at install time); if it does not, run `sudo bash install.sh restart`
  :::

### Common SSL Commands

```bash
sudo bash install.sh ssl       # SSL management menu
sudo bash install.sh ssl renew # force renewal (menu option 3)
```

## Method 2: Manual Certificate Configuration

If you already have a certificate (e.g. issued by another CA), configure it manually:

1. Place the certificate files in the host's certificate directory (`./cert` by default in compose mode):
   ```
   ./cert/
   ├── fullchain.pem
   └── privkey.pem
   ```
2. In the panel, go to **Settings → General → Certificates** and fill in the in-container paths:
   - Certificate public key: `/data/cert/fullchain.pem`
   - Certificate key: `/data/cert/privkey.pem`
3. Restart the panel (certificate configuration takes effect after a restart)

::: tip Certificate file naming
The panel only uses the paths you enter — the file names are up to you, as long as they match what you fill in. Common names are `fullchain.cer` / `example.com.key` (script-issued) or `fullchain.pem` / `privkey.pem` (standard deployments).
:::

## Method 3: Reverse Proxy (Optional)

The panel has HTTPS built in, but if you already use a reverse proxy such as Nginx / Caddy:

1. In panel settings → General, set the panel listen IP to `127.0.0.1` (accessible only from the local machine)
2. Configure the reverse proxy to forward the domain to `http://127.0.0.1:8080`
3. The reverse proxy layer handles TLS termination

## Force HTTPS

In panel settings → General → Certificates, after checking **Force HTTPS**, the panel **refuses to start** when the certificate is invalid (no HTTP fallback). Make sure the certificate paths are correct before enabling it.

## FAQ

**Certificate issuance failed?** Troubleshoot by following the script's prompts: check whether the domain's A record points to this machine's public IP, whether port 80 is occupied, and whether the firewall allows 80.

**HTTPS won't open, "wrong version number" error?** The certificate paths were not written to the panel configuration, or the in-container paths do not exist:

```bash
docker exec dockorae ls -la /data/cert/    # check the certificate files inside the container
```

Then run `sudo bash install.sh ssl` again.

**After binding a domain, direct IP access no longer works?** That's normal — the panel listen domain is a Host whitelist; once set, only that domain can access the panel (`localhost` is not restricted).
