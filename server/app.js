'use strict'

require('dotenv').config();
const path = require('path')
const AutoLoad = require('fastify-autoload')

module.exports = function (fastify, opts, next) {
  // Place here your custom code!

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

// const nodeshout = require('nodeshout');
// const FileReadStream = nodeshout.FileReadStream;
// const ShoutStream = nodeshout.ShoutStream;

// nodeshout.init();

// console.log('Libshout version: ' + nodeshout.getVersion());

// // Create instance and configure it.
// const shout = nodeshout.create();
// shout.setHost('localhost');
// shout.setPort(8000);
// shout.setUser('source');
// shout.setPassword(process.env.ICECAST_SOURCE_PASSWORD);
// shout.setMount('radio.ogg');
// shout.setFormat(0); // 0=ogg, 1=mp3
// shout.setAudioInfo('bitrate', '192');
// shout.setAudioInfo('samplerate', '44100');
// shout.setAudioInfo('channels', '2');

// shout.open();

// // Create file read stream and shout stream
// const fileStream = new FileReadStream('./music/test.ogg', 65536);
// const shoutStream = fileStream.pipe(new ShoutStream(shout));

// fileStream.on('data', function(chunk) {
//     console.log('Read %d bytes of data', chunk.length);
// });

// shoutStream.on('finish', function() {
//     console.log('Finished playing...');
// })
