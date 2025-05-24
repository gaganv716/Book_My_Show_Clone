import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom"; // Import useNavigate
import "./MovieDetails.css";
import Footer from "../components/Footer";
import DashboardNav from "../pages/DashboardNav";

const API_KEY = "362dc1a026944ec0f801be34ae6fff8d";

const MovieDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [cast, setCast] = useState([]);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const res = await fetch(
          `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&language=en-IN`
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

  const posterUrl = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;

  const handleBookTicketsClick = () => {
    navigate(`/theaters/${id}`, {
  state: {
    posterUrl,
    title: movie.title, // ✅ Pass the title here
  },
});
 // Pass poster URL
  };

  return (
    <>
    <DashboardNav />
      {/* ... [Existing Code for Header and Navbars] */}
      <div className="movie-details-container">
        <div className="movie-details-card">
          <img
            src={posterUrl}
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
              <span className="movie-details-vote-count">
                ({movie.vote_count} votes)
              </span>
            </div>
            {/* Pass Poster URL */}
            <button
              className="movie-details-book-button"
              onClick={handleBookTicketsClick}
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
      <Footer />
    </>
  );
};

export default MovieDetails;
