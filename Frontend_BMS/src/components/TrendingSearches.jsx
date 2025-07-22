import React from "react";
import "./TrendingSearches.css";

const trendingData = [
  { title: "Kolkata Knight Riders vs Royal Challengers Bengaluru", category: "Sports" },
  { title: "Mumbai Indians - IPL 2025", category: "Sports" },
  { title: "L2: Empuraan", category: "Movies" },
  { title: "RAJASTHAN ROYALS VS ROYAL CHALLENGERS BENGALURU", category: "Sports" },
  { title: "Mumbai Indians vs Royal Challengers Bengaluru", category: "Sports" },
  { title: "Guns N' Roses: India 2025", category: "Events" },
  { title: "Rajasthan Royals vs Chennai Super Kings", category: "Sports" },
  { title: "IPL SATURDAY NIGHT", category: "Activities" }
];

const TrendingSearches = () => {
  return (
    <div className="trending-container">
      <h2>Trending Searches Right Now</h2>
      <div className="trending-grid">
        {trendingData.map((item, index) => (
          <div className="trending-card" key={index}>
            <h4>{item.title}</h4>
            <p>{item.category}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TrendingSearches;