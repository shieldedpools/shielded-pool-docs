---
title: FAQ
description: Short answers to common questions about sNIGHT, fees, safety, privacy, wallets, and networks.
---
## What is sNIGHT?

A shielded version of NIGHT on Midnight. Each sNIGHT is backed by one NIGHT locked in the Shielded Pools contract, and can always be unwrapped back to one NIGHT.

## Why would I wrap NIGHT?

NIGHT balances and transfers are public. sNIGHT balances and transfers are not. Wrap when you want to hold or send NIGHT’s value without putting it on display. See [Why Shielded Pools](/why/).

## What does it cost?

No protocol fee. You get exactly as much sNIGHT as the NIGHT you wrap, and the other way round. You pay Midnight’s usual network fee in DUST.

## Can the team take my NIGHT, freeze the pool, or stop me withdrawing?

No. The contract has no maintenance authority, so nobody can change, pause, or upgrade it. The only way to release locked NIGHT is to unwrap sNIGHT. See [how the backing is enforced](/how-it-works/#how-the-11-backing-is-enforced).

## Is it audited?

Not yet. The contract is small and public, and you can [read it](/developers/contract/), but it has not had an independent audit. See [Risks](/risks/).

## Is wrapping private?

No. Wrapping and unwrapping are public: the addresses and amounts can be seen. Holding and sending sNIGHT is private. See [Privacy](/privacy/) for how to keep your activity hard to link.

## Do I have to unwrap the same amount I wrapped?

No. You can unwrap any amount up to your sNIGHT balance, in as many pieces as you like. Varying amounts is better for privacy.

## Can I send sNIGHT to someone?

Yes. Either wrap straight to their shielded address, or send sNIGHT from your wallet if it supports shielded tokens. See [Sending sNIGHT](/how-it-works/#sending-snight-to-someone).

## Which wallets work?

Midnight browser wallets that support ledger 9 and dApp connector 4.x.

## What is DUST?

Midnight’s fee resource. Holding NIGHT generates DUST, and every transaction, including wraps and unwraps, spends some.

## Can I wrap NIGHT that’s on Cardano?

Not directly. Shielded Pools works with NIGHT on Midnight. Move your NIGHT to Midnight first.

## Can I try it without real funds?

Yes. Use [preprod.shieldedpools.io](https://preprod.shieldedpools.io) with test NIGHT (tNIGHT) on Midnight’s Preprod network.

## Can I wrap tokens other than NIGHT?

The contract works with any token that uses Midnight’s unshielded ledger coins, and the [SDK](/developers/sdk/) accepts any token. The app currently offers NIGHT only.
