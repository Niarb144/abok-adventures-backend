import mongoose from "mongoose";

const hotelSchema = new mongoose.Schema({
  hotel_title: { type: String, required: true },
  hotel_description: String,

  hotel_country: String,

  hotel_location:  {type: String}, 

  hotel_images: [String],

  hotel_details: [String], 

  hotel_amenities: [String], 
}, { timestamps: true });

export default mongoose.model("Hotel", hotelSchema);