import mongoose from 'mongoose';

const nocationmessageSchema = new mongoose.Schema(
  {
    IDusers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
    ],

    readBy: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
    content: { type: String, required: true },
    description: { type: String, required: true },
   
  },
  {
    timestamps: true,
  }
);

const NocationMessage = mongoose.model(
  'NocationMessage',
  nocationmessageSchema
);

export default NocationMessage;