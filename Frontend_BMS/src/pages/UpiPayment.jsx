import { useNavigate } from "react-router-dom";
import Navbar from "../components/NavBar";
import Footer from "../components/Footer";
import "./Payment.css";
import DashboardNav from "../pages/DashboardNav";

// import qr image
import qrImage from "../assets/upi-qr.jpg";


const UpiPayment = () => {
  const navigate = useNavigate();

  const handleConfirm = () => {
    alert("Payment successful via UPI");
    navigate("/dashboard");
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
