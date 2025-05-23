import express from "express";
import { protect, isAdmin } from "../middlewares/authMiddleware.js";
import { addMovie, getMovies, getMovieById, updateMovie, deleteMovie } from "../controllers/movieController.js";

const router = express.Router();

// ✅ Public Routes
router.get("/", getMovies); // Get all movies
router.get("/:id", getMovieById); // Get movie by ID

// ✅ Admin Routes (Protected)
router.post("/add", protect, isAdmin, addMovie); // Add a new movie
router.put("/update/:id", protect, isAdmin, updateMovie); // Update a movie
router.delete("/delete/:id", protect, isAdmin, deleteMovie); // Delete a movie

export default router;
