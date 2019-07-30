'use strict'

const Telnet = require('telnet-client');

const params = {
  host: '127.0.0.1',
  port: 1234,
  timeout: 1500
};

async function run(cmd, args) {
  let connection = new Telnet();

  try {
    await connection.connect(params);
    return connection.exec(cmd);
  } catch(err) {
    throw err;
  }
}

module.exports = function (fastify, opts) {
  fastify.register(require('fastify-formbody'));

  fastify.post('/telnet', async function (req, res) {
    const cmd = req.body.cmd;
    try {
      const result = await run(cmd);
      console.log(result);
    } catch (err) {
      console.log(err)
    }
    
    return null;
  });
}
