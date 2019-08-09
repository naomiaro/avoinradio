#!/Users/naaro/.opam/4.08.0/bin/liquidsoap -v

%include "base.liq"

set("frame.video.width", 1920)
set("frame.video.height", 1088)
set("frame.video.samplerate", 25)

v = single("bubble.ogv")
v = mksafe(v)

v = video.add_image(
       width=258,
       height=176,
       x=0,
       y=0,
       file="mural_logo.jpg",
       v)

# https://www.shodor.org/stella2java/rgbint.html
v = video.add_text.gstreamer(
  x=-50,
  y=-20,
  color=16777215,
  speed=0,
  cycle=false,
  font="josefin-sans/JosefinSans-Regular.ttf",
  "Test Test adding more words",
  v)

# GStreamer outputs require this so that Liquidsoap doesn't handle syncing, but rather GStreamer itself
clock.assign_new(sync=false,[v])

output.icecast(%ogg(%theora(quality=20),%vorbis),
  format="video/ogg",
  icy_metadata="false",
  mount="/video",
  v)
