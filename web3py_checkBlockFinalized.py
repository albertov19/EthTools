from web3 import Web3

# Define the block number to check (i.e. 525475)
blockNumber = 525475

# Define the Web3 provider
RPC_address = 'https://rpc.moonriver.moonbeam.network'
web3Provider = Web3(Web3.HTTPProvider(RPC_address))

# asynchronous JSON RPC API request
def customWeb3Request(method, params):
    response = web3Provider.provider.make_request(method, params)
    return response

if __name__ == "__main__":
    # Get the latest finalized block of the Substrate chain
    # Uses Polkadot JSON-RPC
    finalizedHeadHash = customWeb3Request('chain_getFinalizedHead', [])

    # Get finalized block header to retrieve number
    # Uses Polkadot JSON-RPC
    finalizedBlockHeader =  customWeb3Request('chain_getHeader', [finalizedHeadHash["result"]])
    finalizedBlockNumber = int(finalizedBlockHeader["result"]["number"], 16)

    print('Current finalized block number is ' + str(finalizedBlockNumber))
    print('Is your block ' +str(blockNumber) + ' finalized? ' + str(finalizedBlockNumber >= blockNumber))
