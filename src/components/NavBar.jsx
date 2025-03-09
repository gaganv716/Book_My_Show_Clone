import React from "react";
import { Navbar, Nav, Container, Form, FormControl, Button, Dropdown } from "react-bootstrap";
import { FaUser, FaMapMarkerAlt, FaBars } from "react-icons/fa";
import "./NavBar.css";

const NavBar = () => {
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

          {/* Right Section - Location, Login, Three-line Dropdown */}
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

            <Button variant="light" className="login-btn">
              <FaUser /> Login
            </Button>

            <Dropdown className="profile-dropdown">
              <Dropdown.Toggle variant="light">
                <FaBars size={22} /> {/* Three-line icon */}
              </Dropdown.Toggle>
              <Dropdown.Menu align="end">
                <Dropdown.Item href="#">Profile</Dropdown.Item>
                <Dropdown.Item href="#">Bookings</Dropdown.Item>
                <Dropdown.Item href="#">Logout</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
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
