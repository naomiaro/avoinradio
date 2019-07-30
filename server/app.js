'use strict'

require('dotenv').config();
const Static = require('fastify-static');
const path = require('path');
const AutoLoad = require('fastify-autoload');
const formbody = require('fastify-formbody');

module.exports = function (fastify, opts, next) {
  // Place here your custom code!
  fastify.register(formbody);
  fastify.register(Static, {
    root: path.join(__dirname, 'public'),
    prefix: '/public' // optional: default '/'
  })

  // Do not touch the following lines

  // This loads all plugins defined in plugins
  // those should be support plugins that are reused
  // through your application
  fastify.register(AutoLoad, {
    dir: path.join(__dirname, 'plugins'),
    options: Object.assign({}, opts)
  })

  // This loads all plugins defined in services
  // define your routes in one of these
  fastify.register(AutoLoad, {
    dir: path.join(__dirname, 'services'),
    options: Object.assign({}, opts)
  })

  // Make sure to call next when done
  next()
}
