import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom"; // Added useNavigate for routing
import "./MovieDetails.css";
import {
  Navbar,
  Nav,
  Container,
  Form,
  FormControl,
  Dropdown,
} from "react-bootstrap";
import { FaMapMarkerAlt, FaUserCircle } from "react-icons/fa";
import Footer from "../components/Footer"; // ✅ Import Footer component

const API_KEY = "362dc1a026944ec0f801be34ae6fff8d";

const MovieDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate(); // Initialize useNavigate for navigation
  const [movie, setMovie] = useState(null);
  const [cast, setCast] = useState([]);

  const showDashboardControls = true;
  const isLoggedIn = true;
  const showProfileIcon = true;

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const res = await fetch(
          `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&language=hi-IN`
        );
        const data = await res.json();

        if (!data.overview) {
          const fallbackRes = await fetch(
            `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&language=en-US`
          );
          const fallbackData = await fallbackRes.json();
          setMovie({ ...data, overview: fallbackData.overview });
        } else {
          setMovie(data);
        }
      } catch (error) {
        console.error("Failed to fetch movie details:", error);
      }
    };

    const fetchCast = async () => {
      try {
        const res = await fetch(
          `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${API_KEY}`
        );
        const data = await res.json();
        setCast(data.cast.slice(0, 8));
      } catch (error) {
        console.error("Failed to fetch cast:", error);
      }
    };

    fetchMovieDetails();
    fetchCast();
  }, [id]);

  if (!movie) return <div className="movie-details-loading">Loading...</div>;

  return (
    <>
      <div className="top-nav">
        <Container className="d-flex align-items-center justify-content-between">
          <div className="left-section d-flex align-items-center gap-3">
            <Navbar.Brand href="/" className="logo">
              GAP<sup>^</sup>InfoTech
            </Navbar.Brand>
            <Form className="search-bar d-flex">
              <FormControl type="search" placeholder="Search movies, events..." />
            </Form>
          </div>

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

      <div className="movie-details-container">
        <div className="movie-details-card">
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
            className="movie-details-poster"
          />

          <div className="movie-details-info">
            <h1 className="movie-details-title">{movie.title}</h1>

            <div className="movie-details-meta">
              <span>{movie.genres?.map((g) => g.name).join(", ")}</span>
              <span>•</span>
              <span>{movie.runtime} min</span>
              <span>•</span>
              <span>{movie.original_language.toUpperCase()}</span>
            </div>

            <div className="movie-details-rating">
              <span className="movie-details-star">⭐</span>
              <span>{(movie.vote_average * 10).toFixed(0)}%</span>
              <span className="movie-details-vote-count">({movie.vote_count} votes)</span>
            </div>

            {/* Book Tickets Button */}
            <button
              className="movie-details-book-button"
              onClick={() => navigate(`/theaters/${id}`)} // Redirect to TheaterList with movie ID
            >
              🎟️ Book Tickets
            </button>

            <div className="movie-details-overview">
              <h2>📖 Overview</h2>
              <p>{movie.overview || "No overview available."}</p>
            </div>
          </div>
        </div>

        {/* Cast Section */}
        <div className="movie-details-cast">
          <h2>🎭 Cast</h2>
          <div className="cast-list">
            {cast.map((actor) => (
              <div key={actor.id} className="cast-member">
                <img
                  src={
                    actor.profile_path
                      ? `https://image.tmdb.org/t/p/w185${actor.profile_path}`
                      : "https://via.placeholder.com/185x278?text=No+Image"
                  }
                  alt={actor.name}
                />
                <div className="cast-info">
                  <p className="actor-name">{actor.name}</p>
                  <p className="actor-character">as {actor.character}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ✅ Footer Integration */}
      <Footer />
    </>
  );
};

export default MovieDetails;
