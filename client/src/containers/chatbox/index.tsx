import React, {useEffect, useState, FunctionComponent} from 'react';
import Channel from "../../components/channels/index";
import MessageBox from "../../components/messageBox/index";
import {getChannels, createChannel} from "../../services/api/channels";

import {
  Container
} from './styles'
import createChannelSocket from "../../services/sockets/index";

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
        setChannels(data.map(x => ({name: x.name, id: x._id})));
        setCurrentChannel(data[0]);
      })
  }, []);

  useEffect(() => {
    console.log(currentChannel)
    if(socket) socket.close();
    setSocket(createChannelSocket(currentChannel?.name));
  }, [currentChannel]);

  const onChannelClick = (channel: IChannel) => {
    if(currentChannel.id != channel.id) setCurrentChannel(channel);
  }

  const onNewChannel = () => {
    const channelName = prompt("Enter name of new Channel");
    if(channelName) {
      createChannel(name);
    }
  }


  return (
    <Container>
      <Channel
        onChannelClick={onChannelClick}
        onNewChannel={onNewChannel}
        channels={channels}
      />
      <MessageBox socket={socket} channelId={currentChannel?.id} />
    </Container>
  )
}

export default ChatBoxContainer;