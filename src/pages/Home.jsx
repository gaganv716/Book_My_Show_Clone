import React from "react";
import NavBar from "../components/Navbar";
import CarouselComponent from "../components/CarouselComponent";
import MovieList from "../components/MovieList"; // ✅ Import MovieList

const Home = () => {
  return (
    <>
      <NavBar />
      <div className="container mt-4">
        <CarouselComponent />
      </div>

      <div className="min-h-screen bg-gray-900 text-white p-6">
        <h1 className="text-3xl font-bold text-center mb-6">Now Showing</h1>
        <MovieList /> {/* ✅ Use MovieList instead of fetching movies here */}
      </div>
    </>
  );
};

export default Home;
