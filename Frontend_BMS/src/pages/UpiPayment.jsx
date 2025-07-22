import { useLocation, useNavigate } from "react-router-dom";
import DashboardNav from "../pages/DashboardNav";
import Footer from "../components/Footer";
import "./Payment.css";
import qrImage from "../assets/upi-qr.jpg";

const UpiPayment = () => {
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

  // Redirect if booking details are missing
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
    alert("Payment successful via UPI");
    navigate("/success", { state: { bookingDetails } }); // ✅ Fix: Correct navigation
  };

  return (
    <>
      <DashboardNav />
      <div className="payment-page">
        <h2>UPI Payment</h2>
        <p>Scan the QR code:</p>
        <img
          src={qrImage}
          alt="UPI QR Code"
          style={{ width: "200px", margin: "20px auto", display: "block" }}
        />

        <p>OR Enter your UPI ID:</p>
        <input type="text" placeholder="example@upi" />
        <button onClick={handleConfirm}>Pay Now</button>
      </div>
      <Footer />
    </>
  );
};

export default UpiPayment;
