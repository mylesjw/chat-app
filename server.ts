import express from 'express';
import bodyParser from "body-parser";
import initiateDB from "./database";
import routes from './routes'
import initSockets from "./sockets";

const app = express();
const server = require('http').createServer(app);
const port = process.env.PORT || 5000;


//Init DB Connection
initiateDB().then(() => {
  initSockets(server);
});

app.use(bodyParser.json());
app.use('/', routes);

server.listen(port, () => {
  console.log(`Server started on port: ${port}`);
});
