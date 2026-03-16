import express from "express";
import upload from "../middleware/cloudinaryStorage.js";
import Gallery from "../models/Gallery.js";
import cloudinary from "../config/cloudinary.js";

const router = express.Router();

// Upload media to gallery
router.post("/upload", upload.single("media"), async (req, res) => {
  try {

    const file = req.file;

    const media = new Gallery({
      media_url: file.path,
      public_id: file.filename,
      media_type: file.mimetype.startsWith("video") ? "video" : "image"
    });

    await media.save();

    res.status(201).json(media);

  } catch (err) {
    res.status(500).json({ error: err.message });
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