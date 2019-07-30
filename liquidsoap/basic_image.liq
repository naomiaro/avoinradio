#!/Users/naaro/.opam/4.08.0/bin/liquidsoap -v

output.icecast = output.icecast(
  host="localhost",
  port=8000,
  password="hackme")

  def get_next() =
    dir = "~/Code/avoinradio/liquidsoap/"
    images = [
      "annotate:type=\"image\":#{dir}images/IMG_20190719_185856.jpg",
      "annotate:type=\"image\":#{dir}images/IMG_20190720_004740_680.jpg",
      "annotate:type=\"image\":#{dir}images/IMG_20190720_160836.jpg"
    ]

    rand = list.randomize(images)
    pick = list.hd(default="images/MVIMG_20190714_172004.jpg", rand)
    log("HELLLLLLOOOOO #{pick}")
  
    request.create(pick)
  end

# Create the source
s = request.dynamic(id="s", default_duration=10., get_next)


output.icecast(%ogg(%theora(quality=25,width=320,height=240)), mount="/images", mksafe(s))
