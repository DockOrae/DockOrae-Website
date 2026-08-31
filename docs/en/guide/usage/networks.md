---
title: Network Management
description: Create custom Docker networks, configure subnets and gateways, view container connections.
---

# Network Management

Go to the **Networks** page to manage Docker networks.

## Network List

Displays the network name, driver type (bridge / host / overlay, etc.), scope, and the number of connected containers.

## Creating a Network

Click **Create Network** and fill in:

| Field   | Description                                              |
| ------- | -------------------------------------------------------- |
| Name    | Network name                                             |
| Driver  | Defaults to `bridge` (single host); overlay is for Swarm |
| Subnet  | e.g. `172.20.0.0/24`                                     |
| Gateway | e.g. `172.20.0.1`                                        |

::: tip
When installing apps from the app store, the `1panel-network` external network is automatically created and used, so that apps managed by the panel can communicate with each other.
:::

## Viewing Details

Click a network to view its details: subnet / gateway configuration and the **list of connected containers**.

## Deleting a Network

::: warning
Before deleting a network, make sure no container is connected to it; if the network is in use, the deletion will fail.
:::

## FAQ

**Creating a network fails with "subnet already exists"?** The subnet range conflicts with an existing network. Use a different range, or delete the network that occupies that range.
