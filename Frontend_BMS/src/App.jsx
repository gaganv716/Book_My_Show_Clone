import React, { useState } from "react";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";  // import NavBar here
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import MovieDetails from "./components/MovieDetails";
import TheaterList from "./pages/TheaterList";
import SeatSelectionPage from "./pages/SeatSelectionPage";
import OrdersPage from "./pages/OrdersPage";
import UpiPayment from "./pages/UpiPayment";
import CreditCardPayment from "./pages/CreditCardPayment";
import NetBankingPayment from "./pages/NetBankingPayment";
import PrivateRoute from "./components/PrivateRoute";
import ProfilePage from "./pages/ProfilePage";
import Success from "./pages/Success";  // or wherever your Success.jsx is located


function App() {
  // Global login state
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <div className="App">
      {/* Pass login state and setter to Navbar */}
      <NavBar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />

      <Routes>
  {/* Public Routes */}
  <Route path="/" element={<Home />} />
  <Route path="/dashboard" element={<Dashboard isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />} />
  <Route path="/movie/:id" element={<MovieDetails isLoggedIn={isLoggedIn} />} />
  <Route path="/theaters/:movieId" element={<TheaterList />} />
  <Route path="/seat-selection" element={<SeatSelectionPage />} />
  <Route path="/order" element={<OrdersPage />} />
  <Route path="/success" element={<Success />} /> {/* ✅ Fix: Ensure success route is correct */}

  {/* Payment routes */}
  <Route path="/payment/upi" element={<UpiPayment />} />
  <Route path="/payment/creditcard" element={<CreditCardPayment />} />
  <Route path="/payment/netbanking" element={<NetBankingPayment />} />

  {/* Success page route */}
  <Route path="/success" element={<Success />} />

  <Route path="/profile" element={<ProfilePage />} />

  {/* Protected dashboard route */}
  <Route
    path="/dashboard"
    element={
      <PrivateRoute>
        <Dashboard />
      </PrivateRoute>
    }
  />
</Routes>

    </div>
  );
}

export default App;
