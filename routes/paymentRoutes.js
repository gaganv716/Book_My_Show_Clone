import express from "express";
import { createPayment, checkPaymentStatus } from "../controllers/paymentController.js";

const router = express.Router();

// Create a new payment
router.post("/pay", createPayment);

// Check payment status
router.get("/status/:transactionId", checkPaymentStatus);

export default router;
