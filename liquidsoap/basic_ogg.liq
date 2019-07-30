#!/Users/naaro/.opam/4.08.0/bin/liquidsoap -v

a = single("../server/music/test.ogg")

output.icecast = output.icecast(
  host="localhost",
  port=8000,
  password="hackme")

output.icecast(%ogg(%vorbis), mount="radio.ogg", a)
