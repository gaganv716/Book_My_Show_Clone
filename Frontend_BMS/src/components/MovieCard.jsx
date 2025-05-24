import { Link } from "react-router-dom";
import "./MovieCard.css";

function MovieCard({ movie }) {
  return (
    <Link
      to={`/movie/${movie.id}`}
      state={{ // <-- pass movie data here
        movieTitle: movie.title,
        posterUrl: movie.poster,
        rating: movie.rating,
        votes: movie.votes,
        genre: movie.genre,
        id: movie.id,
      }}
      className="movie-card"
    >
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
