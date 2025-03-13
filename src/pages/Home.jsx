import React from "react";
import { BrowserRouter as Router } from "react-router-dom"; // ✅ Import BrowserRouter
import NavBar from "../components/Navbar";
import CarouselComponent from "../components/CarouselComponent";
import MovieList from "../components/MovieList";
import LiveEvents from "../components/LiveEvents";

const Home = () => {
  return (
    <Router basename="/Book_My_Show_Clone"> {/* ✅ Set basename for GitHub Pages */}
      <>
        <NavBar />
        <div className="container mt-4">
          <CarouselComponent />
        </div>

        <div className="min-h-screen bg-gray-900 text-white p-6">
          <h1 className="text-3xl font-bold text-center mb-6">Now Showing</h1>
          <MovieList />
        </div>

        <div className="bg-gray-800 text-white p-6 mt-8">
          <h2 className="text-3xl font-bold text-center mb-6">
            The Best Of Live Events
          </h2>
          <LiveEvents />
        </div>
      </>
    </Router>
  );
};

export default Home;
