---
title: Panel Online Update
description: Update DockOrae with one click in the panel — automatically detects new versions and routes the update flow by deployment method.
---

# Panel Online Update

DockOrae has a built-in **online update** feature — complete upgrades with one click in the panel, without logging into the server.

## Check for Updates

- The panel silently checks GitHub Releases **every 10 minutes**
- When a new version is available, a **pink dot indicator** appears next to the footer version number

## Perform the Update

1. Click the footer version number (or the pink dot)
2. The update details pop up: current version vs. latest version, release time, and release notes
3. Click **Update Now**; after confirmation, the update runs automatically

## How the Update Works

The panel automatically detects the deployment method and chooses the corresponding update flow:

| Deployment method                       | Update flow                                                                                                                                                                                                                                                                            |
| --------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Compose deployment** (in a container) | Detect the host's compose file → start an independent `dm-update-helper` helper container (mounts docker.sock, cleans up automatically) → run `compose up -d --force-recreate --pull always` → the panel container is recreated and recovers automatically after a brief disconnection |
| **Binary deployment** (systemd)         | Download the latest binary → atomic replacement (keeping a `.old` backup) → restart the service after 1.5 seconds                                                                                                                                                                      |

- Deployment method auto-detection: inside a container (cgroup contains a container ID) = compose, otherwise = binary
- You can force it with the `DM_DEPLOY_MODE=compose|binary` environment variable
- After the update finishes, the frontend automatically confirms the new version is live and shows a success message

## Notes

| Scenario                                  | Description                                                                                                                                                           |
| ----------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Compose mode cannot find the compose file | The panel shows the **detected paths**; for special cases such as the data directory not being under the install directory, use `sudo bash install.sh update` instead |
| Binary mode permissions                   | root permissions are required (write to `/usr/local/bin` + systemctl)                                                                                                 |
| Detection failure                         | Shows "Failed to check for updates" (network unreachable / GitHub API rate-limited); this does not affect panel usage, and it retries automatically on the next cycle |

## After Updating

- The footer version number updates to the latest version
- Data (settings, containers, app store) is unaffected
- If something goes wrong after the update, go back to the server and run `sudo bash install.sh update`, or check the [FAQ](/en/faq)
