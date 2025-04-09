import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SeatSelection from "./SeatSelection";
import Payment from "./Payment";
import Orders from "./Orders";

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/seats" element={<SeatSelection />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/dashboard" element={<Orders />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;