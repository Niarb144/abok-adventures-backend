import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../config/cloudinary.js";

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "safaris",
    resource_type: "auto",
    allowed_formats: ["jpg", "jpeg", "png", "webp", "mp4"],
  },
});

const upload = multer({ storage });

export default upload;
