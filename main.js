var nodeCrypto = require('crypto');
var Buffer = require('buffer').Buffer;
var BigInteger = require('bigi');

var ecdsa = require('ecdsa');
var sr = require('secure-random');
var CoinKey = require('coinkey');

function generateKeys(){
  var privateKey = sr.randomBuffer(32);
  return new CoinKey(privateKey, true); // true => compressed public key / addresses
}
function generateSha(buffer){
  return nodeCrypto.createHash('sha256').update(buffer).digest();
}
function generateSignature(shaMsg, privateKey){
  return ecdsa.sign(shaMsg, privateKey);
}
function serializeSignature(signature){
  return signature.r.toString() + signature.s.toString();
}
function deserializeSignature(serializedSignature){
  var rString = serializedSignature.slice(0, 77);
  var sString = serializedSignature.slice(77, 154);
  return {
    r: new BigInteger(rString),
    s: new BigInteger(sString)
  }
}
function verifySignature(shaMsg, signature, publicKey){
  return ecdsa.verify(shaMsg, reconstructedSig, ck.publicKey);
}
window.sigUtils = {
  generateKeys: generateKeys,
  generateSha: generateSha,
  generateSignature: generateSignature,
  serializeSignature: serializeSignature,
  deserializeSignature: deserializeSignature,
  verifySignature: verifySignature
}
