import React, { useState } from "react";
import { Offcanvas, Button, ListGroup } from "react-bootstrap";
import { FaBell, FaTicketAlt, FaFilm, FaCreditCard, FaGift, FaCog } from "react-icons/fa";
import LoginModal from "./LoginModal";
import SignUpModal from "./SignUpModal"; // ✅ New import
import "./Sidebar.css";

const Sidebar = () => {
  const [show, setShow] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSignUpModal, setShowSignUpModal] = useState(false); // ✅ SignUp modal state

  const handleCloseSidebar = () => setShow(false);
  const handleShowSidebar = () => setShow(true);

  // ✅ Open Login Modal with smooth sidebar close
  const handleLoginClick = () => {
    setShow(false);
    setTimeout(() => setShowLoginModal(true), 300);
  };

  // ✅ Switch to SignUp from Login
  const handleSignUpClick = () => {
    setShowLoginModal(false);
    setShowSignUpModal(true);
  };

  // ✅ Close both modals
  const handleCloseModals = () => {
    setShowLoginModal(false);
    setShowSignUpModal(false);
  };

  // ✅ After successful login
  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
    handleCloseModals();
  };

  // ✅ Logout
  const handleLogout = () => {
    setIsLoggedIn(false);
    handleCloseSidebar();
  };

  return (
    <>
      {/* ✅ Show Menu button only when sidebar is hidden */}
      {!show && (
        <Button
          className="menu-btn"
          onClick={handleShowSidebar}
          style={{
            backgroundColor: "#9c1c1c",
            borderColor: "#9c1c1c",
            color: "#fff",
          }}
        >
          ☰ Menu
        </Button>
      )}

      {/* ✅ Sidebar */}
      <Offcanvas show={show} onHide={handleCloseSidebar} placement="end" className="sidebar">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Hey!</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <div className="login-section mb-3">
            {isLoggedIn ? (
              <Button variant="secondary" onClick={handleLogout}>
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
              >
                Login / Register
              </Button>
            )}
          </div>

          <ListGroup variant="flush" className="menu-items">
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
        </Offcanvas.Body>
      </Offcanvas>

      {/* ✅ Login Modal */}
      <LoginModal
        show={showLoginModal}
        handleClose={handleCloseModals}
        handleSignUp={handleSignUpClick}
        handleForgotPassword={() => console.log("Redirect to Forgot Password")}
        onLoginSuccess={handleLoginSuccess}
      />

      {/* ✅ SignUp Modal */}
      <SignUpModal
        show={showSignUpModal}
        handleClose={handleCloseModals}
        handleLogin={() => {
          setShowSignUpModal(false);
          setShowLoginModal(true);
        }}
      />
    </>
  );
};

export default Sidebar;
