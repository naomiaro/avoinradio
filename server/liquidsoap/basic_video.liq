#!/Users/naaro/.opam/4.08.0/bin/liquidsoap -v

# Set 480p resolution @ 24fps
set("frame.video.width", 848)
set("frame.video.height", 480)
set("frame.video.samplerate", 24)

output.icecast = output.icecast(
  host="localhost",
  port=8000,
  password="hackme")

v = single("forest.mp4")

# GStreamer outputs require this so that Liquidsoap doesn't handle syncing, but rather GStreamer itself
clock.assign_new(sync=false,[v])

output.icecast(%ogg(%theora(quality=20,width=848,height=480),%vorbis), format="video/ogg", icy_metadata="false", mount="/video", v)
