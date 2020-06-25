import io from "socket.io-client";

export default function createChannelSocket(channel) {
  return io.connect(`http://localhost:5000/${encodeURIComponent(channel)}`, {
    path: `/channels`,
    forceNew: true
  });
}