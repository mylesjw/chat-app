import mongoose from 'mongoose';

interface IMessageSchema extends mongoose.Document {
  contents: string,
  date: Date,
  userId: string,
  channelId: string
}

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

export default mongoose.model<IMessageSchema>('messages', MessageSchema)