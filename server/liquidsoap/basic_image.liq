#!/Users/naaro/.opam/4.08.0/bin/liquidsoap -v

%include "base.liq"

set("frame.video.width", 768)
set("frame.video.height", 1008)
set("frame.video.samplerate", 12)

def get_next() =
  dir = "~/Code/avoinradio/server/liquidsoap/"

  # 3024 x 4032
  # 768 x 1008
  images = [
    "annotate:duration=10:#{dir}images/IMG_20190719_185856.jpg",
    "annotate:duration=8:#{dir}images/MVIMG_20190714_172004.jpg",
    "annotate:duration=12:#{dir}images/IMG_20190720_160836.jpg"
  ]

  rand = list.randomize(images)
  pick = list.hd(default="", rand)

  request.create(pick)
end

# Create the source
s = request.dynamic(id="slideshow", get_next)


output.icecast(%ogg(%theora(quality=25,width=768,height=1008)), mount="/images", mksafe(s))
