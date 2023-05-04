import mongoose from '../database.js';
import bcrypt from 'bcrypt';

const UserSchema = new mongoose.Schema({
  usuario: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ['Corretor', 'Recep', 'Admin'],
    required: true
  },
  encryptedPassword: { type: String },
});

UserSchema.pre('save', async function () {
  if (this.isModified('password')) {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(this.password, salt);
    this.encryptedPassword = hash;
  }
});

const User = mongoose.model('User', UserSchema);

export default User;
