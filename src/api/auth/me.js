import connectDB from "@/lib/dbConnect";
import User from "@/models/user";
import jwt from "jsonwebtoken";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ success: false, message: "Method not allowed" });
  }

  await connectDB();

  try {
 const token = req.cookies.token;
if (!token) return res.status(401).json({ success: false, message: "Not authenticated" });

const decoded = jwt.verify(token, process.env.JWT_SECRET);
const user = await User.findById(decoded.userId).select("-password"); // exclude password


    if (!user) return res.status(404).json({ success: false, message: "User not found" });

    res.status(200).json({ success: true, user });
  } catch (err) {
    console.error("Get user error:", err);
    res.status(401).json({ success: false, message: "Invalid or expired token" });
  }
}
