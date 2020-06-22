import io from "socket.io-client";

export default function createChannelSocket(channel) {
  const socket = io.connect(`http://localhost:5000/${channel}`, {
    path: `/channels`,
    forceNew: true
  });

  return socket;
}