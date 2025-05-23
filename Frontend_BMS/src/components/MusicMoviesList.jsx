import React, { useEffect, useState, useRef } from "react";
import MusicMovieCard from "./MusicMovieCard"; // Component to display each music movie card
import "./MusicMoviesList.css"; // Add styles for the music movies section

const API_KEY = "362dc1a026944ec0f801be34ae6fff8d"; // Replace with your TMDb API key
const API_URL = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_genres=10402&language=en-US&page=1`;

const MusicMoviesList = () => {
  const [musicMovies, setMusicMovies] = useState([]);
  const scrollRef = useRef(null);

  useEffect(() => {
    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => {
        console.log("Fetched data:", data.results); // Log full API response
        if (data.results) {
          const formattedMovies = data.results
            .filter((movie) => movie.poster_path) // Remove movies without posters
            .map((movie) => ({
              id: movie.id,
              title: movie.title || "Untitled",
              poster: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
              rating: movie.vote_average || 0,
              votes: movie.vote_count || 0,
              genre: movie.genre_ids || [],
            }));
          setMusicMovies(formattedMovies); // Set the formatted movies to state
        }
      })
      .catch((err) => console.error("Error fetching music movies:", err));
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
    <div className="music-movies-list">
      <div className="music-movies-wrapper">
        <h2 className="section-heading">Where Every Beat Tells a Story</h2>
        <div className="music-scroll-container">
          <button className="scroll-btn left" onClick={scrollLeft}>
            ‹
          </button>
          <div className="music-container" ref={scrollRef}>
            {musicMovies.map((movie) => (
              <MusicMovieCard key={movie.id} movie={movie} />
            ))}
          </div>
          <button className="scroll-btn right" onClick={scrollRight}>
            ›
          </button>
        </div>
      </div>
    </div>
  );
};

export default MusicMoviesList;
