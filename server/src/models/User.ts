import mongoose, { type RawDocTypeHint } from 'mongoose';
import bcrypt from 'bcryptjs';


const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, default: ['user', 'admin'] }
}, {
  timestamps: true,
  methods: {
    comparePassword: async function (candidatePassword: string) {
      return await bcrypt.compare(candidatePassword, this.password);
    }
  }
});

// Middleware: Hash password before saving & only if it's modified
userSchema.pre('save', async function () {
  if (this.isModified('password')) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  }
});


const User = mongoose.model('User', userSchema);
export default User;