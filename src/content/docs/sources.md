---
title: Sources
description: The contract and SDK revisions these docs are based on, and where to verify them.
---
These docs describe the behaviour of the code below. Where the docs and the code disagree, the code is right. Please [report the mismatch](/troubleshooting/#still-stuck).

| Source | Revision | Public |
| --- | --- | --- |
| [Shielded Pool contract](https://github.com/shieldedpools/shielded-pool-contract/tree/4845c0f7ad9d0f9e7b493eddaeef3b5666edebe4) | `4845c0f`, package 0.3.0 | Yes, Apache-2.0 |
| [Shielded Pool SDK](https://github.com/shieldedpools/shielded-pool-sdk/tree/6f6a573ab6d2e011efede0010a70549bb812332a) | `6f6a573`, package 0.3.0 | Yes, Apache-2.0 |

## What comes from where

- **Contract** ([`shielded-pools.compact`](https://github.com/shieldedpools/shielded-pool-contract/blob/4845c0f7ad9d0f9e7b493eddaeef3b5666edebe4/contract/shielded-pools.compact)): the 1:1 backing, what wrapping and unwrapping disclose, recipient rules, and the immutable deployment process.
- **SDK** ([`pool.ts`](https://github.com/shieldedpools/shielded-pool-sdk/blob/6f6a573ab6d2e011efede0010a70549bb812332a/src/pool.ts), [`transaction.ts`](https://github.com/shieldedpools/shielded-pool-sdk/blob/6f6a573ab6d2e011efede0010a70549bb812332a/src/transaction.ts)): the immutability check before wrapping, argument validation, the pinned contract manifest, and how transaction outcomes are classified.
