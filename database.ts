import mongoose from 'mongoose';

export default function initiateDB() {
  return createConnection()
}

function createConnection() {
  return (
    mongoose.connect('mongodb://127.0.0.1:27017/chatapp', {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
  );
}