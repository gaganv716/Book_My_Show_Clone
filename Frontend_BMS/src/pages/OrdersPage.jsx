import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Navbar,
  Nav,
  Container,
  Form,
  FormControl,
  Dropdown,
} from "react-bootstrap";
import { FaMapMarkerAlt, FaUserCircle } from "react-icons/fa";
import Footer from "../components/Footer"; // Import Footer
import "./OrdersPage.css";

const OrdersPage = () => {
  const { state } = useLocation();
  const {
    theatre,
    showtime,
    selectedDate,
    selectedSeats,
    totalPrice,
    posterUrl, // Retrieve the poster URL
  } = state || {};

  const navigate = useNavigate();
  const showDashboardControls = true; // Dashboard-specific controls
  const isLoggedIn = true; // Simulated logged-in state
  const showProfileIcon = true; // Display profile icon

  const handlePayment = (method) => {
    alert(`Payment successful with ${method}`);
    navigate("/dashboard");
  };

  return (
    <>
      {/* Top Dashboard Navbar */}
      <div className="top-nav">
        <Container className="d-flex align-items-center justify-content-between">
          {/* Logo and Search Bar */}
          <div className="left-section d-flex align-items-center gap-3">
            <Navbar.Brand href="/" className="logo">
              GAP<sup>^</sup>InfoTech
            </Navbar.Brand>
            <Form className="search-bar d-flex">
              <FormControl type="search" placeholder="Search movies, events..." />
            </Form>
          </div>

          {/* Right Section - Conditional Controls */}
          <div className="right-section d-flex align-items-center gap-3">
            {showDashboardControls && (
              <Dropdown className="location-dropdown">
                <Dropdown.Toggle variant="light">
                  <FaMapMarkerAlt /> Select Location
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item href="#">Bangalore</Dropdown.Item>
                  <Dropdown.Item href="#">Mumbai</Dropdown.Item>
                  <Dropdown.Item href="#">Delhi</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            )}

            {isLoggedIn && showProfileIcon && (
              <div className="profile-icon">
                <FaUserCircle size={28} />
              </div>
            )}
          </div>
        </Container>
      </div>

      {/* Bottom Navigation */}
      <Navbar className="bottom-nav">
        <Container>
          <Nav className="mx-auto">
            <Nav.Link href="/movies">Movies</Nav.Link>
            <Nav.Link href="/stream">Stream</Nav.Link>
            <Nav.Link href="/events">Events</Nav.Link>
            <Nav.Link href="/plays">Plays</Nav.Link>
            <Nav.Link href="/sports">Sports</Nav.Link>
            <Nav.Link href="/activities">Activities</Nav.Link>
          </Nav>
        </Container>
      </Navbar>

      {/* Orders Page Content */}
      <div className="orders-page">
        <div className="order-details">
          {/* Booking Information */}
          <div className="booking-info">
            <h2>Booking Details</h2>
            <p>
              <strong>Theatre:</strong> {theatre || "N/A"}
            </p>
            <p>
              <strong>Date:</strong> {selectedDate || "N/A"}
            </p>
            <p>
              <strong>Showtime:</strong> {showtime || "N/A"}
            </p>
            <p>
              <strong>Seats:</strong> {selectedSeats?.join(", ") || "None"}
            </p>
            <p>
              <strong>Total Price:</strong> ₹{totalPrice || "0"}
            </p>

            {/* Payment Options Section */}
            <h3>Choose Payment Method</h3>
            <div className="payment-options">
              <button onClick={() => handlePayment("Net Banking")}>Net Banking</button>
              <button onClick={() => handlePayment("Credit Card")}>Credit Card</button>
              <button onClick={() => handlePayment("UPI")}>UPI</button>
            </div>
          </div>

          {/* Poster */}
          {posterUrl && (
            <div className="poster-container">
              <img src={posterUrl} alt="Movie Poster" className="movie-poster" />
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </>
  );
};

export default OrdersPage;
