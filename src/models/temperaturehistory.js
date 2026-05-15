import mongoose from 'mongoose';

const temperatureHistorySchema = new mongoose.Schema(
  {
   IdStyemLocation: {
      type: String,
      required: true,
    },
    cambienNhietdo: 
    {type: Number, required: true},

  },
  {
    timestamps: true,
  }
);


const TemperatureHistory = mongoose.model('TemperatureHistory', temperatureHistorySchema);
export default TemperatureHistory;
