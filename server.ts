import fastify from 'fastify'
import formBody from 'fastify-formbody'
import qr from 'qrcode'
import speakeasy from 'speakeasy'

let secretAscii = ""
let secretBase32 = ""

const server = fastify({logger: true});
server.register(formBody)

server.get('/', async (_, res) => {
  res.header("Access-Control-Allow-Origin", "*")
  res.type('application/json').code(200);
  try {
    console.log(`secretAscii: ${secretAscii}`)
    const url = speakeasy.otpauthURL({
      secret: secretAscii,
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
  console.log(secretBase32, code)
  const verified = speakeasy.totp.verify({
    secret: secretBase32,
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
  // 環境変数を指定すると check時に正とするsecretが固定される
  let {SecretAscii, SecretBase32} = process.env
  if (!(SecretBase32 || SecretAscii)) {
    console.error("set env: SecretAscii and SecretBase32")
    process.exit(1)
  }
  secretAscii = SecretAscii as string
  secretBase32 = SecretBase32 as string
  if (err) throw err;
  server.log.info(`server listening on ${address}`);
})
