import express from 'express';
import bodyParser from "body-parser";
import initiateDB from "./database";
import routes from './routes'
import initSockets from "./sockets";
import SocketIO from "socket.io";


const app = express();
const server = require('http').createServer(app);
const port = process.env.PORT || 5000;
let sockets;

app.use(bodyParser.json());

//Init DB Connection
initiateDB().then(() => {
  initSockets(server);
});

app.use('/', routes);


server.listen(port, () => {
  console.log(`Server started on port: ${port}`);
});
