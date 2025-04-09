import React, { useEffect, useState } from 'react';
import './OrdersPage.css';

const OrdersPage = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const storedOrders = JSON.parse(localStorage.getItem('orders')) || [];
    setOrders(storedOrders);
  }, []);

  return (
    <div className="orders-container">
      <h2>Your Bookings</h2>
      {orders.length === 0 ? (
        <p>No bookings yet.</p>
      ) : (
        orders.map((order, index) => (
          <div key={index} className="order-card">
            <h3>{order.movie}</h3>
            <p><strong>Date:</strong> {order.date}</p>
            <p><strong>Time:</strong> {order.time}</p>
            <p><strong>Seats:</strong> {order.seats.join(', ')}</p>
            <p><strong>Price:</strong> ₹{order.total}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default OrdersPage;