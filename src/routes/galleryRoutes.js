import express from "express";
import upload from "../middleware/upload.js";
import Gallery from "../models/Gallery.js";
import cloudinary from "../config/cloudinary.js";
import { uploadToCloudinary } from "../utils/uploadToCloudinary.js"; 

const router = express.Router();

// Upload media to gallery
router.post("/upload", upload.array("media", 20), async (req, res) => {
  try {
    const files = req.files;

    if (!files || files.length === 0) {
      return res.status(400).json({ message: "No files uploaded" });
    }

    // ✅ Upload each file to Cloudinary
    const uploadedResults = await Promise.all(
      files.map((file) => uploadToCloudinary(file))
    );

    // ✅ Save to DB
    const savedMedia = await Promise.all(
      uploadedResults.map((result) =>
        Gallery.create({
          media_url: result.secure_url,
          public_id: result.public_id,
          media_type: result.resource_type === "video" ? "video" : "image",
        })
      )
    );

    res.status(201).json(savedMedia);

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

// Get all media in gallery, sorted by creation date (newest first)
router.get("/", async (req, res) => {
  try {

    const media = await Gallery.find().sort({ createdAt: -1 });

    res.json(media);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete media from gallery
router.delete("/:id", async (req, res) => {
  try {

    const media = await Gallery.findById(req.params.id);

    await cloudinary.uploader.destroy(media.public_id, {
      resource_type: media.media_type === "video" ? "video" : "image"
    });

    await media.deleteOne();

    res.json({ message: "Deleted successfully" });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;