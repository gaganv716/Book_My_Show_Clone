import React, { useState } from "react";
import { Navbar, Nav, Container, Form, FormControl, Button, Dropdown } from "react-bootstrap";
import { FaUser, FaMapMarkerAlt, FaBars } from "react-icons/fa";
import "./NavBar.css";
import LoginModal from "./LoginModal";
import SignUpModal from "./SignUpModal";

const NavBar = () => {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSignUpModal, setShowSignUpModal] = useState(false);

  // Handlers for switching between modals with delay to ensure smooth transitions
  const handleOpenLogin = () => {
    setShowSignUpModal(false);
    setTimeout(() => {
      setShowLoginModal(true);
    }, 300); // Small delay to allow previous modal to unmount
  };

  const handleOpenSignUp = () => {
    setShowLoginModal(false);
    setTimeout(() => {
      setShowSignUpModal(true);
    }, 300);
  };

  const handleCloseModals = () => {
    setShowLoginModal(false);
    setShowSignUpModal(false);
  };

  return (
    <>
      {/* Top Nav */}
      <div className="top-nav">
        <Container className="d-flex align-items-center justify-content-between">
          <div className="left-section">
            <Navbar.Brand href="/" className="logo">
              GAP<sup>^</sup>InfoTech
            </Navbar.Brand>
            <Form className="search-bar">
              <FormControl type="search" placeholder="Search movies, events..." />
            </Form>
          </div>

          <div className="right-section">
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

            <div className="app-container">
              <Button variant="danger" onClick={handleOpenLogin}>
                Login / Register
              </Button>

              <LoginModal
                show={showLoginModal}
                handleClose={handleCloseModals}
                handleSignUp={handleOpenSignUp}
              />

              <SignUpModal
                show={showSignUpModal}
                handleClose={handleCloseModals}
                handleLogin={handleOpenLogin}
              />
            </div>
          </div>
        </Container>
      </div>

      {/* Bottom Nav */}
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
    </>
  );
};

export default NavBar;
