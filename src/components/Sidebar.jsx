import React, { useState } from "react";
import { Offcanvas, Button, ListGroup } from "react-bootstrap";
import { FaBell, FaTicketAlt, FaFilm, FaCreditCard, FaGift, FaCog } from "react-icons/fa";
import "./Sidebar.css";

const Sidebar = () => {
  const [show, setShow] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const toggleLogin = () => setIsLoggedIn(!isLoggedIn);

  return (
    <>
      {/* ✅ Hide the button once clicked */}
      {!show && (
        <Button
          className="menu-btn"
          onClick={handleShow}
          style={{
            backgroundColor: "#9c1c1c", // ✅ Brick red color
            borderColor: "#9c1c1c",
            color: "#fff", // White text color for contrast
          }}
        >
          ☰ Menu
        </Button>
      )}

      <Offcanvas show={show} onHide={handleClose} placement="end" className="sidebar">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Hey!</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <div className="login-section">
            {isLoggedIn ? (
              <Button variant="secondary" onClick={toggleLogin}>
                Logout
              </Button>
            ) : (
              <Button
  onClick={toggleLogin}
  style={{
    backgroundColor: "#9c1c1c", // ✅ Brick red color
    borderColor: "#9c1c1c",
    color: "#fff", // ✅ White text color for better contrast
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
    </>
  );
};

export default Sidebar;
