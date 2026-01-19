import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const mongoUri = process.env.MONGODB_URI || process.env.PROJECT_URL;
    if (!mongoUri) {
      throw new Error(
        "Missing MONGODB_URI. Add it to your .env.local (or set PROJECT_URL for backward compatibility)."
      );
    }

    await mongoose.connect(mongoUri);
    console.log("✅ MongoDB Connected Successfully");
  } catch (error) {
    console.error("MongoDB Connection Error:", error);
    process.exit(1);
  }
};

export default connectDB;
