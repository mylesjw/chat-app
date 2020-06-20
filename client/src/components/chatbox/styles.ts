import styled from 'styled-components';

const Container = styled.div`
  max-width: 800px;
  height: 600px;
  margin: 20px auto 0 auto;
  display: flex;
  border: 1px solid rgba(55, 0, 179, 0.5);
`;

const ChannelContainer = styled.div`
  flex-basis: 20%;
  height: 100%;
  border-right: 1px solid rgba(55, 0, 179, 0.5);
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const AddChannelButton = styled.div`
  border-radius: 50%;
  background-color: rgba(55, 0, 179, 0.5);
  height: 40px;
  width: 40px;
  margin-top: auto;
  text-align: center;
  cursor: pointer;
  
  span {
    font-size: 24px;
    margin-top: 5px;
    display: block;
  }
`;

const ChannelItem = styled.div`
  padding: 12px 8px;
  cursor: pointer;
`;

const ChatContainer = styled.div`
  flex-basis: 80%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
`;

const MessageBox = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  
  ul {
    list-style: none;
    padding-left: 0;
    overflow: auto;
  }
`;

const MessageInput = styled.div`
  flex-basis: 60px;
  position: relative;
  bottom: 0;
  width: 100%;
  height: 100%;
`;

const MessageForm = styled.form`
  display: flex;
  max-width: 100%;
  padding: 0 20px;
  
  input[type=text] {
    flex-basis: 90%;
    border: none;
    border-bottom: 1px solid black;
    margin: 0 20px;
  }
  
  input[type=text]:focus {
    border: none;
    border-bottom: 1px solid darkblue;
    outline: none;
  }
  
  input[type=submit] {
    padding: 8px 12px;
    border: none;
    background-color: transparent;
  }
  
  input[type=submit]:focus {
    outline: none;
    text-decoration: underline;
  }
`;

const MessageItem = styled.li`
  align-self: stretch;
  padding: 10px 20px;
  
  &:nth-of-type(even) {
    background-color: #1DF4E0;
  }
  &:nth-of-type(odd) {
    background-color: #03DAC6;
  }
`;

export {
  Container,
  ChannelContainer,
  ChatContainer,
  MessageInput,
  MessageBox,
  MessageForm,
  MessageItem,
  ChannelItem,
  AddChannelButton
}