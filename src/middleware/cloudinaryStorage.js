import multer from "multer";
import pkg from 'multer-storage-cloudinary';
const { CloudinaryStorage } = pkg;
import cloudinary from "../config/cloudinary.js";

const storage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => {
    const isVideo = file.mimetype.startsWith("video");

    return {
      folder: "safaris",
      resource_type: "auto", // ✅ handles both images & videos
      // format: isVideo ? "mp4" : "png", // ✅ safer handling
    };
  },
});

const upload = multer({
  storage,
  limits: {
    fileSize: 100 * 1024 * 1024, // ✅ prevents silent crashes (100MB)
  },
});

export default upload;