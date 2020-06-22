import mongoose from 'mongoose';

interface IChannelSchema extends mongoose.Document{
  name: string
}

const ChannelSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  }
});

export default mongoose.model<IChannelSchema>('channels', ChannelSchema);