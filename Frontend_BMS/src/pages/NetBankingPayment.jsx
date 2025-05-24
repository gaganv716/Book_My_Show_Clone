import { useLocation, useNavigate } from "react-router-dom";
import DashboardNav from "../pages/DashboardNav";
import Footer from "../components/Footer";
import "./Payment.css";

const NetBankingPayment = () => {
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
    alert("Payment successful via Net Banking");
    navigate("/success", { state: { bookingDetails } }); // ✅ Fix: Correct navigation
  };

  return (
    <>
      <DashboardNav />
      <div className="payment-page">
        <h2>Net Banking</h2>
        <p>Select your bank:</p>
        <select>
          <option>SBI</option>
          <option>HDFC</option>
          <option>ICICI</option>
          <option>Axis Bank</option>
        </select>
        <p>Username:</p>
        <input type="text" placeholder="Enter username" />
        <p>Password:</p>
        <input type="password" placeholder="Enter password" />
        <button onClick={handleConfirm}>Login and Pay</button>
      </div>
      <Footer />
    </>
  );
};

export default NetBankingPayment;
