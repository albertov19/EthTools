import * as ethers from 'ethers';

// Define the TxHash to Check Finality
const blockNumber = '6000000';

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
  try {
    return await web3Provider.send(method, params);
  } catch (error) {
    throw new Error(error.body);
  }
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

  // If block number of receipt is not null, compare it against finalized head
  console.log(`Current finalized block number is ${finalizedBlockNumber}`);
  console.log(`Is your block ${blockNumber} final? ${finalizedBlockNumber >= blockNumber}`);
};

main();
