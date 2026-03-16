// models/Gallery.js
import mongoose from "mongoose";

const gallerySchema = new mongoose.Schema(
{
  media_url: {
    type: String,
    required: true
  },

  media_type: {
    type: String,
    enum: ["image", "video"],
    required: true
  },

  public_id: {
    type: String,
    required: true
  },

  caption: {
    type: String
  }
},
{ timestamps: true }
);

export default mongoose.model("Gallery", gallerySchema);