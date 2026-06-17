import mongoose from 'mongoose';

const SensorData = new mongoose.Schema(
  {
  
    SensorName: {type: String},
    SensorValue : {type: Number},
    
    
  },
  {
    timestamps: true,
  }
);

// Tạo và xuất mô hình người dùng
const SensorData = mongoose.model('SensorDatanew', SensorData);
export default SensorData;
