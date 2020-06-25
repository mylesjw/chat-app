import Channel from "./models/Channel";
import Message from "./models/Message";
import SocketIO from "socket.io";

interface IMessage {
  contents: string,
  date: Date,
  userId: string,
  channelId: string
}

let ioServer: SocketIO.Server;
let rooms: Array<SocketIO.Namespace>;

export default function initSockets(server: any) {
  ioServer = SocketIO(server, {
    path: '/channels'
  });
  return Channel.find().then(channels => {
      rooms = channels.map(channel => {
        return initChannel(channel.name);
      });
  })
}

export function initChannel(channel: string) {
  const namespace = ioServer.of(`/${encodeURIComponent(channel)}`);
  namespace.on('connection', (socket) => {
    console.log(`A user has connected to ${channel}`);
    socket.on('new channel', (channel: string) => {
      console.log('Received new channel')
      new Channel({
        name: channel
      }).save().then((channel) => {
        rooms.forEach(room => {
          room.emit('new channel', {
            name: channel.name,
            id: channel._id
          })
        })
        rooms.push(initChannel(channel.name));
      })
    });
    socket.on('chat message', (message: IMessage) => {
      new Message({
        contents: message.contents,
        date: message.date,
        userId: message.userId,
        channelId: message.channelId
      }).save().then((product) => {
        namespace.emit('chat message', product.contents);
      })
    })
  });

  return namespace;
}