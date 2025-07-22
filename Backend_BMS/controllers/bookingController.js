import Booking from "../models/Booking.js";
import Movie from "../models/Movie.js";
import sendEmail from "../utils/sendEmail.js";
import mongoose from "mongoose";


/**
 * ✅ Check seat availability for a movie and time slot
 */
export const checkSeatAvailability = async (req, res) => {
  try {
    const { movieId, date, time } = req.body;

    const movie = await Movie.findById(movieId);
    if (!movie) return res.status(404).json({ message: "Movie not found" });

    // Find the correct show
    const show = movie.shows.find(
      s => s.date.toISOString().split('T')[0] === date && s.time === time
    );

    if (!show) {
      return res.status(404).json({ message: "Show not found for the given date and time" });
    }

    // Get booked seats for the show
    const bookings = await Booking.find({ movieId, date, time }).select("seatNumbers");
    const reservedSeats = bookings.flatMap(b => b.seatNumbers);

    // Assume seat labels like A1 to A(totalSeats), unless you're using a seat map
    const totalSeatLabels = Array.from({ length: show.totalSeats }, (_, i) => `A${i + 1}`);
    const availableSeats = totalSeatLabels.filter(seat => !reservedSeats.includes(seat));

    res.status(200).json({ availableSeats });
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

    if (!movieId || !userId || !seatNumbers.length || !date || !time) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const movie = await Movie.findById(movieId);
    if (!movie) return res.status(404).json({ message: "Movie not found" });

    const show = movie.shows.find(
      s => s.date.toISOString().split('T')[0] === date && s.time === time
    );

    if (!show) {
      return res.status(404).json({ message: "Show not found for the given date and time" });
    }

    const existingBookings = await Booking.find({
      movieId,
      date,
      time,
      seatNumbers: { $in: seatNumbers },
    });

    if (existingBookings.length > 0) {
      return res.status(400).json({
        message: "Some seats are already booked. Please choose different seats.",
      });
    }

    const newBooking = new Booking({
      userId,
      movieId,
      seatNumbers,
      date,
      time,
      status: "Confirmed",
    });

    await newBooking.save();

    // Optionally update availableSeats in the show (not mandatory if you're calculating dynamically)
    show.availableSeats -= seatNumbers.length;
    await movie.save();

    await sendEmail(
      userId,
      "Booking Confirmation",
      `Your seats ${seatNumbers.join(", ")} for ${movie.title} at ${time} have been booked successfully!`
    );

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
    const bookingId = req.params.bookingId.trim();
    const userId = req.user._id; // authenticated user

    if (!mongoose.Types.ObjectId.isValid(bookingId)) {
      return res.status(400).json({ message: "Invalid booking ID" });
    }

    const booking = await Booking.findById(bookingId);
    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    // Check if user owns the booking
    console.log(booking.userId.toString())
    console.log(userId.toString())
    if (booking.userId.toString() !== userId.toString()) {
      return res.status(403).json({ message: "Unauthorized action" });
    }

    await Booking.findByIdAndDelete(bookingId);

    await sendEmail(
      userId,
      "Booking Cancellation",
      `Your booking for seats ${booking.seatNumbers.join(", ")} has been cancelled.`
    );

    res.status(200).json({ message: "Booking cancelled successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

