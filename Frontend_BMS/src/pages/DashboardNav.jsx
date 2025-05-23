import React, { useState } from "react";
import { Container, Navbar, Nav, Form, FormControl, Dropdown } from "react-bootstrap";
import { FaMapMarkerAlt, FaUserCircle } from "react-icons/fa";

const DashboardNav = () => {
  const [isLoggedIn] = useState(true);
  const showDashboardControls = true;
  const showProfileIcon = true;

  return (
    <>
      {/* Top Nav */}
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

            {/* Profile Icon */}
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
    </>
  );
};

export default DashboardNav;
