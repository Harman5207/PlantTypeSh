import React from "react";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  const gridButtons = [
    { label: "Plants", route: "/plants" },
    { label: "Socials", route: "/social" },
    { label: "Leaderboard", route: "/leaderboard" },
    { label: "Seasonal Challenge", route: "/challenge" },
  ];

  const buttonStyle = {
    backgroundColor: "#5c7249",
    color: "#f5f5d4",
    border: "none",
    padding: "1rem 2rem",
    fontSize: "1.1rem",
    borderRadius: "12px",
    cursor: "pointer",
    boxShadow: "0 4px 8px rgba(92, 114, 73, 0.4)",
    transition: "background-color 0.3s ease, box-shadow 0.3s ease",
    margin: "0.5rem",
    width: "220px",
  };

  const handleMouseEnter = (e) => {
    e.currentTarget.style.backgroundColor = "#486135";
    e.currentTarget.style.boxShadow = "0 6px 12px rgba(72, 97, 53, 0.6)";
  };

  const handleMouseLeave = (e) => {
    e.currentTarget.style.backgroundColor = "#5c7249";
    e.currentTarget.style.boxShadow = "0 4px 8px rgba(92, 114, 73, 0.4)";
  };

  return (
    <div
      style={{
        backgroundColor: "#f5f5d4",
        minHeight: "100vh", // changed from height to minHeight
        width: "100vw",     // added this line
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        padding: "2rem",
        position: "relative",
        boxSizing: "border-box", // ensures padding doesn't break layout
      }}
    >
      <h1
        style={{
          color: "#5c7249",
          fontSize: "3rem",
          marginBottom: "1rem",
          textShadow: "1px 1px 2px rgba(0,0,0,0.1)",
          textAlign: "center",
        }}
      >
        plants type shi 🌱
      </h1>
      <p
        style={{
          color: "#486135",
          fontSize: "1.25rem",
          maxWidth: "400px",
          marginBottom: "2.5rem",
          fontWeight: "500",
          textAlign: "center",
        }}
      >
        bunty plants plants
      </p>

      {/* Grid container for 4 buttons */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "1rem",
          justifyItems: "center",
        }}
      >
        {gridButtons.map((btn) => (
          <button
            key={btn.route}
            onClick={() => navigate(btn.route)}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            style={buttonStyle}
          >
            {btn.label}
          </button>
        ))}
      </div>

      {/* Bottom-right User Profile button */}
      <button
        onClick={() => navigate("/profile")}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{
          ...buttonStyle,
          position: "absolute",
          bottom: "4rem",
          right: "2rem",
        }}
      >
        Profile
      </button>
    </div>
  );
}
