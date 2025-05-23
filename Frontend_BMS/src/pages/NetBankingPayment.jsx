import { useNavigate } from "react-router-dom";
import Navbar from "../components/NavBar";
import Footer from "../components/Footer";
import "./Payment.css";
import DashboardNav from "../pages/DashboardNav";



const NetBankingPayment = () => {
  const navigate = useNavigate();

  const handleConfirm = () => {
    alert("Payment successful via Net Banking");
    navigate("/dashboard");
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
