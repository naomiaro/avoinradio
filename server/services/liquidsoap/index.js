"use strict";

const Telnet = require("telnet-client");

const params = {
  host: process.env.TELNET_HOST,
  port: process.env.TELNET_PORT,
  stripShellPrompt: false,
  shellPrompt: "",
  loginPrompt: "",
  passwordPrompt: "",
  username: "",
  password: "",
  initialLFCR: true,
  negotiationMandatory: false,
  timeout: 1500
};

module.exports = async function(fastify, opts) {
  fastify.post("/telnet", async function(request, reply) {
    const connection = new Telnet();
    const cmd = request.body.cmd;

    try {
      await connection.connect(params);
    } catch (error) {
      return { error };
    }

    const res = await connection.exec(cmd, {
      echoLines: 0
    });
    return { res };
  });
};
