import fastify from 'fastify'
import formBody from 'fastify-formbody'
import qr from 'qrcode'
import speakeasy from 'speakeasy'

const server = fastify({logger: true});
server.register(formBody)

// 環境変数を指定すると check時に正とするsecretが固定される
let {SecretPerUser} = process.env
let globalSecret: string = SecretPerUser || ""
const secret = speakeasy.generateSecret({
  length: 20,
  name: "example.com",
  issuer: 'oliva-bookun'
});
if (globalSecret === "") {
  globalSecret = secret.base32
}
console.log(`global secret: ${globalSecret}`)

server.get('/', async (_, res) => {
  res.header("Access-Control-Allow-Origin", "*")
  if (secret.otpauth_url === undefined) {
    res.code(500);
    return;
  }
  res.type('application/json').code(200);
  try {
    const url = speakeasy.otpauthURL({
      secret: secret.ascii,
      label: encodeURIComponent('example.com'),
      issuer: 'oliva-bookun'
    })
    const qrCode = await qr.toDataURL(url)
    res.code(200).send({"data": qrCode})
  } catch (err) {
    res.code(500).send({"error": err})
  }
})

server.post('/check', async (req, res) => {
  // @ts-ignore
  const {code} = req.body
  console.log(code)
  const verified = speakeasy.totp.verify({
    secret: globalSecret,
    encoding: "base32",
    token: code,
  })
  if (verified) {
    res.code(200).send({"message": "おｋ"})
    return
  }
  res.code(200).send({"message": "だめ"})
})

server.listen(3000, (err, address) => {
  if (err) throw err;
  server.log.info(`server listening on ${address}`);
})

