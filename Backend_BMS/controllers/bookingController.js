import Booking from "../models/Booking.js";
import Movie from "../models/Movie.js";
import sendEmail from "../utils/sendEmail.js";

/**
 * ✅ Check seat availability for a movie and time slot
 */
export const checkSeatAvailability = async (req, res) => {
  try {
    const { movieId, date, time } = req.body;

    // Check if the movie exists
    const movie = await Movie.findById(movieId);
    if (!movie) {
      return res.status(404).json({ message: "Movie not found" });
    }

    // Fetch all bookings for the given movie, date, and time
    const bookedSeats = await Booking.find({ movieId, date, time }).select("seatNumbers");

    // Extract booked seat numbers
    const reservedSeats = bookedSeats.flatMap(booking => booking.seatNumbers);

    res.status(200).json({ availableSeats: movie.totalSeats.filter(seat => !reservedSeats.includes(seat)) });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

/**
 * ✅ Book seats for a user, preventing double booking
 */
export const bookSeats = async (req, res) => {
  try {
    const { movieId, userId, seatNumbers, date, time } = req.body;

    // Validate input
    if (!movieId || !userId || !seatNumbers.length || !date || !time) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Check if the movie exists
    const movie = await Movie.findById(movieId);
    if (!movie) {
      return res.status(404).json({ message: "Movie not found" });
    }

    // Check if requested seats are already booked
    const existingBookings = await Booking.find({ movieId, date, time, seatNumbers: { $in: seatNumbers } });

    if (existingBookings.length > 0) {
      return res.status(400).json({ message: "Some seats are already booked. Please choose different seats." });
    }

    // Create a new booking
    const newBooking = new Booking({
      userId,
      movieId,
      seatNumbers,
      date,
      time,
      status: "Confirmed"
    });

    await newBooking.save();

    // Send confirmation email
    await sendEmail(userId, "Booking Confirmation", `Your seats ${seatNumbers.join(", ")} for ${movie.title} have been booked successfully!`);

    res.status(201).json({ message: "Booking successful", booking: newBooking });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

/**
 * ✅ Cancel a booking and release seats
 */
export const cancelBooking = async (req, res) => {
  try {
    const { bookingId, userId } = req.body;

    // Find the booking
    const booking = await Booking.findById(bookingId);
    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    // Ensure the user is the owner of the booking
    if (booking.userId.toString() !== userId) {
      return res.status(403).json({ message: "Unauthorized action" });
    }

    // Delete the booking
    await Booking.findByIdAndDelete(bookingId);

    // Send cancellation email
    await sendEmail(userId, "Booking Cancellation", `Your booking for seats ${booking.seatNumbers.join(", ")} has been cancelled.`);

    res.status(200).json({ message: "Booking cancelled successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
