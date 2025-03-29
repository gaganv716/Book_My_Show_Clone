import Booking from "../models/Booking.js";

export const checkSeatAvailability = async (req, res) => {
  const { movieId, seats } = req.body;
  
  const bookedSeats = await Booking.find({ movie: movieId, status: "Confirmed" }).select("seatNumbers");
  const takenSeats = bookedSeats.flatMap((booking) => booking.seatNumbers);

  const unavailableSeats = seats.filter((seat) => takenSeats.includes(seat));

  if (unavailableSeats.length > 0) {
    return res.status(400).json({ message: "Some seats are already booked", unavailableSeats });
  }

  res.json({ message: "Seats available", availableSeats: seats });
};
