import mongoose from 'mongoose';

const User = new mongoose.Schema(
  {
    UserName: {type: String},
    Password : {type: String},
    Email: {type : String },
   
  },
  {
    timestamps: true,
  }
);


const User = mongoose.model('Usernew', User);
export default User;
