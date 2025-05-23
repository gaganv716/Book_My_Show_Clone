import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./seatSelection.css";
import DashboardNav from "../pages/DashboardNav";


const SeatSelectionPage = () => {
  const { state } = useLocation(); // Retrieve state from TheaterList
  const navigate = useNavigate();

  const selectedTheatre = state?.theaterName || "Unknown Theatre"; // Ensure the correct theater name is shown
  const selectedShowtime = state?.showtime || "Unknown Showtime";
  const selectedDate = state?.selectedDate || "Unknown Date";
  const posterUrl = state?.posterUrl || ""; // Retrieve posterUrl from state

  const [selectedSeats, setSelectedSeats] = useState([]);

  const seatingCategories = [
    { name: "VIP", price: 400, rows: ["A", "B"], split: true },
    { name: "PREMIUM", price: 220, rows: ["C", "D"], split: true },
    { name: "EXECUTIVE", price: 200, rows: ["E", "F"], split: false },
    { name: "NORMAL", price: 180, rows: ["G", "H", "I", "J"], split: false },
  ];

  const columns = 20;

  const handleSeatClick = (seat) => {
    if (selectedSeats.includes(seat)) {
      setSelectedSeats(selectedSeats.filter((s) => s !== seat));
    } else {
      setSelectedSeats([...selectedSeats, seat]);
    }
  };

  const isSold = (seat) => ["B4", "D5", "G7"].includes(seat); // Example logic for sold seats

  // Calculate Total Price
  const calculateTotalPrice = () => {
    let totalPrice = 0;
    selectedSeats.forEach((seat) => {
      const category = seatingCategories.find((cat) =>
        cat.rows.includes(seat[0]) // Find the category by row
      );
      totalPrice += category ? category.price : 0;
    });
    return totalPrice;
  };

  // Handle navigation to OrdersPage
  const handleProceed = () => {
    navigate("/order", {
      state: {
        theatre: selectedTheatre,
        showtime: selectedShowtime,
        selectedDate,
        selectedSeats,
        totalPrice: calculateTotalPrice(),
        posterUrl, // Pass posterUrl to OrdersPage
      },
    });
  };

  return (
    <>
      <DashboardNav />
      <div className="seat-selection-page">
        <div className="seat-selection-header">
          <h2>{selectedTheatre}</h2> {/* Display the selected theater */}
          <p>
            <strong>{selectedDate}</strong> | <strong>{selectedShowtime}</strong>
          </p>
          <p>
            Selected Seats: <strong>{selectedSeats.join(", ") || "None"}</strong>
          </p>
        </div>

        <div className="seats-wrapper">
          {seatingCategories.map((category, index) => (
            <div key={index} className="category-block">
              <div className="category-heading">
                {category.name} - ₹{category.price}
              </div>
              <div className="seat-rows">
                {category.rows.map((row) => (
                  <div key={row} className="seat-row">
                    <div className="row-label">{row}</div>
                    <div className="row-seats">
                      {category.split ? (
                        <>
                          {[...Array(10)].map((_, colIdx) => {
                            const seatId = `${row}${colIdx + 1}`;
                            const isSeatSelected = selectedSeats.includes(seatId);
                            const sold = isSold(seatId);
                            return (
                              <div
                                key={seatId}
                                className={`seat ${sold ? "sold" : isSeatSelected ? "selected" : "available"}`}
                                onClick={() => !sold && handleSeatClick(seatId)}
                              >
                                {colIdx + 1}
                              </div>
                            );
                          })}
                          <div className="gap" />
                          {[...Array(10)].map((_, colIdx) => {
                            const seatId = `${row}${colIdx + 11}`;
                            const isSeatSelected = selectedSeats.includes(seatId);
                            const sold = isSold(seatId);
                            return (
                              <div
                                key={seatId}
                                className={`seat ${sold ? "sold" : isSeatSelected ? "selected" : "available"}`}
                                onClick={() => !sold && handleSeatClick(seatId)}
                              >
                                {colIdx + 11}
                              </div>
                            );
                          })}
                        </>
                      ) : (
                        [...Array(columns)].map((_, colIdx) => {
                          const seatId = `${row}${colIdx + 1}`;
                          const isSeatSelected = selectedSeats.includes(seatId);
                          const sold = isSold(seatId);
                          return (
                            <div
                              key={seatId}
                              className={`seat ${sold ? "sold" : isSeatSelected ? "selected" : "available"}`}
                              onClick={() => !sold && handleSeatClick(seatId)}
                            >
                              {colIdx + 1}
                            </div>
                          );
                        })
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Screen Layout */}
        <div className="screen">SCREEN THIS WAY</div>

        {/* Legends */}
        <div className="legend">
          <span className="legend-box available"></span> Available
          <span className="legend-box selected"></span> Selected
          <span className="legend-box sold"></span> Sold
        </div>

        {/* Proceed Button */}
        <button
          className="seat-selection-button"
          disabled={selectedSeats.length === 0}
          onClick={handleProceed}
        >
          Proceed to Payment ({selectedSeats.length} Seats Selected)
        </button>
      </div>
    </>
  );
};

export default SeatSelectionPage;
