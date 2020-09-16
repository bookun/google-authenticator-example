import fastify from 'fastify'

const server = fastify({logger: true});

server.get('/', async (_, res) => {
  res.type('application/json').code(200);
  return {hello: 'world2'};
})

server.listen(3000, (err, address) => {
  if (err) throw err;
  server.log.info(`server listening on ${address}`);
})

