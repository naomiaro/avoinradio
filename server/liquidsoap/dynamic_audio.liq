#!/Users/naaro/.opam/4.08.0/bin/liquidsoap -v

output.icecast = output.icecast(
  host="localhost",
  port=8000,
  password="hackme")

  def get_next() =
    dir = "~/Code/avoinradio/liquidsoap/"
    images = [
      "annotate:type=\"audio\":#{dir}music/test.mp3",
      "annotate:type=\"audio\":#{dir}music/test.ogg"
    ]

    rand = list.randomize(images)
    pick = list.hd(default="", rand)
    log("HELLLLLLOOOOO #{pick}")
  
    request.create(pick)
  end

# Create the source
s = request.dynamic(id="s", default_duration=10., get_next)
z = audio_to_stereo(mksafe(s))

output.icecast(%vorbis, mount="/random.ogg", z)
output.icecast(%mp3, mount="/random.mp3", z)
