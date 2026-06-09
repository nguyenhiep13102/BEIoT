import mongoose from 'mongoose';
import dotenv from 'dotenv';
//
dotenv.config();


 const uri = process.env.MONGODB_URI; 
//const uri = 'mongodb+srv://root:123@cluster0.qg45u.mongodb.net/hiepct?retryWrites=true&w=majority&appName=Cluster0'; 
console.log('🔍 Kết nối đến:', uri);

const connectToDatabase = async () => {
  try {
    await mongoose.connect(uri, {
      connectTimeoutMS: 30000, // 30 giây
      serverSelectionTimeoutMS: 30000, // 30 giây
    });

    console.log('✅ Kết nối thành công đến MongoDB!');
     return mongoose.connection.db;
  } catch (error) {
    console.error('❌ Lỗi kết nối MongoDB:', error);
    process.exit(1);
  }
};

mongoose.connection.on('connected', () => {
  console.log('🚀 Mongoose đã kết nối!');
});

mongoose.connection.on('error', (err) => {
  console.error('❌ Lỗi kết nối Mongoose:', err);
});

mongoose.connection.on('disconnected', () => {
  console.warn('⚠️ Mongoose bị ngắt kết nối!');
});

export default connectToDatabase;
