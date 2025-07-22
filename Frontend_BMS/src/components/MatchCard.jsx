import React from "react";
import "./MatchCard.css"; // Assuming you have styles for each match card

const MatchCard = ({ match }) => {
  return (
    <div className="match-card">
      <h3>{match.title}</h3>
      <p>Status: {match.status}</p>
      <p>Venue: {match.venue}</p>
      <p>Date: {new Date(match.date).toLocaleString()}</p>
    </div>
  );
};

export default MatchCard;
