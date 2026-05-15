import mongoose from 'mongoose';

const historyLineSchema = new mongoose.Schema(
  {
   
    IdStyemLocation: {
      type: String,
      required: true,
    },
   cambienAnhSang: {type: Number, required: true},
    trangthaiDen: {type: Number, required: true},

  },
  {
    timestamps: true,
  }
);

export default mongoose.model('HistoryLine', historyLineSchema);