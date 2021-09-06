/*
  Simple script to calculate a contract address based on the
  public address and a given nonce (manual input)
*/

import * as ethers from 'ethers';
import * as RLP from 'rlp';

// Provide Public Address (with 0x) and Nonce
const address = 'address';
const nonce = 0; //<--- Enter nonce here

// Verify address
let ethAddress;
try {
  ethAddress = ethers.utils.getAddress(address);
} catch (error) {
  throw Error(`${address} is not a valid Ethereum Address`);
}

// First we calculate the RLP encode
const rlpEncode = RLP.encode([address, nonce]);

// Then calculate the sha3 of the rlpEncode
const sha3 = ethers.utils.keccak256(rlpEncode);

// Extract the substring that is the address
// The address is the last 40 hex characters (plus 0x)
const contractAddress = '0x' + sha3.slice(-40);

// Use Ethers to display is as an Ethereum valid address (checksum)
const ethContractAddress = ethers.utils.getAddress(contractAddress);
console.log(`Your contract address with nonce ${nonce} is ${ethContractAddress}`);
