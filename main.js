var nodeCrypto = require('crypto') //Node.js or Browserify (browser)
var Buffer = require('buffer').Buffer
var BigInteger = require('bigi')

var ecdsa = require('ecdsa')
var sr = require('secure-random') //npm install --save secure-random@1.x
var CoinKey = require('coinkey') //npm install --save coinkey@0.1.0
var bs58 = require('bs58')

var privateKey = sr.randomBuffer(32)
var ck = new CoinKey(privateKey, true) // true => compressed public key / addresses

var msg = new Buffer("hello world!", 'utf8')
var shaMsg = nodeCrypto.createHash('sha256').update(msg).digest()
var signature = ecdsa.sign(shaMsg, ck.privateKey)
var serializedSig = signature.r.toString() + signature.s.toString()

console.log("Serialized sig: " + serializedSig)
var rString = serializedSig.slice(0, 77)
var sString = serializedSig.slice(77, 154)
var reconstructedSig = {
  r: new BigInteger(rString),
  s: new BigInteger(sString)
}
console.log("Verify: " + ecdsa.verify(shaMsg, reconstructedSig, ck.publicKey))
