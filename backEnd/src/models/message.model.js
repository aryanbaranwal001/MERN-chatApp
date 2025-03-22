import mongoose from 'mongoose';


const messageSchema = new mongoose.Schema({
  senderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'userdata',
      required: true,
//      unique: true,
  },
  receiverId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'userdata',
    required: true,
//    unique: true,
},
  text: {
      type: String,
  },
  image: {
      type: String,
  },
},
{timestamps: true},
);


const MessageModel = mongoose.model('messagedata', messageSchema);
// mongoose wantws the collection name to be singular and first letter capital


export {MessageModel};