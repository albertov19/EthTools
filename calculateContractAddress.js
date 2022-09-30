/*
  Simple script to calculate a contract address based on the
  public address and a given nonce (manual input)
*/

import * as ethers from 'ethers';
import * as RLP from 'rlp';

// Provide Public Address (with 0x) and Nonce
const address = '0x7AbCE41C5153d199EafFf2Cd80B43ADf4C71F8f6';
let nonce = 3; //<--- Enter nonce here

// If we want to find a specific nonce for contract deployment
const findFlag = 0;
const targetAddress = '0x98878b06940ae243284ca214f92bb71a2b032b8a';
let calcAddress = '';

// Verify address
let ethAddress;
try {
  ethAddress = ethers.utils.getAddress(address);
} catch (error) {
  throw Error(`${address} is not a valid Ethereum Address`);
}

console.log(`Your address is ${address}`);
while (calcAddress.toLowerCase() !== targetAddress.toLowerCase()) {
  // First we calculate the RLP encode
  const rlpEncode = RLP.encode([address, nonce]);

  // Then calculate the sha3 of the rlpEncode
  const sha3 = ethers.utils.keccak256(rlpEncode);

  // Extract the substring that is the address
  // The address is the last 40 hex characters (plus 0x)
  const contractAddress = '0x' + sha3.slice(-40);

  // Use Ethers to display is as an Ethereum valid address (checksum)
  calcAddress = ethers.utils.getAddress(contractAddress);
  console.log(`Your contract address with nonce ${nonce} is ${calcAddress}`);

  // Exit if findFlag is false
  if (!findFlag) {
    break;
  }

  nonce++;
}
