import mongoose from 'mongoose';
import Message from "./models/Message";

export default function initiateDB() {
  createConnection()
}

function createConnection() {
  return (
    mongoose.connect('mongodb://127.0.0.1:27017/chatapp', {
      useNewUrlParser: true
    }).then(() => console.log('MongoDB Connected...'))
      .catch((err) => console.error(err))
  );
}

function initiateSockets() {
}