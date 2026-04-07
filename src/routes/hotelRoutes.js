import express from "express";
import Hotel from "../models/Hotel.js";
import auth from "../middleware/auth.js";
import upload from "../middleware/cloudinaryStorage.js";

const router = express.Router();

// GET ALL HOTEL
router.get("/", async (req, res) => {
  const hotels = await Hotel.find().sort({ createdAt: -1 });
  res.json(hotels);
});

// ADD HOTEL
router.post(
  "/",
  upload.fields([
    { name: "hotel_images", maxCount: 10 },
    { name: "hotel_video", maxCount: 5 }
  ]),
  async (req, res) => {
      try {
        const {
          hotel_title,
          hotel_location,
          hotel_country,
          hotel_description,
          hotel_details,
          hotel_amenities,
        } = req.body;
  
        const images = req.files?.["hotel_images"]?.map(file => file.path) || [];
        const videos = req.files?.["hotel_video"]?.map(file => file.path) || [];
  
        const hotel = new Hotel({
          hotel_title,
          hotel_location,
          hotel_country,
          hotel_description,
          hotel_images: images,
          hotel_video: videos,
          hotel_details: hotel_details?.split("#") || [],
          hotel_amenities: hotel_amenities?.split("#") || [],
        });
  
        await hotel.save();
  
        res.status(201).json({ message: "Hotel created successfully", hotel });
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    }
);

// UPDATE HOTEL
router.put("/:id", upload.array("hotel_images", 10), async (req, res) => {
  try {
    const images = req.files?.map(f => f.path) || [];

    const updated = await Hotel.findByIdAndUpdate(
      req.params.id,
      {
        ...req.body,
        hotel_images: images.length ? images : undefined,
      },
      { new: true }
    );

    res.json(updated);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// DELETE HOTEL
router.delete("/:id", async (req, res) => {
  try {
    const deleted = await Hotel.findByIdAndDelete(req.params.id);
    res.json({ message: "Hotel deleted", hotel: deleted });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// VIEW SINGLE HOTEL
router.get("/:id", async (req, res) => {
  try {
    const hotel = await Hotel.findById(req.params.id);

    if (!hotel) {
      return res.status(404).json({ message: "Hotel not found" });
    }

    res.json(hotel);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;