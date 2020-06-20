import express from 'express';
import SocketIO from "socket.io";
import bodyParser from "body-parser";
import initiateDB from "./database";
import routes from './routes'

const app = express();
const server = require('http').createServer(app);
const port = process.env.PORT || 5000;

app.use(bodyParser.json());

//Init DB Connection
initiateDB();

app.use('/', routes);

const io = require('socket.io')(server, {
  wsEngine: 'ws'
});

io.sockets.on('connection', (socket: SocketIO.Server) => {
  console.log('User has connected');
  socket.on('chat message', (message: String) => {
    io.emit('chat message', message);

  })
});

server.listen(port, () => {
  console.log(`Server started on port: ${port}`);
});
