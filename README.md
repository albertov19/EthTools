# Eth Tools

Different set of tools realted to Ethereum.

Use at your own risk

## Getting Started

Install packages:

```
yarn
```

Then, run script with `node`.


## Scripts

`calculateContractAddress` Shows the standard way contract address are calculated on Ethereum (nonce and public address)

`web3_checkBlockFinalized` and  `ethers_checkBlockFinalized` do the same thing. Given a block number, it will check if that block is finalized. Uses a web3 provider (custom RPC request) with the Substrate JSON-RPC

`web3_checkTxFinalized`  and `ethers_checkTxFinalized` do the same thing. Given a tx hash, it will check if that transaction is included in a finalized block. Uses a web3 provider (custom RPC request) with the Substrate JSON-RPC

