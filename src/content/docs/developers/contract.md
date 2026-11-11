---
title: Contract reference
description: The Shielded Pools Compact contract, its shield and unshield circuits, its guarantees, and how it is deployed immutably.
---
The whole protocol is one Compact contract with two circuits. It wraps any token that uses Midnight’s unshielded ledger coins. For NIGHT, the wrapped token is sNIGHT.

- Package: [`@shieldedpools/contracts`](https://www.npmjs.com/package/@shieldedpools/contracts), currently 0.3.0
- Source: [github.com/shieldedpools/shielded-pool-contract](https://github.com/shieldedpools/shielded-pool-contract) (Apache-2.0)
- Deployments: [Networks and contracts](/networks/)

## Guarantees

- **1:1 backing.** Each mint is paired with a deposit of the same token and amount, and each release with the retirement of the same amount, in the same circuit.
- **Immutable.** Deployed with no maintenance authority: an empty committee with a threshold of 1, which no signature can meet. Nobody can change the circuits or pause the contract.
- **Any ledger token.** One contract wraps NIGHT and any other unshielded ledger token. Each wrapped token’s colour is derived from the underlying token and the contract address, so only this contract can mint it.
- **Contract custody.** Either circuit can pay another contract instead of a person, so contracts can wrap and unwrap tokens they hold.

## `shield`

Locks `amount` of `token` and mints the same amount of its wrapped token to `recipient`. The caller pays, so the recipient can be anyone.

```compact
export circuit shield(
  token: Bytes<32>,
  amount: Uint<64>,
  nonce: Bytes<32>,
  recipient: Either<ZswapCoinPublicKey, ContractAddress>
): ShieldedCoinInfo {
  const underlying = disclose(token);
  const value = disclose(amount);
  const to = disclose(recipient);
  assert(!to.is_left || to.left != default<ZswapCoinPublicKey>, "shielded-pools: zero recipient");
  assert(to.is_left || to.right != kernel.self(), "shielded-pools: recipient is this contract");

  receiveUnshielded(underlying, value);
  return mintShieldedToken(underlying, value, disclose(nonce), to);
}
```

- **To a person** (`left(coinKey)`): the depositor, token, and amount are public. The recipient stays private, because only the new coin’s commitment reaches the ledger. This relies on a fresh, secret `nonce` per call. The recipient’s wallet finds the coin only if it is encrypted to their encryption key, which the contract can’t check, so clients should take a full shielded address.
- **To a contract** (`right(address)`): that contract must claim the coin in its own call in the same transaction, so its address is public. It can’t be this contract, which has no way to spend coins it owns.

## `unshield`

Takes a wrapped coin, checks that it wraps `token`, retires it, and releases the same amount of `token` to `recipient`.

```compact
export circuit unshield(
  token: Bytes<32>,
  coin: ShieldedCoinInfo,
  recipient: Either<ContractAddress, UserAddress>
): [] {
  const underlying = disclose(token);
  const paid = disclose(coin);
  const to = disclose(recipient);
  assert(paid.color == tokenType(underlying, kernel.self()), "shielded-pools: wrong token");
  assert(to.is_left || to.right != default<UserAddress>, "shielded-pools: zero recipient");
  assert(!to.is_left || to.left != kernel.self(), "shielded-pools: recipient is this contract");

  receiveShielded(paid);
  sendUnshielded(underlying, paid.value, to);
}
```

The recipient, token, and amount are public. Whose shielded funds paid for it is not. The wallet funds the coin from any wrapped coins it holds and keeps the change, so amounts don’t have to match an earlier `shield`.

## Deployment and verification

Public deployments run from a GitHub workflow that:

1. builds the requested published version from its git tag,
2. refuses to continue unless the build matches the npm package byte for byte,
3. deploys with no maintenance authority, and
4. fails unless the chain shows the contract can’t be changed and its verifier keys match the build.

No maintenance key is ever created. The deploy wallet only pays fees and has no power over the contract. See the repository’s README to deploy your own instance, for example on a local network.

The SDK pins the SHA-256 of the contract manifest, which lists every proving key and ZKIR file by hash. Whoever serves those files to a browser can’t substitute different ones.
