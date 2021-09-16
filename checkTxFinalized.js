import * as ethers from 'ethers';

// Define the TxHash to Check Finality
const txHash = '0xbd608b77c9610eb6de36a14ee924b16716c4e3c24824f414886eb8d73f07e40f';

// Define the RPC of the Provider
const providerRPC = {
  moonriver: {
    name: 'moonriver',
    rpc: 'https://rpc.moonriver.moonbeam.network',
    chainId: 1285,
  },
};

// Define the Web3 provider
const web3Provider = new ethers.providers.JsonRpcProvider(providerRPC.moonriver.rpc, {
  chainId: providerRPC.moonriver.chainId,
  name: providerRPC.moonriver.name,
});

// Define the function for the Custom Web3 Request
const customWeb3Request = async (web3Provider, method, params) => {
  return web3Provider.send(method, params, (error, result) => {
    if (error) {
      reject(
        `Failed to send custom request (${method} (${params.join(',')})): ${
          error.message || error.toString()
        }`
      );
    }
    resolve(result);
  });
};

const main = async () => {
  // Get the latest finalized block of the Substrate chain
  // Uses Polkadot JSON-RPC
  const finalizedHeadHash = await customWeb3Request(web3Provider, 'chain_getFinalizedHead', []);

  // Get finalized block header to retrieve number
  // Uses Polkadot JSON-RPC
  const finalizedBlockHeader = await customWeb3Request(web3Provider, 'chain_getHeader', [
    finalizedHeadHash,
  ]);
  const finalizedBlockNumber = parseInt(finalizedBlockHeader.number, 16);

  // Get the transaction receipt of the given tx hash
  // Uses Ethereum JSON-RPC
  const txReceipt = await customWeb3Request(web3Provider, 'eth_getTransactionReceipt', [txHash]);
  const txBlockNumber = parseInt(txReceipt.blockNumber, 16);

  // If block number of receipt is not null, compare it against finalized head
  if (txReceipt.blockNumber) {
    console.log(`Current finalized block number is ${finalizedBlockNumber}`);
    console.log(
      `Your transaction in block ${txBlockNumber} is finalized? ${
        finalizedBlockNumber >= txBlockNumber
      }`
    );
  } else {
    console.log('Your transaction has not been included in the canonical chain');
  }
};

main();
