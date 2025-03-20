import React from "react";
import "./PremiereCard.css";

function PremiereCard({ movie }) {
  return (
    <div className="premiere-card">
      <img src={movie.poster} alt={movie.title} />
      <div className="premiere-details">
        <span className="premiere-badge">PREMIERE</span>
        <h3>{movie.title}</h3>
        <p>{movie.genre.join(" / ")}</p>
      </div>
    </div>
  );
}

export default PremiereCard;
