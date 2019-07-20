'use strict'

const icy = require('icy');
const fs = require('fs');
const nodeshout = require('nodeshout');
const prism = require('prism-media');
const FileReadStream = nodeshout.FileReadStream;
const ShoutStream = nodeshout.ShoutStream;

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
         .pipe(new prism.opus.Decoder({ rate: 48000, channels: 2, frameSize: 960 }));
      reply.send(res);
    });
  });

  fastify.get('/test', function (request, reply) {
    nodeshout.init();

    console.log('Libshout version: ' + nodeshout.getVersion());

    // Create instance and configure it.
    const shout = nodeshout.create();
    shout.setHost('localhost');
    shout.setPort(8000);
    shout.setUser('source');
    shout.setPassword(process.env.ICECAST_SOURCE_PASSWORD);
    shout.setMount('radio.ogg');
    shout.setFormat(0); // 0=ogg, 1=mp3
    shout.setAudioInfo('bitrate', '192');
    shout.setAudioInfo('samplerate', '44100');
    shout.setAudioInfo('channels', '2');

    shout.open();

    // Any input that FFmpeg accepts can be used here -- you could use mp4 or wav for example.
    const input = fs.createReadStream('./music/test.ogg');
    const transcoder = new prism.FFmpeg({
      args: [
        '-analyzeduration', '0',
        '-loglevel', '0',
        '-f', 's16le',
        '-ar', '48000',
        '-ac', '2',
      ],
    });

    const opus = new prism.opus.Encoder({ rate: 48000, channels: 2, frameSize: 960 });

    const shoutStream = input
      .pipe(transcoder)
      .pipe(opus)
      .pipe(new ShoutStream(shout));

    // Create file read stream and shout stream
    // var fileStream = new FileReadStream('./music/test.mp3', 65536),
    //     shoutStream = fileStream.pipe(new ShoutStream(shout));

    // fileStream.on('data', function(chunk) {
    //     console.log('Read %d bytes of data', chunk.length);
    // });

    shoutStream.on('finish', function() {
        console.log('Finished playing...');
    });

    reply.send(null);
  })

  next();
}

// If you prefer async/await, use the following
//
// module.exports = async function (fastify, opts) {
//   fastify.get('/example', async function (request, reply) {
//     return 'this is an example'
//   })
// }
