import Channel from "./models/Channel";
import Message from "./models/Message";
import SocketIO from "socket.io";

interface IMessage {
  contents: String,
  date: Date,
  userId: String,
  channelId: String
}

export default function initSockets(server: any) {
  const io = SocketIO(server, {
    path: '/channels'
  });
  return Channel.find().then(channels => {
      return channels.map(channel => {
        initChannel(channel.name, io);
      });
  })
}

function initChannel(channel: String, socket: SocketIO.Server) {
  const namespace = socket.of(`/${channel}`);
  namespace.on('connection', (socket) => {
    console.log(`A user has connected to ${channel}`);
    socket.on('chat message', (message: IMessage) => {
      new Message({
        contents: message.contents,
        date: message.date,
        userId: message.userId,
        channelId: message.channelId
      }).save().then(() => {
        namespace.emit('chat message', message.contents);
      })
    })
  });

  return namespace;
}