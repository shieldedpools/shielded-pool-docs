---
title: Wrap NIGHT
description: Turn NIGHT into sNIGHT at 1:1 in the Shielded Pools app, for yourself or as a private payment to someone else.
---
Wrapping locks NIGHT in the pool and gives you the same amount of sNIGHT. For example, 10 NIGHT becomes 10 sNIGHT.

:::tip[First time?]
Do a practice run on [Preprod](https://preprod.shieldedpools.io) with test NIGHT (tNIGHT) before using Mainnet.
:::

## What you need

- **A Midnight browser wallet** that supports ledger 9 and the Midnight dApp connector (version 4.x).
- **NIGHT on Midnight**, on the same network as the app. NIGHT held on Cardano doesn’t count.
- **DUST** to pay the network fee.

## Steps

1. **Open the app** at [shieldedpools.io](https://shieldedpools.io) (Mainnet) or [preprod.shieldedpools.io](https://preprod.shieldedpools.io) (Preprod). Select **Connect**, choose your wallet, and approve.
2. **Choose Wrap.** On the **Wrap** tab, make sure **Wrap** is selected. Your NIGHT balance appears above the amount.
3. **Enter an amount**, for example `1.5`. Amounts are in NIGHT, with up to six decimal places.
4. **Choose who receives the sNIGHT.**
   - **My wallet** sends it to you.
   - **Another address** sends it to someone else. Enter their full shielded Midnight address (it starts `mn_shield-addr`). This is a private way to pay someone: the wrap is public, but the recipient is not.
5. **Review and wrap.** Check the amount and recipient. The app reminds you that your address, the token, and the amount will be public. Select **Wrap**.
6. **Wait for confirmation.** The app shows each stage: **Prepare**, **Prove** (this can take a few minutes), **Approve** in your wallet, and **Confirm**. Once it confirms and your wallet syncs, the sNIGHT appears in the recipient’s wallet.

## If wrapping is disabled

The app turns wrapping off when it can’t confirm the contract is immutable, for example because a data service is unreachable. That protects you from wrapping into a contract that could be changed. The app says why. Try again later. **Unwrapping is not affected.**

## If something goes wrong

If the app loses track of a transaction or reports an unknown outcome, **check your balances and history before trying again**. The first attempt may still go through. See [Troubleshooting](/troubleshooting/#submitted-timed-out-or-unknown-outcome).

## Next

- [Unwrap sNIGHT](/unwrap-snight/) when you want NIGHT back.
- [Privacy tips](/privacy/#protect-your-privacy) to make your wraps and unwraps harder to link.
