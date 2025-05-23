import React, { useState } from "react";
import { Container, Navbar, Nav, Form, FormControl, Dropdown } from "react-bootstrap";
import { FaMapMarkerAlt, FaUserCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom"; // ✅ Import useNavigate

import Sidebar from "../components/Sidebar";
import CarouselComponent from "../components/CarouselComponent";
import MovieList from "../components/MovieList";
import LiveEvents from "../components/LiveEvents";
import PremieresList from "../components/PremieresList";
import ComedyList from "../components/ComedyList";
import MusicMoviesList from "../components/MusicMoviesList";
import TrendingSearches from "../components/TrendingSearches";
import Footer from "../components/Footer";

const Dashboard = () => {
  const [isLoggedIn] = useState(true);
  const navigate = useNavigate(); // ✅ Initialize navigate

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

          {/* Right Section */}
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
                <FaUserCircle
                  className="text-2xl cursor-pointer"
                  onClick={() => navigate("/profile")} // ✅ Navigate to profile
                />
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

      {/* Main Layout */}
      <div className="flex">
        <Sidebar />
        <div className="flex-1">
          <div className="container mt-4">
            <CarouselComponent />
          </div>

          {/* Sections */}
          <div className="movielist min-h-screen bg-gray-900 text-white p-6 flex items-center justify-center">
            <div className="container mx-auto px-4 md:px-12 my-8">
              <MovieList />
            </div>
          </div>

          <div className="bg-gray-800 text-white p-6 mt-8">
            <div className="container mx-auto px-4 md:px-12 my-8">
              <LiveEvents />
            </div>
          </div>

          <div className="premiere-background">
            <div className="container mx-auto px-4 md:px-12 my-8">
              <PremieresList />
            </div>
          </div>

          <div className="movielist min-h-screen bg-gray-900 text-white p-6 flex items-center justify-center">
            <div className="container mx-auto px-4 md:px-12 my-8">
              <ComedyList />
            </div>
          </div>

          <div className="movielist min-h-screen bg-gray-900 text-white p-6 flex items-center justify-center">
            <div className="container mx-auto px-4 md:px-12 my-8">
              <MusicMoviesList />
            </div>
          </div>

          <div className="movielist min-h-screen bg-gray-900 text-white p-6 flex items-center justify-center">
            <div className="container mx-auto px-4 md:px-12 my-8">
              <TrendingSearches />
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Dashboard;
