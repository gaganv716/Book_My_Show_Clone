import React, { useState } from "react";
import {
  Navbar,
  Nav,
  Container,
  Form,
  FormControl,
  Dropdown,
} from "react-bootstrap";
import { FaMapMarkerAlt, FaUserCircle } from "react-icons/fa";
import LoginModal from "./LoginModal";
import SignUpModal from "./SignUpModal";
import "./NavBar.css";

const NavBar = ({
  showDashboardControls = true,
  showProfileIcon = false,
  isLoggedIn = false,
}) => {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSignupModal, setShowSignupModal] = useState(false);

  return (
    <>
      {/* First Div - Top Section */}
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
            {showDashboardControls && (
              <>
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

                {!isLoggedIn && (
                  <div className="app-container">
                    <button
                      className="btn btn-danger"
                      onClick={() => setShowLoginModal(true)}
                    >
                      Login / Register
                    </button>
                  </div>
                )}
              </>
            )}

            {isLoggedIn && showProfileIcon && (
              <div className="profile-icon">
                <FaUserCircle size={28} />
              </div>
            )}
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

      {/* ✅ Modals */}
      <LoginModal
        show={showLoginModal}
        handleClose={() => setShowLoginModal(false)}
        handleSignup={() => {
          setShowLoginModal(false);
          setShowSignupModal(true);
        }}
      />

      <SignUpModal
        show={showSignupModal}
        handleClose={() => setShowSignupModal(false)}
        handleLogin={() => {
          setShowSignupModal(false);
          setShowLoginModal(true);
        }}
      />
    </>
  );
};

export default NavBar;
