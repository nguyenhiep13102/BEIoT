import mongoose from 'mongoose';

const systeamLocationSchema = new mongoose.Schema(
  {
   IDusers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
   namecty: { type: String, required: true },
   district: { type: String, required: true },
   address: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);


const SysteamLocation = mongoose.model('SysteamLocation', systeamLocationSchema);
export default SysteamLocation;
