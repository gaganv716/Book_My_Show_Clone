import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import MovieDetails from "./components/MovieDetails";
import TheaterList from "./pages/TheaterList";
import SeatSelectionPage from "./pages/SeatSelectionPage";
import OrdersPage from "./pages/OrdersPage";
import UpiPayment from "./pages/UpiPayment";
import CreditCardPayment from "./pages/CreditCardPayment";
import NetBankingPayment from "./pages/NetBankingPayment";
import PrivateRoute from "./components/PrivateRoute";
import ProfilePage from "./pages/ProfilePage";

function App() {
  return (
    <div className="App">
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/movie/:id" element={<MovieDetails />} />
        <Route path="/theaters/:movieId" element={<TheaterList />} />
        <Route path="/seat-selection" element={<SeatSelectionPage />} />
        <Route path="/seat-selection" element={<SeatSelectionPage />} />
        <Route path="/order" element={<OrdersPage />} />
        
        {/* ✅ Payment Routes */}
        <Route path="/payment/upi" element={<UpiPayment />} />
        <Route path="/payment/creditcard" element={<CreditCardPayment />} />
        <Route path="/payment/netbanking" element={<NetBankingPayment />} />
        <Route path="/profile" element={<ProfilePage />} />


        {/* ✅ Protected Dashboard Route */}
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
