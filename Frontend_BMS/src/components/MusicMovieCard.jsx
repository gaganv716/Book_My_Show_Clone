import React from "react";
import "./MusicMovieCard.css";

function MusicMovieCard({ movie }) {
  console.log("Movie data:", movie); // Debugging the movie object

  return (
    <div className="music-movie-card">
      <img src={movie.poster} alt={movie.title} className="music-image" />
      <div className="music-details">
        <div className="music-rating">
          <span>⭐ {movie.rating}/10</span> {movie.votes} Votes
        </div>
        <h3>{movie.title}</h3> {/* Title Rendering */}
        <p>{Array.isArray(movie.genre) ? movie.genre.join("/") : "Genre not available"}</p> {/* Safe fallback */}
      </div>
    </div>
  );
}

export default MusicMovieCard;
