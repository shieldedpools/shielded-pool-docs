---
title: SDK quickstart
description: Add NIGHT wrapping and unwrapping to a browser app with @shieldedpools/sdk, through the user's connected Midnight wallet.
---
`@shieldedpools/sdk` lets a browser app wrap and unwrap tokens through the user’s connected Midnight wallet. The wallet keeps the keys and does the proving, balancing, and submission. The SDK builds the contract calls, checks arguments, and tells you clearly whether a failed transaction might have gone through.

- Package: [`@shieldedpools/sdk`](https://www.npmjs.com/package/@shieldedpools/sdk), currently 0.3.0
- Source: [github.com/shieldedpools/shielded-pool-sdk](https://github.com/shieldedpools/shielded-pool-sdk) (Apache-2.0)

## Install

```sh
npm install @shieldedpools/sdk
```

Your build needs:

- A global `Buffer`, set before the SDK loads.
- WebAssembly. With Vite, use `vite-plugin-wasm` and set `build.target` to `esnext`.
- The contract’s proving files. Copy the `compiler`, `keys`, and `zkir` directories from `@shieldedpools/contracts/contract/managed/shielded-pools` (installed with the SDK) and serve them from your site, for example at `/zk/`.

## Wrap and unwrap

```ts
import {
  connectorProviders, contractKeys, NIGHT,
  shield, unshield, parseUnshieldedAddress,
} from "@shieldedpools/sdk";

// `connected` is the wallet's dApp connector API (v4.1) after the user approves.
const keys = contractKeys(new URL("/zk/", location.href).href);
const providers = await connectorProviders(connected, keys);

const contract = "d992f37012aec91c19a22fb6d985f826fd3b4def2d9f2c48ab67f13fe14ccc38"; // Mainnet

// Wrap 1 NIGHT (amounts are bigints in smallest units; NIGHT has 6 decimals).
const wrapTx = await shield(providers, contract, NIGHT, 1_000_000n);

// Wrap to someone else: pass their full shielded address.
await shield(providers, contract, NIGHT, 1_000_000n, { recipient: "mn_shield-addr1…" });

// Unwrap 0.5 NIGHT to an unshielded address.
const { networkId } = await connected.getConfiguration();
const to = parseUnshieldedAddress("mn_addr1…", networkId);
const unwrapTx = await unshield(providers, contract, NIGHT, 500_000n, to);
```

Contract addresses for each network are on [Networks and contracts](/networks/).

## API

| Export | What it does |
| --- | --- |
| `connectorProviders(connected, keys)` | Builds the providers every call needs from a connected wallet. |
| `contractKeys(baseUrl)` | Loads the proving files from `baseUrl` and checks them against a pinned hash, so a tampered file is rejected. |
| `shield(providers, contract, token, amount, options?)` | Locks `amount` of `token` and mints the same amount of its wrapped token. Resolves to the transaction ID once confirmed. |
| `unshield(providers, contract, token, amount, recipient, options?)` | Retires wrapped tokens and releases the same amount of `token` to `recipient`. |
| `parseUnshieldedAddress(text, networkId)` | Turns an `mn_addr…` address into the 32 bytes `unshield` expects, and rejects the zero address. |
| `wrappedColor(contract, token)` | The wrapped token’s colour, used to find it in wallet balances. |
| `locked(providers, contract, token)` | How much of `token` the contract holds, which is the backing. |
| `immutability(providers, contract)` | `immutable`, `changeable`, or `unreadable`. |
| `maintenanceAuthority` / `isImmutable` | The raw authority and the check behind `immutability`. |
| `NIGHT` | NIGHT’s token colour. |

### Options

Both `shield` and `unshield` accept:

- **`onStep(step, txId?)`**: called with `proving`, `balancing`, `submitting`, and `submitted` (with the transaction ID). Use it for progress UI.
- **`signal`**: an `AbortSignal`. Aborting stops the call before the wallet is asked to balance or send. Once handed over, a transaction can’t be recalled. Neither call has its own timeout, so use a signal to set one.

`shield` also accepts:

- **`recipient`**: a full shielded address (`mn_shield-addr…`) on the connected network. A bare coin key isn’t accepted: the coin must be encrypted to the recipient’s encryption key, which only the full address carries.
- **`allowChangeable`**: by default, `shield` refuses any contract that isn’t confirmed immutable. Set this only for a contract you control or are testing.

`unshield` is never held back by the immutability check, so users can always exit.

## Handling errors

Every failure is a `ShieldedPoolError` with an `outcome`:

| `outcome` | Meaning | What to do |
| --- | --- | --- |
| `failed` | It definitely didn’t happen: invalid arguments, a wallet refusal, or a full network rejection. | Safe to retry. |
| `unknown` | It was handed to the wallet and nothing confirms the result, or the network applied only part of it. | Check balances before retrying, or you may send twice. |

`error.cause` holds the wallet’s original error where there is one.

```ts
import { ShieldedPoolError } from "@shieldedpools/sdk";

try {
  await shield(providers, contract, NIGHT, amount, { onStep: setStep });
} catch (error) {
  if (error instanceof ShieldedPoolError && error.outcome === "unknown") {
    showCheckBalancesPrompt();
  } else {
    showRetry(error);
  }
}
```

Arguments are checked before anything reaches the network. A token is 64 hex characters, an amount is 1 to 2⁶⁴ − 1 units, and recipients can’t be the zero address. Mistakes cost nothing.

## Limits

- The SDK pays people only. The contract can also pay another contract, but minting to a contract requires that contract to claim the coin in the same transaction, which a standalone `shield` can’t do.
- The wallet must support ledger 9 and dApp connector 4.1.
