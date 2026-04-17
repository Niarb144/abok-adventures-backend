import express from "express";
import Booking from "../models/Booking.js";
import { sendBookingEmail } from "../utils/sendBookingEmail.js";

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

// GET all bookings
router.get("/", async (req, res) => {
  try {
    const bookings = await Booking.find()
      .populate({
        path: "safari",
        select: "safari_title price duration", // Optional: explicitly list fields you want
      })
      .sort({ createdAt: -1 });

    res.json(bookings);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PATCH booking status
router.patch("/:id", async (req, res) => {
  try {
    const { status } = req.body;

    const booking = await Booking.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    ).populate("safari");

    res.json(booking);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE booking
router.delete("/:id", async (req, res) => {
  try {
    await Booking.findByIdAndDelete(req.params.id);
    res.json({ message: "Booking deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// SEND EMAIL NOTIFICATION
router.post("/", async (req, res) => {
  try {
    const booking = req.body;

    // Save if needed
    // await Booking.create(booking);

    // Send email via Resend
    await sendBookingEmail(booking);

    res.status(200).json({ message: "Booking successful" });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to process booking" });
  }
});

export default router;