import React,
{
  useEffect,
  useState,
  FunctionComponent,
} from 'react';
import sendMessage from "../../services/api/messages";

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

interface chatboxProps {
  socket: SocketIOClient.Socket
}

const Chatbox: FunctionComponent<chatboxProps> = (props:chatboxProps) =>  {

  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [incomingMessage, setIncomingMessage] = useState("");
  const [channels, setChannels] = useState([])
  const [currentChannel, setCurrentChannel] = useState({
    name: "",
    _id: ""
  })

  useEffect(() => {
    props.socket.on('chat message', (msg) => {
      console.log(msg);
      setIncomingMessage(msg);
    });
    fetch('/api/channels')
      .then((data) => data.json())
      .then(data => {
        setChannels(data);
        setCurrentChannel(data[0]);
      });
    fetch('/api/messages').then(res => res.json()).then(data => {
      console.log(data)
      setMessages(data.map(item => item.contents));
    });
  }, []);

  useEffect(() => {
    fetch(`/api/messages/${currentChannel._id}`).then(data => data.json())
      .then(data => {
        setMessages(data.map(x => x.contents))
      })
  }, [currentChannel])

  useEffect(() => {
    if(incomingMessage) {
      setMessages([...messages, incomingMessage]);
      setIncomingMessage('');
    }
  }, [incomingMessage])

  const onMessageSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const date = new Date();
    props.socket.emit('chat message', message);
    sendMessage(message, date, "1", currentChannel._id);
    setMessage('');
  }

  const onNewChannel = () => {
    const channelName = prompt("Enter name of new Channel");
    if(channelName) {
      fetch('/api/channels', {
        method: 'POST',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name: channelName
        })
      })
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
