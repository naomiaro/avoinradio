#!/Users/naaro/.opam/4.08.0/bin/liquidsoap -v

%include "base.liq"

set("frame.video.width", 768)
set("frame.video.height", 1008)
set("frame.video.samplerate", 12)

# def images
#   video.fade.in(duration=1.,video.fade.out(duration=1.,
#     video.add_text(metadata="filename","<no filename>",
#                    size=12,
#                    playlist(prefix="annotate:duration=3:","images.txt"))))
# end

def images
  playlist(prefix="annotate:duration=10:","images.txt")
end

def sound
  audio_to_stereo(playlist("music.txt"))
end

v = mksafe(mux_video(video=images,sound))

output.icecast(%ogg(%theora(quality=20,width=768,height=1008),%vorbis),
  format="video/ogg",
  icy_metadata="false",
  mount="/slideshow.ogg",
  v)
