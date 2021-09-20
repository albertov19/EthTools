import Web3 from 'web3';

// Define the block number to check (i.e. 525475)
const blockNumber = 'block_number_uint';

// Define the Web3 provider
const web3 = new Web3('https://rpc.moonriver.moonbeam.network');

// Define the function for the Custom Web3 Request
const customWeb3Request = async (web3Provider, method, params) => {
  try {
    return await requestPromise(web3Provider, method, params);
  } catch (error) {
    throw new Error(error);
  }
};

// In Web3.js we need to return a promise
const requestPromise = async (web3Provider, method, params) => {
  return new Promise((resolve, reject) => {
    web3Provider.send(
      {
        jsonrpc: '2.0',
        id: 1,
        method,
        params,
      },
      (error, result) => {
        if (error) {
          reject(error.message);
        } else {
          if (result.error) {
            reject(result.error.message);
          }
          resolve(result);
        }
      }
    );
  });
};

const main = async () => {
  // Get the latest finalized block of the Substrate chain
  // Uses Polkadot JSON-RPC
  const finalizedHeadHash = await customWeb3Request(
    web3.currentProvider,
    'chain_getFinalizedHead',
    []
  );

  // Get finalized block header to retrieve number
  // Uses Polkadot JSON-RPC
  const finalizedBlockHeader = await customWeb3Request(web3.currentProvider, 'chain_getHeader', [
    finalizedHeadHash.result,
  ]);
  const finalizedBlockNumber = parseInt(finalizedBlockHeader.result.number, 16);

  // If block number of receipt is not null, compare it against finalized head
  console.log(`Current finalized block number is ${finalizedBlockNumber}`);
  console.log(`Is your block ${blockNumber} final? ${finalizedBlockNumber >= blockNumber}`);
};

main();
