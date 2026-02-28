import mongoose from "mongoose";

const luxurySafariSchema = new mongoose.Schema(
  {
    safari_title: { type: String, required: true },
    safari_travel_locations: [String],
    safari_country: [String],
    safari_overview: String,
    safari_video: [String],
    safari_images: [String],
    // safari_main_image: [String],
    safari_itinerary: [String],
    safari_inclusions: [String],
    safari_exclusions: [String],
    safari_pricing: String,
    safari_highlights: [String],
    safari_optional_activities: [String],
  },
  { timestamps: true }
);

export default mongoose.model("LuxurySafari", luxurySafariSchema);
