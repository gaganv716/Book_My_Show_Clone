import React, { useState } from "react";
import { Offcanvas, Button, ListGroup } from "react-bootstrap";
import { FaBell, FaTicketAlt, FaFilm, FaCreditCard, FaGift, FaCog } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";
import LoginModal from "./LoginModal";
import "./Sidebar.css";

const Sidebar = () => {
  const [show, setShow] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const isDashboard = location.pathname === "/dashboard";
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const toggleLogin = () => setIsLoggedIn(!isLoggedIn);

  const handleLoginClick = () => {
    setShow(false);
    setTimeout(() => setShowLoginModal(true), 300);
  };

  const handleLogout = () => {
    const confirmLogout = window.confirm("Are you sure you want to logout?");
    if (confirmLogout) {
      setIsLoggedIn(false);
      navigate("/");
    }
  };

  return (
    <>
      {!show && (
        <Button
          className="menu-btn"
          onClick={handleShow}
          style={{
            backgroundColor: "#9c1c1c",
            borderColor: "#9c1c1c",
            color: "#fff",
          }}
        >
          ☰ Menu
        </Button>
      )}

      <Offcanvas show={show} onHide={handleClose} placement="end" className="sidebar">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>{isDashboard ? "Dashboard" : "Hey!"}</Offcanvas.Title>
        </Offcanvas.Header>

        <Offcanvas.Body>
  {isDashboard ? (
    <Button variant="danger" onClick={handleLogout}>
      Logout
    </Button>
  ) : (
    <>
      <ListGroup variant="flush" className="menu-items">
        <ListGroup.Item className="mb-3">
          {isLoggedIn ? (
            <Button variant="secondary" onClick={handleLogout} className="w-100">
              Logout
            </Button>
          ) : (
            <Button
              onClick={handleLoginClick}
              style={{
                backgroundColor: "#9c1c1c",
                borderColor: "#9c1c1c",
                color: "#fff",
              }}
              className="w-100"
            >
              Login / Register
            </Button>
          )}
        </ListGroup.Item>

        <ListGroup.Item>
          <FaBell className="icon" /> Notifications
        </ListGroup.Item>

        <ListGroup.Item disabled={!isLoggedIn}>
          <FaTicketAlt className="icon" /> Your Orders
        </ListGroup.Item>

        <ListGroup.Item disabled={!isLoggedIn}>
          <FaFilm className="icon" /> Stream Library
        </ListGroup.Item>

        <ListGroup.Item>
          <FaCreditCard className="icon" /> Play Credit Card
        </ListGroup.Item>

        <ListGroup.Item>
          <FaCog className="icon" /> Help & Support
        </ListGroup.Item>

        <ListGroup.Item disabled={!isLoggedIn}>
          <FaGift className="icon" /> Rewards
        </ListGroup.Item>
      </ListGroup>
    </>
  )}
</Offcanvas.Body>

      </Offcanvas>

      <LoginModal
        show={showLoginModal}
        handleClose={() => setShowLoginModal(false)}
        handleSignUp={() => console.log("Redirect to Sign Up")}
        handleForgotPassword={() => console.log("Redirect to Forgot Password")}
      />
    </>
  );
};

export default Sidebar;
