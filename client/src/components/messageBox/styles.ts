import styled from 'styled-components';

export const ChatContainer = styled.div`
  flex-basis: 80%;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
`;

export const ChatBox = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  overflow: hidden;

  
  ul {
    margin: 0;
    list-style: none;
    padding-left: 0;
    overflow: auto;
  }
`;

export const MessageInput = styled.div`
  flex-basis: 60px;
  position: relative;
  bottom: 0;
  width: 100%;
  height: 100%;
`;

export const MessageForm = styled.form`
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

export const MessageItem = styled.li`
  align-self: stretch;
  padding: 10px 20px;
  
  &:nth-of-type(even) {
    background-color: #1DF4E0;
  }
  &:nth-of-type(odd) {
    background-color: #03DAC6;
  }
`;