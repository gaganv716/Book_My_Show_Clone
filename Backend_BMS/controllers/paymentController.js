import Payment from "../models/Payment.js";
import { v4 as uuidv4 } from "uuid"; // To generate unique transaction IDs

/**
 * ✅ Create a Mock Payment (Assume Payment is Successful/Failed)
 */
export const createPayment = async (req, res) => {
  try {
    const { userId, movieId, seatNumbers, amount } = req.body;

    if (!userId || !movieId || !seatNumbers || seatNumbers.length === 0 || !amount) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Generate a mock transaction ID
    const transactionId = uuidv4();

    // Mock payment success/failure (50% chance of success)
    const paymentSuccess = Math.random() > 0.3; // 70% success rate

    const payment = new Payment({
      userId,
      movieId,
      seatNumbers,
      amount,
      transactionId,
      status: paymentSuccess ? "Completed" : "Failed"
    });

    await payment.save();

    if (paymentSuccess) {
      return res.status(201).json({
        message: "Payment successful",
        transactionId,
        status: "Completed"
      });
    } else {
      return res.status(400).json({
        message: "Payment failed",
        transactionId,
        status: "Failed"
      });
    }
  } catch (error) {
    res.status(500).json({ message: "Payment processing failed", error: error.message });
  }
};

/**
 * ✅ Check Payment Status
 */
export const checkPaymentStatus = async (req, res) => {
  try {
    const { transactionId } = req.params;

    const payment = await Payment.findOne({ transactionId });

    if (!payment) {
      return res.status(404).json({ message: "Transaction not found" });
    }

    res.status(200).json({
      transactionId,
      status: payment.status
    });
  } catch (error) {
    res.status(500).json({ message: "Error fetching payment status", error: error.message });
  }
};
