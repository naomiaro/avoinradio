'use strict'

const icy = require('icy');
const prism = require('prism-media');

module.exports = function (fastify, opts, next) {
  fastify.get('/audio', function (request, reply) {
  const url = 'http://localhost:8000/radio.ogg';

    icy.get(url, res => {
      console.log(res.headers)

      res.on('metadata', metadata => {
        const parsed = icy.parse(metadata);
        console.log(parsed);
      });

      res.pipe(new prism.opus.OggDemuxer())
         .pipe(new prism.opus.Decoder({ rate: 44100, channels: 2, frameSize: 960 }));
      reply.send(res);
    });
  });

  next();
}

// If you prefer async/await, use the following
//
// module.exports = async function (fastify, opts) {
//   fastify.get('/example', async function (request, reply) {
//     return 'this is an example'
//   })
// }
