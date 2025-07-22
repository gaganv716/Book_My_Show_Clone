import React from "react";
import "./ComedyCard.css";

function ComedyCard({ movie }) {
  console.log("Movie data:", movie); // Debugging the movie object
  return (
    <div className="comedy-card">
      <img src={movie.poster} alt={movie.title} className="comedy-image" />
      <div className="comedy-details">
        <div className="comedy-rating">
          <span>⭐ {movie.rating}/10</span> {movie.votes} Votes
        </div>
        <h3>{movie.title}</h3> {/* Title Rendering */}
        <p>{movie.genre.join("/")}</p>
      </div>
    </div>
  );
}

export default ComedyCard;
