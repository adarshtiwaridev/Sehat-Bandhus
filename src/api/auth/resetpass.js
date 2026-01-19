// src/pages/api/auth/resetpassword.js
import dbConnect from "../../lib/dbConnect";
import bcrypt from "bcryptjs";
import User from "../../models/user.js";
import ResetToken from "../../models/ResetToken.js";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    const { email, token, password } = req.body;

    if (!email || !token || !password) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    await dbConnect();

    // 1. Verify reset token from DB
    const resetTokenDoc = await ResetToken.findOne({ email, token });
    if (!resetTokenDoc) {
      return res.status(400).json({ message: "Invalid token" });
    }

    if (resetTokenDoc.expiresAt < Date.now()) {
      return res.status(400).json({ message: "Token expired" });
    }

    // 2. Find user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // 3. Hash new password
    const hashedPassword = await bcrypt.hash(password, 12);

    // 4. Save new password
    user.password = hashedPassword;
    await user.save();

    // 5. Delete used token (important!)
    await ResetToken.deleteOne({ _id: resetTokenDoc._id });

    return res.status(200).json({
  success: true,
  message: "Password reset successful",
});

  } catch (err) {
    console.error("Reset Password Error:", err);
    return res.status(500).json({ message: "Server error, try again later" });
  }
}
