import mongoose from "mongoose";

const ResetTokenSchema = new mongoose.Schema({
  email: { type: String, required: true },
  token: { type: String, required: true },
  expiresAt: { type: Number, required: true },
}, { timestamps: true });

export default mongoose.models.ResetToken || mongoose.model("ResetToken", ResetTokenSchema);
