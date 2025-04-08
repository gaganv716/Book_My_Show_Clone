import React from "react";
import NavBar from "../components/NavBar";
import Sidebar from "../components/Sidebar";
import CarouselComponent from "../components/CarouselComponent";
import MovieList from "../components/MovieList";
import LiveEvents from "../components/LiveEvents";
import PremieresList from "../components/PremieresList";
import ComedyList from "../components/ComedyList";
import MusicMoviesList from "../components/MusicMoviesList";
import TrendingSearches from "../components/TrendingSearches";
import Footer from "../components/Footer"; // ✅ Import Footer

const Home = () => {
  return (
    <>
      <NavBar />
      <div className="flex">
        <Sidebar />
        <div className="flex-1">
          <div className="container mt-4">
            <CarouselComponent />
          </div>

          {/* Now Showing Section */}
          <div className="movielist min-h-screen bg-gray-900 text-white p-6 flex items-center justify-center">
            <div className="container mx-auto px-4 md:px-12 my-8">
              <MovieList />
            </div>
          </div>

          {/* The Best of Live Events Section */}
          <div className="bg-gray-800 text-white p-6 mt-8">
            <div className="container mx-auto px-4 md:px-12 my-8">
              <LiveEvents />
            </div>
          </div>

          {/* Premieres Section */}
          <div className="premiere-background">
            <div className="container mx-auto px-4 md:px-12 my-8">
              <PremieresList />
            </div>
          </div>

          {/* Your Laughter Capsule */}
          <div className="movielist min-h-screen bg-gray-900 text-white p-6 flex items-center justify-center">
            <div className="container mx-auto px-4 md:px-12 my-8">
              <ComedyList />
            </div>
          </div>

          {/* Your Music Studio */}
          <div className="movielist min-h-screen bg-gray-900 text-white p-6 flex items-center justify-center">
            <div className="container mx-auto px-4 md:px-12 my-8">
              <MusicMoviesList />
            </div>
          </div>

          {/* Trending */}
          <div className="movielist min-h-screen bg-gray-900 text-white p-6 flex items-center justify-center">
            <div className="container mx-auto px-4 md:px-12 my-8">
              <TrendingSearches />
            </div>
          </div>
        </div>
      </div>

      {/* ✅ Footer Section */}
      <Footer />
    </>
  );
};

export default Home;
