import React, { useState } from "react";
import { Navbar, Nav, Container, Form, FormControl, Dropdown } from "react-bootstrap";
import { FaMapMarkerAlt, FaUserCircle } from "react-icons/fa";
import "./NavBar.css";
import LoginModal from "./LoginModal";

const NavBar = ({ showDashboardControls = true, showProfileIcon = false, isLoggedIn = false }) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      {/* First Div - Top Section */}
      <div className="top-nav">
        <Container className="d-flex align-items-center justify-content-between">
          {/* Logo and Search Bar */}
          <div className="left-section">
            <Navbar.Brand href="/" className="logo">
              GAP<sup>^</sup>InfoTech
            </Navbar.Brand>
            <Form className="search-bar">
              <FormControl type="search" placeholder="Search movies, events..." />
            </Form>
          </div>

          {/* Right Section - Conditional Controls */}
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
                      onClick={() => setShowModal(true)}
                    >
                      Login / Register
                    </button>
                    <LoginModal show={showModal} handleClose={() => setShowModal(false)} />
                  </div>
                )}
              </>
            )}

            {/* Profile Icon for Logged-In Users */}
            {isLoggedIn && showProfileIcon && (
              <div className="profile-icon">
                <FaUserCircle size={28} />
              </div>
            )}
          </div>
        </Container>
      </div>

      {/* Second Div - Bottom Navigation */}
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
