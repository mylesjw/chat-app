import React, {useEffect, useState, FunctionComponent} from 'react';
import Channel from "../../components/channels/index";
import MessageBox from "../../components/messageBox/index";
import {getChannels} from "../../services/api/channels";
import createChannelSocket from "../../services/sockets/index";

import {
  Container
} from './styles'

interface IChannel {
  name: string,
  id: string
}

const ChatBoxContainer: FunctionComponent = () => {

  const [currentChannel, setCurrentChannel] = useState<IChannel>()
  const [channels, setChannels] = useState<Array<IChannel>>([]);
  const [socket, setSocket] = useState<SocketIOClient.Socket>();

  useEffect(() => {
    getChannels()
      .then(data => {
        const newData = data.map(x => ({
          name: x.name,
          id: x._id
        }))
        setChannels(newData);
        setCurrentChannel(newData[0]);
      })
  }, []);

  useEffect(() => {
    if(socket) {
      socket.on('new channel', (channel) => {
        setChannels([...channels, channel]);
      });
    }
  }, [socket])

  useEffect(() => {
    if(socket) socket.close();
    setSocket(createChannelSocket(currentChannel?.name));
  }, [currentChannel]);

  const onChannelClick = (channel: IChannel) => {
    if(currentChannel.id != channel.id) setCurrentChannel(channel);
  }

  const onNewChannel = () => {
    const channelName = prompt("Enter name of new Channel");
    if(channelName) {
      socket.emit('new channel', channelName);
    }
  }


  return (
    <Container>
      <Channel
        onChannelClick={onChannelClick}
        onNewChannel={onNewChannel}
        channels={channels}
        currentChannel={currentChannel}
        socket={socket}
      />
      <MessageBox socket={socket} channelId={currentChannel?.id} />
    </Container>
  )
}

export default ChatBoxContainer;