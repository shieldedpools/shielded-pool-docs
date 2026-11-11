---
title: Why Shielded Pools
description: What sNIGHT gives you over plain NIGHT, why the pool can be trusted with your NIGHT, and where its limits are.
---
On Midnight, NIGHT is unshielded. Your balance, every payment you make, and everyone you pay can be read by anyone. That is fine for some things. It is not fine for a salary, a supplier payment, a donation, or simply not wanting your holdings on display.

Shielded Pools gives NIGHT a private form, **sNIGHT**, without asking you to trust anyone with it.

## What you get

### Privacy for holding and sending

sNIGHT is an ordinary Midnight shielded token. While you hold it, and when you send it, the sender, recipient, amount, and token are hidden. Only the transaction fee and its timing are public.

You can also wrap **straight to someone else’s shielded address**. That pays them in sNIGHT without them first having to wrap for themselves.

### The same value, always

1 sNIGHT is always redeemable for 1 NIGHT. The contract mints sNIGHT only in the same step that locks the same amount of NIGHT, and releases NIGHT only in the same step that retires the same amount of sNIGHT. There is no exchange rate, slippage, or yield to manage.

The NIGHT backing sNIGHT sits in the contract’s public balance, so anyone can see it. The app’s **Ledger** and **Stats** pages show it, as does the SDK’s `locked` function.

### No fee

The contract keeps none of your NIGHT. Wrapping 10 NIGHT gives you 10 sNIGHT, and unwrapping 10 sNIGHT gives you 10 NIGHT. You pay only Midnight’s normal network fee, in DUST, as you would for any transaction.

## Why you can trust it with your NIGHT

### Nobody can change, pause, or drain it

On Midnight, a contract can have a *maintenance authority* that is able to replace its code. Whoever holds it could take everything the contract holds. **The Shielded Pools contract has none.** It was deployed with an authority that no signature can ever satisfy. Nobody, including the Shielded Pools team, can upgrade it, pause it, block withdrawals, or take the locked NIGHT.

You don’t have to take that on trust. The app and the SDK read the authority from the chain before every wrap, and **refuse to wrap** into a contract that could be changed or whose authority can’t be read.

### You can always leave

Unwrapping is never gated. Even if wrapping is switched off in the app, for example because a service is down, you can still try to unwrap. The amount doesn’t have to match anything you wrapped earlier.

### You keep your keys

Your wallet holds your keys, builds proofs, and signs. The app never sees a seed phrase or secret key. It is a static website with no backend, no accounts, and no analytics.

### Open source and reproducible

The [contract](https://github.com/shieldedpools/shielded-pool-contract) and [SDK](https://github.com/shieldedpools/shielded-pool-sdk) are public under Apache-2.0. Deployments are built from a tagged release and refused unless the build matches the published npm package byte for byte. The deploy also checks that the on-chain verifier keys match that build. The SDK pins a hash of the contract’s proving files, so a server that hands out tampered files can’t make your wallet prove something else.

## What it is not

Being clear about limits is part of being trustworthy:

- **Not an anonymity guarantee.** Wraps and unwraps are public. Matching amounts and timing can link them. See [Privacy](/privacy/) for how to reduce that.
- **Not audited yet.** The contract is small, only two functions, but it has not had an independent audit. Because it is immutable, a bug could not be patched in place.
- **Not a bridge.** sNIGHT lives on Midnight. Shielded Pools doesn’t move funds from Cardano.

Read [Risks](/risks/) before wrapping significant amounts.
