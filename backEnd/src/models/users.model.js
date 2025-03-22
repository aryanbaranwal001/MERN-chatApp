import mongoose from 'mongoose';


const userSchema = new mongoose.Schema({
  email: {
      type: String,
      required: true,
      unique: true,
  },
  fullName: {
      type: String,
      required: true,
  },
  password: {
      type: String,
      required: true,
      minlength: 8,
  },
  profilePicture: {
      type: String,
      default: '',
  },
},
{timestamps: true},
);


const UserModel = mongoose.model('User', userSchema);

// mongoose wantws the collection name to be singular and first letter capital


export {UserModel};