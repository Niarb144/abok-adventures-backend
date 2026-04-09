import express from "express";
import Booking from "../models/Booking.js";

const router = express.Router();

// Create booking
router.post("/", async (req, res) => {
  try {
    const booking = new Booking(req.body);
    const saved = await booking.save();

    res.status(201).json(saved);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;