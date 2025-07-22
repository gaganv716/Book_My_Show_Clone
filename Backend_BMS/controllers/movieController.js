import  Movie  from "../models/Movie.js";

/**
 * @desc    Add a New Movie (Admin Only)
 * @route   POST /api/movies
 * @access  Admin
 */
export const addMovie = async (req, res) => {
  try {
    // ✅ Only Admins Can Add Movies
    if (!req.user.isAdmin) {
      return res.status(403).json({ message: "Access Denied. Admins only!" });
    }

    // ✅ Validate Input
    const { title, description, releaseDate, genre, duration, language, posterUrl } = req.body;
    if (!title || !description || !releaseDate || !genre || !duration || !language) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // ✅ Check if Movie Already Exists
    const existingMovie = await Movie.findOne({ title });
    if (existingMovie) {
      return res.status(400).json({ message: "Movie already exists" });
    }

    // ✅ Create Movie
    const newMovie = new Movie(req.body);
    await newMovie.save();

    res.status(201).json({ message: "Movie added successfully", movie: newMovie });
  } catch (error) {
    res.status(500).json({ message: "Error adding movie", error: error.message });
  }
};

/**
 * @desc    Get All Movies
 * @route   GET /api/movies
 * @access  Public
 */
export const getMovies = async (req, res) => {
  try {
    const movies = await Movie.find().lean(); // ✅ Use lean() for performance optimization
    res.status(200).json({ count: movies.length, movies });
  } catch (error) {
    res.status(500).json({ message: "Error fetching movies", error: error.message });
  }
};

/**
 * @desc    Get a Single Movie by ID
 * @route   GET /api/movies/:id
 * @access  Public
 */
export const getMovieById = async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id).lean();
    if (!movie) return res.status(404).json({ message: "Movie not found" });

    res.status(200).json(movie);
  } catch (error) {
    res.status(500).json({ message: "Error fetching movie", error: error.message });
  }
};

/**
 * @desc    Update Movie (Admin Only)
 * @route   PUT /api/movies/:id
 * @access  Admin
 */
export const updateMovie = async (req, res) => {
  try {
    // ✅ Only Admins Can Update Movies
    if (!req.user.isAdmin) {
      return res.status(403).json({ message: "Access Denied. Admins only!" });
    }

    const updatedMovie = await Movie.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedMovie) return res.status(404).json({ message: "Movie not found" });

    res.status(200).json({ message: "Movie updated successfully", movie: updatedMovie });
  } catch (error) {
    res.status(500).json({ message: "Error updating movie", error: error.message });
  }
};

/**
 * @desc    Delete Movie (Admin Only)
 * @route   DELETE /api/movies/:id
 * @access  Admin
 */
export const deleteMovie = async (req, res) => {
  try {
    // ✅ Only Admins Can Delete Movies
    if (!req.user.isAdmin) {
      return res.status(403).json({ message: "Access Denied. Admins only!" });
    }

    const deletedMovie = await Movie.findByIdAndDelete(req.params.id);
    if (!deletedMovie) return res.status(404).json({ message: "Movie not found" });

    res.status(200).json({ message: "Movie deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting movie", error: error.message });
  }
};
