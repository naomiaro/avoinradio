'use strict'

const icy = require('icy');
const fs = require('fs');
const nodeshout = require('nodeshout');
const ogg = require( 'ogg' );
const prism = require('prism-media');
const FileReadStream = nodeshout.FileReadStream;
const ShoutStream = nodeshout.ShoutStream;
var Speaker = require('speaker');

module.exports = function (fastify, opts, next) {
  fastify.get('/audio', function (request, reply) {
    const url = 'http://localhost:8000/radio.ogg';

    icy.get(url, res => {
      console.log(res.headers)

      res.on('metadata', metadata => {
        const parsed = icy.parse(metadata);
        console.log(parsed);
      });

      try {
        res.pipe(new prism.opus.OggDemuxer())
          .on('error', console.log)
         .pipe(new prism.opus.Decoder({ rate: 48000, channels: 2, frameSize: 960 }))
         .on('error', console.log);
      } catch (e) {
        console.log(e)
      }
      
      reply.send(res);
    });
  });

  fastify.get('/ogg', function (request, reply) {
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
    shout.setAudioInfo('samplerate', '48000');
    shout.setAudioInfo('channels', '2');

    shout.open();

    fs.open("./music/test.ogg", 'r', function(status, fd) {
      if (status) {
          console.log(status.message);
          return;
      }

      fs.fstat(fd, function(err, stats) {
          var fileSize = stats.size,
              bufferSize = fileSize,
              chunkSize = 4096,
              buffer = new Buffer(bufferSize),
              bytesRead = 0;

          console.log('Got file stats, file size: ' + fileSize);
          while (bytesRead < fileSize) {
              if ((bytesRead + chunkSize) > fileSize) {
                  chunkSize = (fileSize - bytesRead);
              }

              var num = 0;
              try {
                  num = fs.readSync(fd, buffer, 0, chunkSize, bytesRead);
              } catch(e) {
                  console.log(e);
                  debugger;
              }

              bytesRead += num;
              console.log('Bytes read:' + bytesRead + ' Total:' + fileSize);

              if (num > 0) {
                  shout.send(buffer, num);
              }
              else {
                  console.log('Zero bytes read, aborting');
                  break;
              }

              shout.sync();
          }

          fs.closeSync(fd);
          shout.close();
      });
    });

    reply.send(null);
  });

  fastify.get('/mp3', function (request, reply) {
    nodeshout.init();

    console.log('Libshout version: ' + nodeshout.getVersion());

    // Create instance and configure it.
    const shout = nodeshout.create();
    shout.setHost('localhost');
    shout.setPort(8000);
    shout.setUser('source');
    shout.setPassword(process.env.ICECAST_SOURCE_PASSWORD);
    shout.setMount('radio.mp3');
    shout.setFormat(1); // 0=ogg, 1=mp3
    shout.setAudioInfo('bitrate', '192');
    shout.setAudioInfo('samplerate', '48000');
    shout.setAudioInfo('channels', '2');

    shout.open();

    var fileStream = new FileReadStream('./music/test.mp3', 65536),
        shoutStream = fileStream.pipe(new ShoutStream(shout));

    fileStream.on('data', function(chunk) {
        console.log('Read %d bytes of data', chunk.length);
    });

    shoutStream.on('finish', function() {
        console.log('Finished playing...');
    });

    reply.send(null);
  });

  next();
}
