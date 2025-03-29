import razorpay from "../config/razorpay.js";

export const createPayment = async (req, res) => {
  const { userId, movieId, seatNumbers, amount } = req.body;

  const options = {
    amount: amount * 100,
    currency: "INR",
    receipt: `receipt_${userId}_${Date.now()}`,
  };

  razorpay.orders.create(options, (err, order) => {
    if (err) return res.status(500).json({ message: "Payment order creation failed", error: err });

    res.json({ orderId: order.id });
  });
};
