import React, { useState, useEffect } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import Footer from "../components/Footer"; 
import "./TheaterList.css"; 
import { Container, Form, FormControl, Navbar, Dropdown, Nav } from "react-bootstrap";
import { FaMapMarkerAlt, FaUserCircle } from "react-icons/fa";

const TheaterList = () => {
  const { movieId } = useParams();
  const { state } = useLocation();
  const navigate = useNavigate();

  const [theaters, setTheaters] = useState([]);
  const [upcomingDates, setUpcomingDates] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);

  const posterUrl = state?.posterUrl || ""; 
  const movieTitle = state?.movieTitle || "Unknown Movie"; 

  useEffect(() => {
    console.log("Received state in TheaterList:", state); // ✅ Debugging log
  }, [state]);

  useEffect(() => {
    const today = new Date();
    const generatedDates = [];
    for (let i = 0; i < 7; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      generatedDates.push({
        display: date.toDateString(),
        value: date.toISOString().split("T")[0],
      });
    }
    setUpcomingDates(generatedDates);
    setSelectedDate(generatedDates[0]?.value);
  }, []);

  const theaterDatabase = {
    "1": [
      {
        name: "Cinepolis: Nexus Shantiniketan",
        location: "Whitefield",
        showtimes: ["10:00 AM", "1:00 PM", "4:00 PM"],
        cancellable: true,
      },
      {
        name: "PVR: Phoenix Marketcity",
        location: "Mahadevapura",
        showtimes: ["11:00 AM", "2:00 PM", "6:00 PM"],
        cancellable: true,
      },
    ],
    "2": [
      {
        name: "Innovative Multiplex",
        location: "Marathahalli",
        showtimes: ["10:30 AM", "1:30 PM", "5:30 PM"],
        cancellable: false,
      },
      {
        name: "Cinepolis: Royal Meenakshi Mall",
        location: "Bannerghatta Road",
        showtimes: ["12:00 PM", "3:00 PM", "7:00 PM"],
        cancellable: false,
      },
    ],
    "3": [
      {
        name: "PVR: VR Bengaluru",
        location: "Whitefield",
        showtimes: ["9:45 AM", "12:45 PM", "3:45 PM"],
        cancellable: true,
      },
      {
        name: "PVR: Nexus Koramangala",
        location: "Koramangala",
        showtimes: ["11:15 AM", "2:15 PM", "5:15 PM"],
        cancellable: false,
      },
    ],
    "4": [
      {
        name: "Balaji Theatre",
        location: "SG Palya",
        showtimes: ["10:00 AM", "1:00 PM", "4:00 PM"],
        cancellable: true,
      },
      {
        name: "Kamakya Theatre",
        location: "Banashankari",
        showtimes: ["11:00 AM", "2:00 PM", "5:00 PM"],
        cancellable: true,
      },
    ],
    "5": [
      {
        name: "Cinepolis: ETA Namma Mall",
        location: "Binny Pete",
        showtimes: ["10:30 AM", "1:30 PM", "4:30 PM"],
        cancellable: false,
      },
      {
        name: "Cinepolis: Orion East Mall",
        location: "Maruthi Seva Nagar",
        showtimes: ["12:00 PM", "3:00 PM", "6:00 PM"],
        cancellable: false,
      },
    ],
  };

  const fallbackTheaters = Object.values(theaterDatabase).flat();

  useEffect(() => {
    setTheaters(theaterDatabase[movieId] || fallbackTheaters);
  }, [movieId]);

  const handleShowtimeClick = (theaterName, showtime) => {
    navigate(`/seat-selection`, {
      state: {
        theaterName,
        showtime,
        selectedDate,
        posterUrl,  // ✅ Pass posterUrl forward
        movieTitle, // ✅ Pass movieTitle forward
      },
    });
  };

  return (
    <>
      <div className="top-nav">
        <Container className="d-flex align-items-center justify-content-between">
          <Navbar.Brand href="/" className="logo">
            GAP<sup>^</sup>InfoTech
          </Navbar.Brand>
          <Form className="search-bar d-flex">
            <FormControl type="search" placeholder="Search movies, events..." />
          </Form>
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
          <div className="profile-icon">
            <FaUserCircle size={28} />
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

      <div className="dates-section">
        <div className="dates-container">
          {upcomingDates.map((date, index) => (
            <div key={index} className={`date-item ${date.value === selectedDate ? "selected" : ""}`} onClick={() => setSelectedDate(date.value)}>
              {date.display}
            </div>
          ))}
        </div>
      </div>

      <div className="theater-list-container">
        <h1>Theaters Showing {movieTitle}</h1> 
        {theaters.map((theater, index) => (
          <div key={index} className="theater-card">
            <h2>{theater.name}</h2>
            <p className="location">{theater.location}</p>
            <div className="showtimes">
              <h3>Showtimes:</h3>
              <ul>
                {theater.showtimes.map((time, idx) => (
                  <li key={idx} className="showtime-item" onClick={() => handleShowtimeClick(theater.name, time)}>
                    {time}
                  </li>
                ))}
              </ul>
            </div>
            <p className={`cancellable ${theater.cancellable ? "yes" : "no"}`}>
              {theater.cancellable ? "Cancellable" : "Non-Cancellable"}
            </p>
          </div>
        ))}
      </div>

      <Footer />
    </>
  );
};

export default TheaterList;
