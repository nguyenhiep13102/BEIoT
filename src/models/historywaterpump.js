import mongoose from 'mongoose';

const sensorDataSchema = new mongoose.Schema(
  {
    cambienDoam_Mat_Dat: {
      type: Number,
      required: true,
    },

    trangthaiMaybom: {
      type: Boolean,
      required: true,
    },

    IdStyemLocation: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model('SensorData', sensorDataSchema);