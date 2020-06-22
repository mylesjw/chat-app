import React from 'react';
import io from 'socket.io-client';
import Chatbox from './components/chatbox/index';
import ChatBoxContainer from "./containers/chatbox/index";

function App() {
  return (
    <div>
      <ChatBoxContainer />
    </div>
  );
}

export default App;