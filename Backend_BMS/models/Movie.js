import mongoose from "mongoose";

const showSchema = new mongoose.Schema({
  date: { type: Date, required: true },
  time: { type: String, required: true }, // e.g. "07:30 PM"
  totalSeats: { type: Number, required: true },
  availableSeats: { type: Number, required: true }
});

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
  shows: [showSchema], // ⬅️ New nested schema
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("Movie", movieSchema);
