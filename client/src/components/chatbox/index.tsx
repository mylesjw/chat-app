import React,
{
  useEffect,
  useState,
  FunctionComponent,
} from 'react';
import {sendMessage, getMessages} from "../../services/api/messages";
import {getChannels, createChannel} from "../../services/api/channels";
import createChannelSocket from "../../services/sockets/index";
import {
  Container,
  ChannelContainer,
  ChatContainer,
  MessageInput,
  MessageBox,
  MessageForm,
  MessageItem,
  ChannelItem,
  AddChannelButton
} from './styles'


const Chatbox: FunctionComponent = ()=>  {

  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [incomingMessage, setIncomingMessage] = useState("");
  const [channels, setChannels] = useState([])
  const [currentChannel, setCurrentChannel] = useState({
    name: "",
    _id: ""
  });
  const [socket, setSocket] = useState<SocketIOClient.Socket>();

  useEffect(() => {
    getChannels()
      .then(data => {
        setChannels(data);
        setCurrentChannel(data[0]);
      });
  }, []);

  useEffect(() => {
    if(socket) socket.close();
    setSocket(createChannelSocket(currentChannel.name))
    getMessages(currentChannel._id)
      .then(data => {
        setMessages(data.map(x => x.contents))
      })
  }, [currentChannel]);

  useEffect(() => {
    if(socket) {
      socket.on('chat message', (msg) => {
        console.log(msg);
        setIncomingMessage(msg);
      })
    };
  }, [socket])

  useEffect(() => {
    if(incomingMessage) {
      setMessages([...messages, incomingMessage]);
      setIncomingMessage('');
    }
  }, [incomingMessage])

  const onMessageSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const date = new Date();
    socket.emit('chat message', message);
    sendMessage(message, date, "1", currentChannel._id);
    setMessage('');
  }

  const onNewChannel = () => {
    const channelName = prompt("Enter name of new Channel");
    if(channelName) {
      createChannel(channelName);
    }
  }

  const onMessageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value);
  }

  const onChannelClick = (channel) => {
    if(currentChannel._id != channel._id) setCurrentChannel(channel)
    console.log(currentChannel)
  }

  return (
    <Container>
      <ChannelContainer>
        {channels.length && channels.map(channel => (
          <ChannelItem onClick={(e) => {
            e.preventDefault();
            onChannelClick(channel)
          }}>{channel.name}</ChannelItem>
        ))}
        <AddChannelButton onClick={onNewChannel}><span>&#43;</span></AddChannelButton>
      </ChannelContainer>
      <ChatContainer>
        <MessageBox>
          <ul>
            {messages.map(msg => <MessageItem>{msg}</MessageItem>)}
          </ul>
        </MessageBox>
        <MessageInput>
          <MessageForm onSubmit={onMessageSubmit}>
            <input type="text"
                   autoComplete="off"
                   onChange={onMessageChange}
                   placeholder="Type your message"
                   value={message}
            />
            <input type="submit" value="SEND" />
          </MessageForm>
        </MessageInput>
      </ChatContainer>
    </Container>
  );
}

export default Chatbox;
