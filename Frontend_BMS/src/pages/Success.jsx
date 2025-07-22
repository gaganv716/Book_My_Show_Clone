import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { jsPDF } from "jspdf";
import './Success.css';
import DashboardNav from "../pages/DashboardNav";

const Success = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [posterBase64, setPosterBase64] = useState(null);

  const bookingDetails = location.state?.bookingDetails;

  console.log("Received booking details in Success:", bookingDetails);

  useEffect(() => {
    if (!bookingDetails) {
      navigate('/dashboard');
    } else if (bookingDetails.posterUrl) {
      convertImageToBase64(`https://image.tmdb.org/t/p/w500${bookingDetails.posterUrl}`)
        .then(setPosterBase64)
        .catch((err) => console.error("Error converting image to base64:", err));
    }
  }, [bookingDetails, navigate]);

  if (!bookingDetails) return null;

  const convertImageToBase64 = (imageUrl) => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.crossOrigin = "Anonymous"; // Important for loading external images
      img.src = imageUrl;
      img.onload = () => {
        const canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0);
        resolve(canvas.toDataURL("image/jpeg")); // ✅ Convert TMDB poster to base64
      };
      img.onerror = (err) => reject(err);
    });
  };

  const generatePDF = () => {
    const doc = new jsPDF();

    // Add Ticket Header
    doc.setFontSize(22);
    doc.setFont("helvetica", "bold");
    doc.text("🎟️ Movie Ticket", 80, 20);

    // Embed TMDB Poster Inside PDF
    if (posterBase64) {
      doc.addImage(posterBase64, "JPEG", 15, 30, 50, 70); // ✅ Embeds poster inside PDF
    }

    // Ticket Info Box
    doc.rect(70, 30, 120, 80);

    doc.setFontSize(16);
    doc.setFont("helvetica", "normal");
    doc.text(`Movie: ${bookingDetails.movieTitle || "N/A"}`, 75, 40);
    doc.text(`Date: ${bookingDetails.selectedDate || "N/A"}`, 75, 50);
    doc.text(`Time: ${bookingDetails.showtime || "N/A"}`, 75, 60);
    doc.text(`Seats: ${bookingDetails.selectedSeats?.join(", ") || "None"}`, 75, 70);
    doc.text(`Total Paid: ₹${bookingDetails.totalPrice || "0"}`, 75, 80);

    // Thank You Message
    doc.setFontSize(12);
    doc.setFont("helvetica", "italic");
    doc.text("Thank you for booking with GAP_InfoTech!", 75, 95);

    // Save PDF
    doc.save(`ticket_${bookingDetails.movieTitle}_${bookingDetails.selectedDate}.pdf`);
  };

  return (
    <>
      <DashboardNav />
      <div className="success-container">
        <div className="checkmark">&#10004;</div>
        <h1>Payment Done!</h1>
        <p className="payment-message">
          Your payment for <strong>{bookingDetails.movieTitle || "N/A"}</strong> was successful.
        </p>

        <div className="ticket-info">
          <p><strong>Movie:</strong> {bookingDetails.movieTitle || "N/A"}</p>
          <p><strong>Date:</strong> {bookingDetails.selectedDate || "N/A"}</p>
          <p><strong>Time:</strong> {bookingDetails.showtime || "N/A"}</p>
          <p><strong>Seats:</strong> {bookingDetails.selectedSeats?.join(", ") || "None"}</p>
          <p><strong>Total Paid:</strong> ₹{bookingDetails.totalPrice || "0"}</p>
        </div>

        <button className="download-btn" onClick={generatePDF}>
          Download Ticket as PDF
        </button>
      </div>
    </>
  );
};

export default Success;
