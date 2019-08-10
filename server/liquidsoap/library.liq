
def map_image_metadata(m) =
  title = m["title"]
  artist = m["artist"]

  [("image_credit","Photo credits: #{title}, by #{artist}")]
end

def map_audio_metadata(m) =
  title = m["title"]
  artist = m["artist"]

  [("audio_credit","Currently listening to: #{title}, by #{artist}")]
end

# This function is called when
# a new metadata block is passed in
# the stream.
def apply_metadata(m) =
  title = m["title"]
  artist = m["artist"]
  print("Received metadata: #{title} by #{artist}")
end

# This function is called when
# a new track starts in the main streaming thread
def apply_track_change(m) =
  title = m["title"]
  artist = m["artist"]
  broadcast = m["on_air"]
  print("Now playing: #{title} by #{artist} at #{broadcast}")
end

# Add a skip function to a source
# when it does not have one
# by default
def add_skip_command(s) =
 # A command to skip
 def skip(_) =
   source.skip(s)
   "Done!"
 end
 # Register the command:
 server.register(
  namespace="#{source.id(s)}",
  usage="skip",
  description="Skip the current song.",
  "skip", skip)
end

icecast_host = getenv("ICECAST_HOST")
icecast_port = int_of_string(getenv("ICECAST_PORT"))
icecast_password = getenv("ICECAST_SOURCE_PASSWORD")

output.icecast = output.icecast(
  host=icecast_host,
  port=icecast_port,
  password=icecast_password)