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
    deviceId:{ type: String,  },
    type:{ type: String,  },
    content: { type: String, required: true },
    description: { type: String, required: true },
   status: {
        type: String,
        default: "ACTIVE"
    }
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