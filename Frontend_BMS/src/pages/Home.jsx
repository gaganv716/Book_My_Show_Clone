import React, { useState } from "react";
import NavBar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import CarouselComponent from "../components/CarouselComponent";
import MovieList from "../components/MovieList";
import LiveEvents from "../components/LiveEvents";
import PremieresList from "../components/PremieresList";
import ComedyList from "../components/ComedyList";
import MusicMoviesList from "../components/MusicMoviesList";
import TrendingSearches from "../components/TrendingSearches";
import Footer from "../components/Footer";
import LoginModal from "../components/LoginModal"; // ✅ Import LoginModal

const Home = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [showSignUp, setShowSignUp] = useState(false); // For future use if you add SignUp modal

  const handleLoginOpen = () => setShowLogin(true);
  const handleLoginClose = () => setShowLogin(false);
  const handleSignUpOpen = () => {
    setShowLogin(false);
    setShowSignUp(true);
  };

  return (
    <>
      <NavBar showDashboardControls={true} onLoginClick={handleLoginOpen} />
      <div className="flex">
        <Sidebar />
        <div className="flex-1">
          <div className="container mt-4">
            <CarouselComponent />
          </div>

          <div className="movielist min-h-screen bg-gray-900 text-white p-6 flex items-center justify-center">
            <div className="container mx-auto px-4 md:px-12 my-8">
              <MovieList />
            </div>
          </div>

          <div className="bg-gray-800 text-white p-6 mt-8">
            <div className="container mx-auto px-4 md:px-12 my-8">
              <LiveEvents />
            </div>
          </div>

          <div className="premiere-background">
            <div className="container mx-auto px-4 md:px-12 my-8">
              <PremieresList />
            </div>
          </div>

          <div className="movielist min-h-screen bg-gray-900 text-white p-6 flex items-center justify-center">
            <div className="container mx-auto px-4 md:px-12 my-8">
              <ComedyList />
            </div>
          </div>

          <div className="movielist min-h-screen bg-gray-900 text-white p-6 flex items-center justify-center">
            <div className="container mx-auto px-4 md:px-12 my-8">
              <MusicMoviesList />
            </div>
          </div>

          <div className="movielist min-h-screen bg-gray-900 text-white p-6 flex items-center justify-center">
            <div className="container mx-auto px-4 md:px-12 my-8">
              <TrendingSearches />
            </div>
          </div>
        </div>
      </div>

      {/* ✅ Footer Section */}
      <Footer />

      {/* ✅ Login Modal */}
      <LoginModal
        show={showLogin}
        handleClose={handleLoginClose}
        handleSignUp={handleSignUpOpen}
      />
    </>
  );
};

export default Home;

