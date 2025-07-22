import express from "express";
import { checkSeatAvailability, bookSeats, cancelBooking } from "../controllers/bookingController.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/check-seats", protect, checkSeatAvailability);
router.post("/book", protect, bookSeats);
router.delete("/cancel/:bookingId", protect, cancelBooking);

export default router;
