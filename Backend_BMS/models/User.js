import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String },
  password: { type: String, required: true },
  profilePic: { type: String },

  dob: { type: String }, // Format: "YYYY-MM-DD"
  address: { type: String },
  gender: { type: String, enum: ["Male", "Female", "Other"] },

  isAdmin: { type: Boolean, default: false },

  createdAt: { type: Date, default: Date.now },
}, {
  timestamps: true
});

// ✅ Hash password before saving
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// ✅ Compare password method
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model("User", userSchema);
export default User;
