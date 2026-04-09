import express from "express";
import dotenv from "dotenv";
dotenv.config();

import cors from "cors";
import connectDB from "./src/config/db.js";
import authRoutes from "./src/routes/authRoutes.js";
import safariRoutes from "./src/routes/Safari.js";
import luxurySafariRoutes from "./src/routes/LuxurySafari.js";
import destinationRoutes from "./src/routes/destinationRoutes.js";
import galleryRoutes from "./src/routes/galleryRoutes.js";
import hotelRoutes from "./src/routes/hotelRoutes.js";
import blogRoute from "./src/routes/blogRoute.js";
import bookingRoutes from "./src/routes/bookingRoutes.js";

connectDB();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/safaris", safariRoutes);
app.use("/api/luxury-safaris", luxurySafariRoutes);
app.use("/api/destinations", destinationRoutes);
app.use("/api/gallery", galleryRoutes);
app.use("/api/hotels", hotelRoutes);
app.use("/api/blogs", blogRoute);
app.use("/api/bookings", bookingRoutes);

app.get("/", (req, res) => {
  res.send("API running...");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
