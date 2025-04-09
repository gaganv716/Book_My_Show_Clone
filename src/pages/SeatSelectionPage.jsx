import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import "./seatSelection.css";

const SeatSelectionPage = () => {
  const { state } = useLocation();
  const selectedTheatre = state?.theatre || "Unknown Theatre";
  const selectedShowtime = state?.showtime || "Unknown Showtime";
  const selectedDate = state?.selectedDate || "Unknown Date";

  const [selectedSeats, setSelectedSeats] = useState([]);

  const seatingCategories = [
    {
      name: "VIP",
      price: 400,
      rows: ["A", "B"],
    },
    {
      name: "PREMIUM",
      price: 220,
      rows: ["C", "D"],
    },
    {
      name: "EXECUTIVE",
      price: 200,
      rows: ["E", "F"],
    },
    {
      name: "NORMAL",
      price: 180,
      rows: ["G", "H", "I", "J"],
    },
  ];

  const columns = 20; // 👈 Now 20 seats per row

  const handleSeatClick = (seat) => {
    if (selectedSeats.includes(seat)) {
      setSelectedSeats(selectedSeats.filter((s) => s !== seat));
    } else {
      setSelectedSeats([...selectedSeats, seat]);
    }
  };

  const isSold = (seat) => ["B4", "D5", "G7"].includes(seat); // Example sold seats

  return (
    <div className="seat-selection-page">
      <div className="seat-selection-header">
        <h2>{selectedTheatre}</h2>
        <p>
          <strong>{selectedDate}</strong> | <strong>{selectedShowtime}</strong>
        </p>
        <p>
          Selected Seats: <strong>{selectedSeats.join(", ") || "None"}</strong>
        </p>
      </div>

      <div className="screen">SCREEN THIS WAY</div>

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
                    {[...Array(columns)].map((_, colIdx) => {
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
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="legend">
        <span className="legend-box available"></span> Available
        <span className="legend-box selected"></span> Selected
        <span className="legend-box sold"></span> Sold
      </div>

      <button
        className="seat-selection-button"
        disabled={selectedSeats.length === 0}
      >
        Proceed to Payment ({selectedSeats.length} Seats Selected)
      </button>
    </div>
  );
};

export default SeatSelectionPage;
