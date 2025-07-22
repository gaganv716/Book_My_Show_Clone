import { useLocation, useNavigate } from "react-router-dom";
import DashboardNav from "../pages/DashboardNav";
import Footer from "../components/Footer";
import "./Payment.css";

const CreditCardPayment = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const {
    theatre,
    showtime,
    selectedDate,
    selectedSeats,
    totalPrice,
    posterUrl,
    paymentMethod,
    movieTitle,  // ✅ Corrected movieTitle reference
  } = location.state || {};

  if (!theatre || !showtime || !selectedDate || !selectedSeats) {
    alert("Missing booking details. Redirecting to dashboard.");
    navigate("/dashboard");
    return null;
  }

  const bookingDetails = {
    movieTitle,  // ✅ Ensure movieTitle is passed
    showtime,    // ✅ Ensure showtime is passed
    theatre,
    selectedDate,
    selectedSeats,
    totalPrice,
    posterUrl,
    paymentMethod,
  };

  const handleConfirm = () => {
    alert("Payment successful via Credit Card");
    navigate("/success", { state: { bookingDetails } }); // ✅ Fix: Correct navigation
  };

  return (
    <>
      <DashboardNav />
      <div className="payment-page">
        <h2>Credit Card Payment</h2>
        <p>Card Number:</p>
        <input type="text" placeholder="XXXX-XXXX-XXXX-XXXX" />
        <p>Expiry Date:</p>
        <input type="text" placeholder="MM/YY" />
        <p>CVV:</p>
        <input type="password" placeholder="123" />
        <button onClick={handleConfirm}>Pay Now</button>
      </div>
      <Footer />
    </>
  );
};

export default CreditCardPayment;
