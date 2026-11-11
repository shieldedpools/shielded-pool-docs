---
title: Risks
description: The known risks of using Shielded Pools, including audit status, proof-server trust, and immutability.
---
Shielded Pools is designed to keep trust to a minimum, but it is new software on a young network. Read this before wrapping amounts that matter to you.

:::tip[Start small]
Try the full wrap and unwrap flow on [Preprod](https://preprod.shieldedpools.io) with test tokens, then begin with a small amount on Mainnet.
:::

## Not audited

The contract has not had an independent security audit. It is deliberately small, two functions and a few checks ([read it](/developers/contract/)), and it is tested, but tests are not an audit.

## Bugs can’t be patched

The contract is **immutable**: nobody can change it. That protects your NIGHT from an operator or attacker who gains control of the project. It also means a bug can’t be fixed in place. If a problem were found, users would have to move to a new deployment, and funds might not be recoverable in every case.

## Proof-server trust

Midnight transactions need a zero-knowledge proof. The **proof server** that makes it receives your wallet’s coin secret key, so whoever operates it could spend your shielded tokens, including sNIGHT.

Your wallet decides where proofs are made. The app can’t see whether that happens on your own machine or on a remote service. **Prefer a wallet that proves locally**, and ask your wallet provider if you are unsure.

## Network and service failures

Wallets, proof servers, indexers, and the network can fail or fall behind. A transaction can:

- fail cleanly (nothing happened, and it is safe to retry),
- have an **unknown outcome** (it may still land), or
- be **partly applied** by the network.

The app tells you which. Closing or refreshing the page doesn’t cancel a transaction already handed to your wallet. Always check balances and history before retrying. See [Troubleshooting](/troubleshooting/).

## Public entry and exit

Wraps and unwraps are public, and matching amounts and timing can link them. See [Privacy](/privacy/).

## What 1:1 does and doesn’t mean

1:1 means each sNIGHT is backed by and redeemable for one NIGHT locked in the contract. It is not a promise about the market price of NIGHT, a yield, or that the network will always be available to process your unwrap. DUST fees are separate.
