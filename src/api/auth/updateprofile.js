import dbConnect from "../../lib/dbConnect";
import User from "../../models/user.js";
import jwt from "jsonwebtoken";

export default async function handler(req, res) {
  if (req.method !== "PATCH") {
    return res.status(405).json({ success: false, message: "Method not allowed" });
  }

  await dbConnect();

  try {
    // ✅ Extract token from cookies or headers
    const token =
      req.cookies?.token ||
      (req.headers.authorization?.startsWith("Bearer ")
        ? req.headers.authorization.split(" ")[1]
        : null);

    if (!token) {
      return res.status(401).json({ success: false, message: "No token provided" });
    }

    // ✅ Verify token
    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
      return res.status(401).json({ success: false, message: "Invalid or expired token" });
    }

    const userId = decoded.id; // make sure login token stores { id: user._id }

    // ✅ Take fields from body (only if provided)
    const { fullName, profilePhoto, category } = req.body;
    const updateData = {};
    if (fullName) updateData.fullName = fullName;
    if (profilePhoto) updateData.profilePhoto = profilePhoto;
    if (category) updateData.category = category;

    if (Object.keys(updateData).length === 0) {
      return res.status(400).json({ success: false, message: "No fields to update" });
    }

    // ✅ Update user using _id from token
    const updatedUser = await User.findByIdAndUpdate(userId, updateData, { new: true });

    if (!updatedUser) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    return res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      user: {
        id: updatedUser._id,
        fullName: updatedUser.fullName,
        email: updatedUser.email,
        category: updatedUser.category,
        profilePhoto: updatedUser.profilePhoto,
        accountType: updatedUser.accountType,
      },
    });
  } catch (err) {
    console.error("Update error:", err);
    return res
      .status(500)
      .json({ success: false, message: "Server error", error: err.message });
  }
}
