import mongoose from "mongoose";

const contentBlockSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ["text", "image"],
    required: true
  },
  value: {
    type: String,
    required: true
  }
});

const blogSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: [contentBlockSchema],
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("Blog", blogSchema);