import mongoose from 'mongoose';

const MessageSchema = new mongoose.Schema({
  contents: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now()
  },
  userId: {
    type: String,
    required: true
  },
  channelId: {
    type: String,
    required: true
  }
});

export default mongoose.model('messages', MessageSchema)