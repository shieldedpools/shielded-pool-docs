---
title: Networks and contracts
description: Official Shielded Pools app sites and sNIGHT contract addresses on Midnight Mainnet and Preprod.
---
Each network has its own app site and its own contract. Tokens on one network can’t be used on another.

| Network | App | Contract address | Deployed |
| --- | --- | --- | --- |
| **Mainnet** | [shieldedpools.io](https://shieldedpools.io) | `d992f37012aec91c19a22fb6d985f826fd3b4def2d9f2c48ab67f13fe14ccc38` | 8 November 2026, block 3,372,203 |
| **Preprod** (testnet) | [preprod.shieldedpools.io](https://preprod.shieldedpools.io) | `bc3e6f3bfbe1a6bad120fc0af8bde3557576c6627047e1cd3e84c358aa9190e2` | 10 November 2026, block 3,365,678 |

Both run `@shieldedpools/contracts` **0.3.0** and were deployed from identical initial state with no maintenance authority, so they are the same immutable contract. Preprod uses test NIGHT (tNIGHT) and is the place to practise.

Midnight’s Preview network has no Shielded Pools deployment.

## Check you have the real sNIGHT

A token’s name proves nothing. sNIGHT is identified by its colour, which is derived from NIGHT and the contract address above. A developer can compute it with the SDK:

```ts
import { NIGHT, wrappedColor } from "@shieldedpools/sdk";

const sNight = wrappedColor(contractAddress, NIGHT);
```

## Check the contract is immutable

The app checks this before every wrap and refuses to wrap if it can’t confirm it. You can check it yourself with the SDK:

```ts
import { immutability } from "@shieldedpools/sdk";

const status = await immutability(providers, contractAddress);
// status.state is "immutable", "changeable", or "unreadable"
```

## Check the backing

The app’s **Ledger** page shows the NIGHT locked in the contract. With the SDK:

```ts
import { locked, NIGHT } from "@shieldedpools/sdk";

const backing = await locked(providers, contractAddress, NIGHT); // in smallest units
```
