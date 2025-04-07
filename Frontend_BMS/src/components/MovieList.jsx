import React, { useEffect, useState, useRef } from "react";
import MovieCard from "./MovieCard";
import "./MovieList.css";
const API_KEY = "362dc1a026944ec0f801be34ae6fff8d"; // Replace with your TMDb API key
const API_URL = `https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}&language=hi-IN&region=IN&page=1`;


const MovieList = () => {
  const [movies, setMovies] = useState([]);
  const scrollRef = useRef(null);

  useEffect(() => {
    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => {
        if (data.results) {
          const formattedMovies = data.results.map((movie) => ({
            id: movie.id,
            title: movie.title,
            poster: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
            rating: movie.vote_average,
            votes: movie.vote_count,
            genre: movie.genre_ids,
            status: "running",
          }));
          setMovies(formattedMovies);
        }
      })
      .catch((err) => console.error("Error fetching movies:", err));
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
    <div className="movie-list">
        <div className="movielist-wrapper">
      <h2 className="section-heading">Now In Theaters</h2>
      <div className="movie-scroll-container">
        <button className="scroll-btn left" onClick={scrollLeft}>‹</button>
        <div className="movie-container" ref={scrollRef}>
          {movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
        <button className="scroll-btn right" onClick={scrollRight}>›</button>
      </div>
    </div>
    </div>
  );
};

export default MovieList;