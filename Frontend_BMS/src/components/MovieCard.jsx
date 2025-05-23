import React from "react";
import { Link } from "react-router-dom";
import "./MovieCard.css";

function MovieCard({ movie }) {
  return (
    <Link to={`/movie/${movie.id}`} className="movie-card">
      <img src={movie.poster} alt={movie.title} className="movie-image" />
      <div className="movie-details">
        <div className="movie-rating">
          <span>⭐ {movie.rating}/10</span> {movie.votes} Votes
        </div>
        <h3>{movie.title}</h3>
        <p>{movie.genre.join("/")}</p>
      </div>
    </Link>
  );
}

export default MovieCard;
