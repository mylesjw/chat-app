import React, {useEffect, useState, createRef, FunctionComponent} from 'react';

import {
  ChatContainer,
  ChatBox,
  MessageForm,
  MessageInput,
  MessageItem
} from './styles'
import {getMessages} from "../../services/api/messages";

interface IMessageBoxProps {
  socket: SocketIOClient.Socket,
  channelId: string
}

const MessageBox: FunctionComponent<IMessageBoxProps> = (props: IMessageBoxProps) => {
  const [messages, setMessages] = useState<Array<string>>([]);
  const [newMessage, setNewMessage] = useState<string>();
  const [incomingMessage, setIncomingMessage] = useState("");

  const scrollBox = createRef<HTMLUListElement>();

  useEffect(() => {
    getMessages(props.channelId)
      .then(data => {
        setMessages(data.map(x => x.contents));
      });
  }, [props.channelId])

  useEffect(() => {
    scrollBox.current.scrollTop = scrollBox.current.scrollHeight;
  }, [messages])

  useEffect(() => {
    if(props.socket) {
      props.socket.on('chat message', (msg) => {
        setIncomingMessage((msg))
      });
    }
  }, [props.socket]);

  useEffect(() => {
    setMessages([...messages, incomingMessage]);
  }, [incomingMessage]);

  const onMessageSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    props.socket.emit('chat message', {
      contents: newMessage,
      date: new Date(),
      userId: "1",
      channelId: props.channelId
    });
    setNewMessage("");
  }

  const onMessageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewMessage(e.target.value);
  }

  return (
    <ChatContainer>
      <ChatBox>
        <ul ref={scrollBox}>
          {messages && messages.map(msg => (
            <MessageItem>{msg}</MessageItem>
          ))}
        </ul>
      </ChatBox>
      <MessageInput>
        <MessageForm onSubmit={onMessageSubmit}>
          <input
            type="text"
            autoComplete="off"
            onChange={onMessageChange}
            placeholder="Type your message"
            value={newMessage}
          />
          <input type="submit" value="SEND" />
        </MessageForm>
      </MessageInput>
    </ChatContainer>
  )
}

export default MessageBox;