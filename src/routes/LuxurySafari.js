import express from "express";
import LuxurySafari from "../models/LuxurySafari.js";
import auth from "../middleware/auth.js";
import upload from "../middleware/cloudinaryStorage.js";

const router = express.Router();

// GET ALL SAFARIS (Frontend)
router.get("/", async (req, res) => {
  try {
    const safaris = await LuxurySafari.find().sort({ createdAt: -1 });
    res.json(safaris);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET SINGLE SAFARI
router.get("/:id", async (req, res) => {
  try {
    const safari = await LuxurySafari.findById(req.params.id);

    if (!safari) {
      return res.status(404).json({ message: "Luxury Safari not found" });
    }

    res.json(safari);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


router.put(
  "/:id",
  auth,
  upload.array("safari_images", 10), // max 10 images
  async (req, res) => {
    try {
      const existingSafari = await LuxurySafari.findById(req.params.id);
      if (!existingSafari) {
        return res.status(404).json({ message: "Luxury Safari not found" });
      }

      // Extract uploaded image URLs
      const newImages = req.files?.map((file) => file.path) || [];

      // If user uploaded new images, replace or merge
      const updatedData = {
        ...req.body,
        safari_images:
          newImages.length > 0
            ? newImages
            : existingSafari.safari_images,
      };

      const safari = await LuxurySafari.findByIdAndUpdate(
        req.params.id,
        updatedData,
        { new: true }
      );

      res.json({ message: "Luxury Safari updated", safari });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
);
// DELETE SAFARI
router.delete("/:id", auth, async (req, res) => {
  try {
    await LuxurySafari.findByIdAndDelete(req.params.id);
    res.json({ message: "Luxury Safari deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Multiple image + video upload
router.post(
  "/create",
  auth,
  upload.fields([
    { name: "safari_images", maxCount: 10 },
    { name: "safari_video", maxCount: 5 },
  ]),
  async (req, res) => {
    try {
      const {
        safari_title,
        safari_travel_locations,
        safari_country,
        safari_overview,
        safari_itinerary,
        safari_inclusions,
        safari_exclusions,
        safari_pricing,
        safari_highlights,
        safari_optional_activities,
      } = req.body;

      const images = req.files["safari_images"]?.map(file => file.path) || [];
      const videos = req.files["safari_video"]?.map(file => file.path) || [];

      const luxurySafari = new LuxurySafari({
        safari_title,
        safari_travel_locations: safari_travel_locations?.split(",") || [],
        safari_country: safari_country?.split(",") || [],
        safari_itinerary: safari_itinerary?.split(",") || [],
        safari_inclusions: safari_inclusions?.split(",") || [],
        safari_exclusions: safari_exclusions?.split(",") || [],
        safari_highlights: safari_highlights?.split(",") || [],
        safari_optional_activities: safari_optional_activities?.split(",") || [],
        safari_overview,
        safari_pricing,
        safari_images: images,
        safari_video: videos,
        
      });

      await luxurySafari.save();

      res.status(201).json({ message: "Luxury Safari created successfully", luxurySafari });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
);

export default router;
