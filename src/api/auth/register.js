import connectDB from "@/lib/dbConnect";

import User from "@/models/user";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
 
import { serialize } from "cookie";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ message: "Method not allowed" });

  await connectDB();
  const { role, name, mobile, email, password, dob, address, gender, specialization, license, experience } = req.body;

  try {
    const existingUser = await User.findOne({ mobile });
    if (existingUser) return res.status(400).json({ message: "Mobile already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      role,
      name,
      mobile,
      email,
      password: hashedPassword,
      dob,
      address,
      gender,
      specialization,
      license,
      experience,
    });

    // --- Create JWT ---
    const token = jwt.sign({ userId: user._id, role: user.role }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    // --- Store JWT in cookies ---

res.setHeader(
  "Set-Cookie",
  serialize("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 7 * 24 * 60 * 60,
    path: "/",
  })
);





    res.status(201).json({ message: "User registered successfully", user });
  } catch (error) {
    console.error("Register error:", error);
    res.status(500).json({ message: "Server error" });
  }
}
