import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    mobile: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["patient", "doctor"], required: true },
    dob: String,
    address: String,
    gender: String,
    specialization: String,
    license: String,
    experience: Number,
  },
  { timestamps: true }
);

export default mongoose.models.User || mongoose.model("User", userSchema);
