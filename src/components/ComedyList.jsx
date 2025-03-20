import React, { useEffect, useState, useRef } from "react";
import ComedyCard from "./ComedyCard";
import "./ComedyList.css";

const API_KEY = "362dc1a026944ec0f801be34ae6fff8d"; // Replace with your TMDb API key
const HINDI_API_URL = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_genres=35&with_original_language=hi&page=1`;
const ENGLISH_API_URL = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_genres=35&with_original_language=en&page=1`;

const ComedyList = () => {
  const [comedyMovies, setComedyMovies] = useState([]);
  const scrollRef = useRef(null);

  useEffect(() => {
    const fetchComedyMovies = async () => {
      try {
        console.log("🎯 Fetching Comedy Movies...");

        // Fetch comedy movies in Hindi
        const hindiResponse = await fetch(HINDI_API_URL).then((res) => res.json());
        const hindiMovies = hindiResponse.results.map((movie) => ({
          id: movie.id,
          title: movie.title || "Untitled",
          poster: movie.poster_path
            ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
            : "https://via.placeholder.com/180x200?text=No+Image",
          rating: movie.vote_average || 0,
          votes: movie.vote_count || 0,
          genre: movie.genre_ids || [],
        }));

        // Fetch comedy movies in English
        const englishResponse = await fetch(ENGLISH_API_URL).then((res) => res.json());
        const englishMovies = englishResponse.results.map((movie) => ({
          id: movie.id,
          title: movie.title || "Untitled",
          poster: movie.poster_path
            ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
            : "https://via.placeholder.com/180x200?text=No+Image",
          rating: movie.vote_average || 0,
          votes: movie.vote_count || 0,
          genre: movie.genre_ids || [],
        }));

        // Combine Hindi and English movies
        setComedyMovies([...hindiMovies, ...englishMovies]);
      } catch (error) {
        console.error("❌ Error fetching comedy movies:", error);
        setComedyMovies([]);
      }
    };

    fetchComedyMovies();
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
    <div className="comedy-list">
      <div className="comedylist-wrapper">
        <h2 className="section-heading">Your Laughter Capsule</h2>
        <div className="comedy-scroll-container">
          <button className="scroll-btn left" onClick={scrollLeft}>
            ‹
          </button>
          <div className="comedy-container" ref={scrollRef}>
            {comedyMovies.map((movie) => (
              <ComedyCard key={movie.id} movie={movie} />
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

export default ComedyList;
