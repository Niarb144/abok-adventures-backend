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
  upload.array("hotel_images", 10),
  async (req, res) => {
    try {
      const images = req.files || [];

      const hotel = await Hotel.create({
        hotel_title: req.body.hotel_title,
        hotel_description: req.body.hotel_description,
        hotel_location: req.body.hotel_location,

        hotel_images: images.map(file => file.path),

        hotel_details: req.body.hotel_details
          ? req.body.hotel_details.split("#")
          : [],

        hotel_amenities: req.body.hotel_amenities
          ? req.body.hotel_amenities.split("#")
          : [],
      });

      res.json({ message: "Hotel created", hotel });

    } catch (error) {
      console.error(error);
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

export default router;