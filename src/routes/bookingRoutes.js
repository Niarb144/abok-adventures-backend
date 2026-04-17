import express from "express";
import Booking from "../models/Booking.js";
import { sendBookingEmail } from "../utils/sendBookingEmail.js";

const router = express.Router();

// Create booking and send email
router.post("/", async (req, res) => {
  try {
    const booking = new Booking(req.body);

    // 1. Save to DB
    const saved = await booking.save();

    // 2. Send email
    await sendBookingEmail(saved);

    res.status(201).json(saved);

  } catch (error) {
    console.error("BOOKING ERROR:", error);
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

    // ✅ SEND EMAIL ONLY WHEN APPROVED
    if (status === "confirmed") {
      await sendApprovalEmail(booking);
    }

    res.json(booking);

  } catch (err) {
    console.error("PATCH ERROR:", err);
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


export default router;