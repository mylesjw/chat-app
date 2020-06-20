import React from 'react';
import io from 'socket.io-client';
import Chatbox from './components/chatbox/index';

function App() {
  const socket = io.connect('http://localhost:5000');

  return (
    <div>
      <Chatbox socket={socket}/>
    </div>
  );
}

export default App;