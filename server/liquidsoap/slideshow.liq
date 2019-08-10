#!/Users/naaro/.opam/4.08.0/bin/liquidsoap -v

%include "base.liq"

set("frame.video.width", 768)
set("frame.video.height", 1008)
set("frame.video.samplerate", 12)

def images
  video.fade.in(duration=1.,video.fade.out(duration=1.,playlist(prefix="annotate:duration=12:","images.txt")))
end

def sound
  audio_to_stereo(playlist("music.txt"))
end

s = map_metadata(map_audio_metadata, sound)
s = on_metadata(apply_metadata, s)
s = on_track(apply_track_change, s)

p = map_metadata(map_image_metadata, images)
p = on_metadata(apply_metadata, p)
p = on_track(apply_track_change, p)

v = mksafe(mux_video(video=p, s))
v = video.add_image(
       width=258,
       height=176,
       x=0,
       y=0,
       file="mural_logo.jpg",
       v)

# Add image credits
# https://www.shodor.org/stella2java/rgbint.html
v = video.add_text.gstreamer(
  x=0,
  y=-60,
  color=16777215,
  size=24,
  speed=0,
  cycle=false,
  font="josefin-sans/JosefinSans-Bold.ttf",
  metadata="image_credit",
  "",
  v)

# Add audio credits
# https://www.shodor.org/stella2java/rgbint.html
v = video.add_text.gstreamer(
  x=0,
  y=-20,
  color=16777215,
  size=18,
  speed=0,
  cycle=false,
  font="josefin-sans/JosefinSans-Regular.ttf",
  metadata="audio_credit",
  "",
  v)

v = drop_metadata(v)
v = merge_tracks(v)

output.icecast(%ogg(%theora(quality=20,width=768,height=1008),%vorbis),
  description="Various photos from Finland & Blitz // Berlin music",
  format="video/ogg",
  icy_metadata="false",
  mount="/slideshow.ogg",
  v)
