import speakeasy from 'speakeasy'

const secret = speakeasy.generateSecret({
  length: 20,
  name: "example.com",
  issuer: 'oliva-bookun'
});

console.log('忘れてはならない')
console.log(`secret ascii: ${secret.ascii}`)
console.log(`secret base32: ${secret.base32}`)
