import React, { useEffect, useState, useRef } from "react";
import PremiereCard from "./PremiereCard"; // ✅ Use PremiereCard here
import PlayIcon from "./PlayIcon"; // Import the play icon
import "./MovieList.css";

const API_KEY = "362dc1a026944ec0f801be34ae6fff8d";
const API_URL = `https://api.themoviedb.org/3/movie/upcoming?api_key=${API_KEY}&language=hi-IN&region=IN&page=1`;

const DEFAULT_POSTER = "/images/fallback-poster.png"; // ✅ Add a fallback poster path

const PremieresList = () => {
  const [movies, setMovies] = useState([]);
  const scrollRef = useRef(null);

  useEffect(() => {
    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => {
        if (data.results) {
          const formattedMovies = data.results
            .filter((movie) => movie.poster_path) // ✅ Remove missing posters
            .map((movie) => ({
              id: movie.id,
              title: movie.title,
              poster: movie.poster_path
                ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                : DEFAULT_POSTER, // ✅ Use fallback if missing
              genre: movie.genre_ids.map((id) => id.toString()), // ✅ Convert genre_ids to strings
            }));
          setMovies(formattedMovies);
        }
      })
      .catch((err) => console.error("Error fetching upcoming movies:", err));
  }, []);

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -300, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 300, behavior: "smooth" });
    }
  };

  return (
    <div style={{ backgroundColor: "#1b1b32" }}> {/* Full-width background */}
      <div className="movie-list premiere-section container mx-auto px-4 md:px-12 my-8">
        {/* ✅ Add Header with Play Icon */}
        <div className="premiere-header">
          <div className="premiere-icon">
            <PlayIcon />
          </div>
          <div className="premiere-text">
            <h2>PREMIERE</h2>
            <p>Watch new movies at home, every Friday</p>
          </div>
        </div>
        
        <h2 className="premiere-heading">Premieres</h2>
        <p className="section-subtitle">Brand new releases every Friday</p>
  
        <div className="movie-scroll-container">
          <button className="scroll-btn left" onClick={scrollLeft}>‹</button>
          <div className="movie-container" ref={scrollRef}>
            {movies.map((movie) => (
              <PremiereCard key={movie.id} movie={movie} />
            ))}
          </div>
          <button className="scroll-btn right" onClick={scrollRight}>›</button>
        </div>
      </div>
    </div>
  );  
};

export default PremieresList;
