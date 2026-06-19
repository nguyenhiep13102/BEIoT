import mongoose from 'mongoose';

const historyLineSchema = new mongoose.Schema(
  {
    IdStyemLocation: {
      type: String,
      required: true,
    },
    cambienAnhSang: { type: Number, required: true },
    trangthaiDen: { type: Number, required: true },
  },
  {
    timestamps: true,
  }
);


const HistoryLine = mongoose.models.HistoryLine || mongoose.model('HistoryLine', historyLineSchema);

export default HistoryLine;