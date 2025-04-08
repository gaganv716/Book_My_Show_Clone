import mongoose from "mongoose";

const movieSchema = new mongoose.Schema({
  title: { type: String, required: true },
  language: { type: String, required: true },
  genre: { type: String, required: true },
  duration: { type: Number, required: true }, // Duration in minutes
  releaseDate: { type: Date, required: true },
  director: { type: String },
  cast: [{ type: String }],
  description: { type: String },
  posterUrl: { type: String },
  trailerUrl: { type: String },
  ratings: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
});

// ✅ Export as Default Export
export default mongoose.model("Movie", movieSchema);
