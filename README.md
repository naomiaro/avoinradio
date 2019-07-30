# avoinradio

`brew install opam`
`opam init --compiler=4.07.0`
# Run eval $(opam env) to update the current shell environment
opam switch create 4.07.0
opam install depext
opam depext taglib mad lame fdkaac gstreamer ogg theora vorbis cry ssl samplerate magic opus gavl frei0r camlimages ffmpeg liquidsoap
opam install taglib mad lame fdkaac gstreamer ogg theora vorbis cry ssl samplerate magic opus gavl frei0r camlimages ffmpeg liquidsoap

git clone https://github.com/savonet/liquidsoap-daemon
cd liquidsoap-daemon
./daemonize-liquidsoap.sh


# homebrew
brew install --build-from-source icecast
# download
mkdir -p /usr/local/var/log/icecast
touch /usr/local/var/log/icecast/error.log
touch /usr/local/var/log/icecast/access.log
`icecast -c /usr/local/etc/icecast.xml`

http://icecast.org/docs/
https://opam.ocaml.org/packages/liquidsoap/
https://www.liquidsoap.info/
https://www.linuxjournal.com/content/creating-internet-radio-station-icecast-and-liquidsoap
https://stackoverflow.com/questions/40898292/how-to-install-a-specific-version-of-ocaml-compiler-with-opam


liquidsoap -h video.add_text
liquidsoap --list-plugins
liquidsoap --conf-descr
opam info liquidsoap


# sqlite config
export PATH="/usr/local/opt/sqlite/bin:$PATH"

export LDFLAGS="-L/usr/local/opt/sqlite/lib"
export CPPFLAGS="-I/usr/local/opt/sqlite/include"

pkg-config --exists --print-errors "gstreamer-1.0"
# complained about libffi
export PKG_CONFIG_PATH="/usr/local/lib/pkgconfig:/usr/local/opt/libffi/lib/pkgconfig"

Needed automake to get beyond 
aclocal: command not found


For video.add_text
you should need either gd or gstreamer or sdl

gst-launch-1.0 playbin uri=file:///path/to/file.mp4

