'use strict'

const icy = require('icy');
const ogg = require( 'ogg' );
// const prism = require('prism-media');

module.exports = function (fastify, opts, next) {
  fastify.get('/audio', function (request, reply) {
    const url = 'http://localhost:8000/radio.ogg';

    icy.get(url, res => {
      console.log(res.headers)

      res.on('metadata', metadata => {
        const parsed = icy.parse(metadata);
        console.log(parsed);
      });

      // try {
      //   res.pipe(new prism.opus.OggDemuxer())
      //     .on('error', console.log)
      //    .pipe(new prism.opus.Decoder({ rate: 48000, channels: 2, frameSize: 960 }))
      //    .on('error', console.log);
      // } catch (e) {
      //   console.log(e)
      // }
      
      reply.send(res);
    });
  });

  next();
}
