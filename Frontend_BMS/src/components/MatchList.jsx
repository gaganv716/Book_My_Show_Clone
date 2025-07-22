import React, { useState, useRef } from "react";
import MatchCard from "./MatchCard"; // Assuming you have a MatchCard component to display each match
import "./MatchList.css"; // Assuming you have styles for the match list

const MatchList = () => {
  const [matches, setMatches] = useState([
    {
      id: 1,
      title: "KKR vs RCB (IPL)",
      status: "Scheduled",
      venue: "Eden Gardens, Kolkata",
      date: "2025-03-22 19:30",
      image: "https://assets-in.bmscdn.com/nmcms/events/banner/desktop/media-desktop-kolkata-knight-rider-vs-royal-challenger-bengaluru-0-2025-3-6-t-8-33-46.jpg"
    },
    {
      id: 2,
      title: "India vs England (ODI)",
      status: "Scheduled",
      venue: "Nagpur, India",
      date: "2025-02-06 14:00",
      image: "https://i.ytimg.com/vi/HdxverRM7gA/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLDf_2V2HFoCTA7rk8rNSJUWtFBXEw"
    },
    {
      id: 3,
      title: "UEFA Champions League Final (Football)",
      status: "Scheduled",
      venue: "Munich, Germany",
      date: "2025-05-31 21:00",
      image: "https://editorial.uefa.com/resources/0295-1ceba613adfa-d5b749782855-1000/format/wide1/ucl_final_munich.jpeg?imwidth=2048"
    },
    {
      id: 4,
      title: "SRH vs RR (IPL)",
      status: "Scheduled",
      venue: "Rajiv Gandhi International Stadium, Hyderabad",
      date: "2025-03-23 15:30",
    },
    {
      id: 5,
      title: "Pakistan vs South Africa (ODI)",
      status: "Scheduled",
      venue: "National Stadium, Karachi",
      date: "2025-02-12 14:00",
    },
    {
      id: 6,
      title: "UEFA Europa League Final (Football)",
      status: "Scheduled",
      venue: "Bilbao, Spain",
      date: "2025-05-21 21:00",
    },
    {
      id: 7,
      title: "CSK vs MI (IPL)",
      status: "Scheduled",
      venue: "MA Chidambaram Stadium, Chennai",
      date: "2025-03-23 19:30",
    },
    {
      id: 8,
      title: "India vs Bangladesh (ODI)",
      status: "Scheduled",
      venue: "Dhaka, Bangladesh",
      date: "2025-08-15 14:00",
    },
    {
      id: 9,
      title: "UEFA Women’s Champions League Final (Football)",
      status: "Scheduled",
      venue: "Lisbon, Portugal",
      date: "2025-05-24 21:00",
    },
    {
      id: 10,
      title: "DC vs LSG (IPL)",
      status: "Scheduled",
      venue: "Dr. Y.S. Rajasekhara Reddy ACA-VDCA Cricket Stadium, Visakhapatnam",
      date: "2025-03-24 19:30",
    },
    {
      id: 11,
      title: "Australia vs New Zealand (ODI)",
      status: "Scheduled",
      venue: "Melbourne Cricket Ground, Australia",
      date: "2025-10-10 10:00",
    },
    {
      id: 12,
      title: "UEFA Nations League Final (Football)",
      status: "Scheduled",
      venue: "Host TBD (Italy/Germany)",
      date: "2025-06-08 20:45",
    },
  ]);

  const scrollRef = useRef(null);

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -300, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 300, behavior: "smooth" });
    }
  };

  return (
    <div className="match-list">
      <div className="matchlist-wrapper">
        <h2 className="section-heading">Game On! Find Your Next Big Match!</h2>
        <div className="match-scroll-container">
          <button className="scroll-btn left" onClick={scrollLeft}>
            ‹
          </button>
          <div className="match-container" ref={scrollRef}>
            {matches.length > 0 ? (
              matches.map((match) => (
                <MatchCard key={match.id} match={match} />
              ))
            ) : (
              <p>Loading matches...</p>
            )}
          </div>
          <button className="scroll-btn right" onClick={scrollRight}>
            ›
          </button>
        </div>
      </div>
    </div>
  );
};

export default MatchList;
