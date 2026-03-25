import mongoose from "mongoose";

const hotelSchema = new mongoose.Schema({
  hotel_title: { type: String, required: true },
  hotel_description: String,

  hotel_country: String,

  hotel_location:  {type: String}, // Google Maps embed URL or link

  hotel_images: [String],

  hotel_details: [String], // e.g. "Luxury Safari", "Unique Experience"

  hotel_amenities: [String], // ensuite bathrooms, pool etc
}, { timestamps: true });

export default mongoose.model("Hotel", hotelSchema);