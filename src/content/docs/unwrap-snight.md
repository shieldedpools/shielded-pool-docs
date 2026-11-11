---
title: Unwrap sNIGHT
description: Turn sNIGHT back into NIGHT at 1:1 in the Shielded Pools app, to your own wallet or any unshielded Midnight address.
---
Unwrapping retires sNIGHT and releases the same amount of NIGHT. For example, 10 sNIGHT becomes 10 NIGHT. You can unwrap any amount you hold. It doesn’t have to match an earlier wrap.

:::caution[The destination is public]
Unwrapping sends ordinary, unshielded NIGHT. The receiving address and the amount will be visible on chain.
:::

## What you need

- A Midnight wallet holding **sNIGHT from the official pool** (see [Networks and contracts](/networks/)).
- **DUST** to pay the network fee.

## Steps

1. **Open the app** on the network where your sNIGHT is, and connect your wallet.
2. **Choose Unwrap.** On the **Wrap** tab, select **Unwrap**. Your sNIGHT balance appears above the amount.
3. **Enter an amount** up to your sNIGHT balance, with up to six decimal places.
4. **Choose where the NIGHT goes.**
   - **My wallet** sends it to your wallet’s unshielded address.
   - **Another address** sends it anywhere else. Enter an unshielded Midnight address (it starts `mn_addr`), not a shielded or Cardano address. Use this too if your wallet doesn’t share an unshielded address.
5. **Review and unwrap.** Double-check the address: a transfer to the wrong address can’t be reversed. Select **Unwrap** and approve in your wallet.
6. **Wait for confirmation**, then check that the NIGHT has arrived.

## Unwrapping is always available

The app and SDK never block unwrapping, even when wrapping is switched off. Your wallet, DUST, and the network still have to be working, but the contract itself can’t refuse a valid unwrap, and nobody can pause it.

## If something goes wrong

Don’t repeat an unwrap until you’ve checked balances and history. Closing the page doesn’t cancel a transaction already handed to your wallet. See [Troubleshooting](/troubleshooting/#submitted-timed-out-or-unknown-outcome).
