#!/Users/naaro/.opam/4.08.0/bin/liquidsoap -v

%include "base.liq"

# Our custom request function
def get_request() = 
  # Get the URI
  uri = list.hd(default="",get_process_lines("cat /Users/naaro/Code/avoinradio/server/request"))
  # Create a request
  request.create(uri)
end

s = request.dynamic(get_request)
s = on_metadata(apply_metadata,s)
s = audio_to_stereo(s)
z = mksafe(id="radio", s)
add_skip_command(z)

output.icecast(%vorbis, mount="/random.ogg", z)
output.icecast(%mp3, mount="/random.mp3", z)