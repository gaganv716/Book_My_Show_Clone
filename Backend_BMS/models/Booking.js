import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  movie: { type: mongoose.Schema.Types.ObjectId, ref: "Movie", required: true },
  seatNumbers: [{ type: String, required: true }],
  totalAmount: { type: Number, required: true },
  status: { type: String, enum: ["Pending", "Confirmed", "Cancelled"], default: "Pending" },
});

const Booking = mongoose.model("Booking", bookingSchema);
export default Booking;
