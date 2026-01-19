import dbConnect from '../../lib/dbConnect';
import User from '../../models/user.js';
import ResetToken from '../../models/ResetToken.js';
import { sendResetEmail } from '../../lib/nodemailer.js';
import crypto from "crypto";
import { toast } from 'sonner';

export default async function handler(req, res) {
  await dbConnect();

  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ message: "Email is required" });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    const token = crypto.randomBytes(32).toString("hex");

    await ResetToken.create({
      email,
      token,
      expiresAt: Date.now() + 60 * 60 * 1000, // expires in 1 hour
    });

    const resetUrl = `${process.env.BASE_URL}/resetpassword?token=${token}&email=${email}`;
    await sendResetEmail(email, resetUrl);
    res.status(200).json({ message: "Reset token sent to email" });
+
    toast.success('Password reset link sent to your email.'); 
  } catch (error) {
    console.error("Reset token error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}
