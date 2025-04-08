import React from "react";
import { Container, Navbar, Form, FormControl, Dropdown, Nav } from "react-bootstrap";
import { FaMapMarkerAlt } from "react-icons/fa";
import Sidebar from "../components/Sidebar";
import CarouselComponent from "../components/CarouselComponent";
import MovieList from "../components/MovieList";
import LiveEvents from "../components/LiveEvents";
import PremieresList from "../components/PremieresList";
import ComedyList from "../components/ComedyList";
import MusicMoviesList from "../components/MusicMoviesList";
import TrendingSearches from "../components/TrendingSearches";
import Footer from "../components/Footer"; // ✅ Import Footer

const Dashboard = () => {
  return (
    <>
    <React.Fragment>
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
      <div className="flex">
        <Sidebar />
        <div className="flex-1">
          <div className="container mt-4">
            <CarouselComponent />
          </div>

          {/* Now Showing Section */}
          <div className="movielist min-h-screen bg-gray-900 text-white p-6 flex items-center justify-center">
            <div className="container mx-auto px-4 md:px-12 my-8">
              <MovieList />
            </div>
          </div>

          {/* The Best of Live Events Section */}
          <div className="bg-gray-800 text-white p-6 mt-8">
            <div className="container mx-auto px-4 md:px-12 my-8">
              <LiveEvents />
            </div>
          </div>

          {/* Premieres Section */}
          <div className="premiere-background">
            <div className="container mx-auto px-4 md:px-12 my-8">
              <PremieresList />
            </div>
          </div>

          {/* Your Laughter Capsule */}
          <div className="movielist min-h-screen bg-gray-900 text-white p-6 flex items-center justify-center">
            <div className="container mx-auto px-4 md:px-12 my-8">
              <ComedyList />
            </div>
          </div>

          {/* Your Music Studio */}
          <div className="movielist min-h-screen bg-gray-900 text-white p-6 flex items-center justify-center">
            <div className="container mx-auto px-4 md:px-12 my-8">
              <MusicMoviesList />
            </div>
          </div>

          {/* Trending */}
          <div className="movielist min-h-screen bg-gray-900 text-white p-6 flex items-center justify-center">
            <div className="container mx-auto px-4 md:px-12 my-8">
              <TrendingSearches />
            </div>
          </div>
        </div>
      </div>

      {/* ✅ Footer Section */}
      <Footer />
    </React.Fragment>
    </>
  );
};

export default Dashboard;
