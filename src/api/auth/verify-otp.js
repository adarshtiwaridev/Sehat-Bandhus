// import connectDB from "@/lib/dbConnect";
// import User from "@/models/user";
// import jwt from "jsonwebtoken";
// import { serialize } from "cookie";

// export default async function handler(req, res) {
//   if (req.method !== 'POST') return res.status(405).json({ message: 'Method not allowed' });

//   const { sessionInfo, code, role, formData } = req.body;
//   if (!sessionInfo || !code) return res.status(400).json({ message: 'sessionInfo and code are required' });

//   const apiKey = process.env.FIREBASE_API_KEY;
//   if (!apiKey) return res.status(500).json({ message: 'FIREBASE_API_KEY not configured on server' });

//   try {
//     // Exchange sessionInfo+code for an ID token
//     const resp = await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPhoneNumber?key=${apiKey}`, {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({ sessionInfo, code }),
//     });
//     const data = await resp.json();
//     if (!resp.ok) {
//       console.error('Firebase signInWithPhoneNumber error', data);
//       return res.status(400).json({ message: 'Failed to verify code', error: data });
//     }

//     const idToken = data.idToken;
//     const phoneNumber = data.phoneNumber;

//     // Basic user provisioning: create user in MongoDB if not exists
//     await connectDB();
//     let user = await User.findOne({ mobile: phoneNumber?.replace(/^\+/, '') });

//     if (!user && formData) {
//       const bcrypt = require('bcryptjs');
//       const hashedPassword = formData.password ? await bcrypt.hash(formData.password, 10) : undefined;
//       user = await User.create({
//         role: role || 'patient',
//         name: formData.name || '',
//         mobile: phoneNumber?.replace(/^\+/, '') || (formData.mobile || ''),
//         email: formData.email || '',
//         password: hashedPassword || '',
//         dob: formData.dob || '',
//         address: formData.address || '',
//         gender: formData.gender || 'Male',
//         specialization: formData.specialization || '',
//         license: formData.license || '',
//         experience: formData.experience || '',
//       });
//     }

//     // Issue server JWT
//     const token = jwt.sign({ userId: user?._id || null, role: user?.role || role || 'patient' }, process.env.JWT_SECRET, {
//       expiresIn: '7d',
//     });

//     res.setHeader(
//       'Set-Cookie',
//       serialize('token', token, {
//         httpOnly: true,
//         secure: process.env.NODE_ENV === 'production',
//         sameSite: 'strict',
//         maxAge: 7 * 24 * 60 * 60,
//         path: '/',
//       })
//     );

//     return res.status(200).json({ message: 'OTP verified (Firebase REST).', token, user, idToken });
//   } catch (err) {
//     console.error('verify-otp error:', err);
//     return res.status(500).json({ message: 'Server error', error: err.message });
//   }
// }


// /pages/api/auth/verify-otp.js
import connectDB from "@/lib/dbConnect";
import Otp from "@/models/Otp";

export default async function handler(req, res) {
  if (req.method !== "POST")
    return res.status(405).json({ message: "Method not allowed" });

  await connectDB(); // ✅ ensure DB connection

  const { email, otp } = req.body;
  if (!email || !otp)
    return res.status(400).json({ message: "Email and OTP are required" });

  try {
    // Find the most recent OTP for this email
    const otpRecord = await Otp.findOne({ email }).sort({ createdAt: -1 });

    if (!otpRecord)
      return res.status(400).json({ message: "OTP not found or expired" });

    // Compare OTPs
    if (otpRecord.otp !== otp)
      return res.status(400).json({ message: "Invalid OTP" });

    // ✅ OTP verified successfully
    await Otp.deleteMany({ email }); // remove all OTPs for security

    return res.status(200).json({ message: "OTP verified successfully" });
  } catch (error) {
    console.error("Error verifying OTP:", error);
    return res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
}
