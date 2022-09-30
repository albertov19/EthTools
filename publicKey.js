const keccak256 = require('keccak256');
const secp256k1 = require('secp256k1');
const privateKey = new Buffer.from('PRIV_KEY', 'hex');

let pubKey = secp256k1.publicKeyCreate(privateKey, false).slice(1);
const pubKeyHex = '0x' + Buffer.from(pubKey).toString('hex');
console.log(`Public Key: ${pubKeyHex}`);

let address = keccak256(pubKeyHex).toString('hex').slice(-40);
console.log(`Address 0x${address}`);
