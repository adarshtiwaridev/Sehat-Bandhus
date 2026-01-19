
// src/lib/imageUpload.js
import fs from "fs";
import cloudinary from "cloudinary";

cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const imageuploadcloudanary = async (file, folder, height, quality) => {
  const options = { folder };

  if (height) options.height = height;
  if (quality) options.quality = quality;

  options.resource_type = "auto";

  const buffer = fs.readFileSync(file.filepath);
  const base64Image = Buffer.from(buffer).toString("base64");

  return await cloudinary.v2.uploader.upload(
    `data:image/png;base64,${base64Image}`,
    options
  );
};

export default imageuploadcloudanary;
