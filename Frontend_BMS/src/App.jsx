import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home"; // Import Home page
import Dashboard from "./pages/Dashboard"; // Import Dashboard page
import MovieDetails from "./components/MovieDetails"; // Import MovieDetails component
import TheaterList from "./pages/TheaterList"; // Import TheaterList component
import SeatSelectionPage from "./pages/SeatSelectionPage"; // ✅ Import SeatSelectionPage component
import OrdersPage from "./pages/OrdersPage";

function App() {
  return (
    <div className="App">
      <Routes>
        {/* Home Route */}
        <Route path="/" element={<Home />} />
        
        {/* Dashboard Route */}
        <Route path="/dashboard" element={<Dashboard />} />
        
        {/* Movie Details Route */}
        <Route path="/movie/:id" element={<MovieDetails />} />
        
        {/* Theater List Route */}
        <Route path="/theaters/:movieId" element={<TheaterList />} />
        
        {/* Seat Selection Route */}
        <Route path="/seat-selection" element={<SeatSelectionPage />} /> {/* New Route */}

        {/*Orders Page Route */}
        <Route path="/order" element={<OrdersPage />} />
      </Routes>
    </div>
  );
}

export default App;
