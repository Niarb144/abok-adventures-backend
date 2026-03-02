import mongoose from "mongoose";

const tourDestinationSchema = new mongoose.Schema(
  {
    destination_title: { type: String, required: true },
    destination_country: [String],
    destination_description: String,
    destination_video: [String],
    destination_images: [String],
    destination_facts: [String],
    destination_activities: [String],
  },
  { timestamps: true }
);

export default mongoose.model("TourDestination", tourDestinationSchema);