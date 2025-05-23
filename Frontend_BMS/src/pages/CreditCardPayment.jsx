import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "./Payment.css";

const CreditCardPayment = () => {
  const navigate = useNavigate();

  const handleConfirm = () => {
    alert("Payment successful via Credit Card");
    navigate("/dashboard");
  };

  return (
    <>
      <Navbar />
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
