#!/Users/naaro/.opam/4.08.0/bin/liquidsoap -v

# Set 480p resolution @ 24fps
set("frame.video.width", 848)
set("frame.video.height", 480)
set("frame.video.samplerate", 24)

output.icecast = output.icecast(
  host="localhost",
  port=8000,
  password="hackme")

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

#output.ao(fallible=true,sound)
#clock(id="video", output.gstreamer.video(images))
#s = mux_video(video=images,sound)
#output.gstreamer.audio_video(fallible=true, s)

v = mksafe(mux_video(video=images,sound))
# GStreamer outputs require this so that Liquidsoap doesn't handle syncing, but rather GStreamer itself
#clock.assign_new(sync=false,[v])

output.icecast(%ogg(%theora(quality=20,width=848,height=480),%vorbis), format="video/ogg", icy_metadata="false", mount="/slideshow.ogg", v)
