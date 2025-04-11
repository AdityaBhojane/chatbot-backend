import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true, trim: true },
  email:    { type: String, required: true, unique: true },
  password: { type: String, required: true },
  chats:    [{ type: mongoose.Schema.Types.ObjectId, ref: 'Chat' }]
}, { timestamps: true });

const User = mongoose.model('User', userSchema);
export default User;
