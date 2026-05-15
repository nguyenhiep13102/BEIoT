import mongoose from 'mongoose';

const careplantSchema = new mongoose.Schema(
  {
    IDusers: [
          {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
          },
        ],
   IdStyemLocation: {type: String, required: true},
   IDmaybom: {type: String, required: true},
   loaimaybom: {type: String, required: true},
   trangthaiMaybom: {type: Number, required: true},
   tocdoMaybom: {type: Number, required: true},
   IDden: {type: String, required: true},
   loaiden: {type: String, required: true},
   trangthaiDen: {type: Number, required: true},
   cuongdoDen: {type: Number, required: true},
   cambienNhietdo: {type: Number, required: true},
   cambienDoam_Mat_Dat: {type: Number, required: true},
   cambienAnhSang: {type: Number, required: true},

  },
  {
    timestamps: true,
  }
);


const Careplant = mongoose.model('Careplant', careplantSchema);
export default Careplant;
