import mongoose from 'mongoose';

const userChema = new mongoose.Schema({
  userName: {
    type: String,
    required: true
  },
  email: {
    type: String
  },
  password: {
    type: String,
    required: true
  }
});

const UserModel = mongoose.model('User', userChema);

export default UserModel;
