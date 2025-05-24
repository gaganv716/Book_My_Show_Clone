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
import Footer from "../components/Footer"; 
import "./OrdersPage.css";

const OrdersPage = () => {
  const { state } = useLocation();
  const {
    theatre,
    showtime,
    selectedDate,
    selectedSeats,
    totalPrice,
    posterUrl,
    movieTitle, // ✅ Ensuring movieTitle is used properly
  } = state || {};

  const navigate = useNavigate();

  const handlePayment = (method) => {
    navigate(`/payment/${method.toLowerCase().replace(" ", "")}`, {
      state: {
        theatre,
        showtime,
        selectedDate,
        selectedSeats,
        totalPrice,
        posterUrl,
        movieTitle, // ✅ Ensure movie title is passed to Payment page
        paymentMethod: method,
      },
    });
  };

  return (
    <>
      <div className="top-nav">
        <Container className="d-flex align-items-center justify-content-between">
          <Navbar.Brand href="/" className="logo">
            GAP<sup>^</sup>InfoTech
          </Navbar.Brand>
          <Form className="search-bar d-flex">
            <FormControl type="search" placeholder="Search movies, events..." />
          </Form>
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
          <div className="profile-icon">
            <FaUserCircle size={28} />
          </div>
        </Container>
      </div>

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

      <div className="orders-page">
        <div className="order-details">
          <div className="booking-info">
            <h2>Booking Details</h2>
            <p><strong>Movie:</strong> {movieTitle || "N/A"}</p>  {/* ✅ Display movie title */}
            <p><strong>Theatre:</strong> {theatre || "N/A"}</p>
            <p><strong>Date:</strong> {selectedDate || "N/A"}</p>
            <p><strong>Showtime:</strong> {showtime || "N/A"}</p>
            <p><strong>Seats:</strong> {selectedSeats?.join(", ") || "None"}</p>
            <p><strong>Total Price:</strong> ₹{totalPrice || "0"}</p>

            <h3>Choose Payment Method</h3>
            <div className="payment-options">
              <button onClick={() => handlePayment("Net Banking")}>Net Banking</button>
              <button onClick={() => handlePayment("Credit Card")}>Credit Card</button>
              <button onClick={() => handlePayment("UPI")}>UPI</button>
            </div>
          </div>

          {posterUrl && (
            <div className="poster-container">
              <img src={posterUrl} alt={movieTitle} className="movie-poster" /> {/* ✅ Updated alt */}
            </div>
          )}
        </div>
      </div>

      <Footer />
    </>
  );
};

export default OrdersPage;
