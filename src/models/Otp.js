import mongoose from "mongoose";

const OtpSchema = new mongoose.Schema({
  mobile: {
    type: String,
    required: true,
  },
    email: {
    type: String,
    required: true,
  },
  otp: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 300, // auto-delete after 5 minutes
  },
});

export default mongoose.models.Otp || mongoose.model("Otp", OtpSchema);
