import React, { useState } from 'react';
import './PaymentPage.css';
import { useNavigate } from 'react-router-dom';

const PaymentPage = ({ bookingDetails }) => {
  const navigate = useNavigate();
  const [status, setStatus] = useState(null);

  const handlePayment = () => {
    setStatus('success');
    // Store the booking in localStorage or a global context
    const existingOrders = JSON.parse(localStorage.getItem('orders')) || [];
    localStorage.setItem('orders', JSON.stringify([...existingOrders, bookingDetails]));

    setTimeout(() => {
      navigate('/dashboard');
    }, 3000);
  };

  return (
    <div className="payment-container">
      <h2>Payment</h2>
      <div className="booking-summary">
        <p><strong>Movie:</strong> {bookingDetails.movie}</p>
        <p><strong>Date:</strong> {bookingDetails.date}</p>
        <p><strong>Time:</strong> {bookingDetails.time}</p>
        <p><strong>Seats:</strong> {bookingDetails.seats.join(', ')}</p>
        <p><strong>Total:</strong> ₹{bookingDetails.total}</p>
      </div>
      <button onClick={handlePayment} className="pay-btn">Pay Now</button>
      {status === 'success' && (
        <div className="success-msg">
          ✅ Payment Successful! Redirecting to Dashboard...
        </div>
      )}
    </div>
  );
};

export default PaymentPage;