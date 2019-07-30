'use strict'

const Telnet = require('telnet-client');

const params = {
  host: '127.0.0.1',
  port: 1234,
  stripShellPrompt: false,
  shellPrompt: '',
  loginPrompt: '', 
  passwordPrompt: '',
  username: '',
  password: '',
  debug: true,
  initialLFCR: true,
  negotiationMandatory: false,
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

module.exports = async function (fastify, opts) {
  fastify.post('/telnet', async function (request, reply) {
    console.log(request.body)
    const cmd = request.body.cmd;

    try {
      const result = await run(cmd);
      console.log(result);
    } catch (err) {
      console.log(err)
    }

    return {}
  })
}
