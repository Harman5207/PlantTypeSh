import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";  // <-- Import Link here

export default function Plants() {
  // Load plants from localStorage or start with empty array
  const [plants, setPlants] = useState(() => {
    const savedPlants = localStorage.getItem("plants");
    return savedPlants ? JSON.parse(savedPlants) : [];
  });

  const [formData, setFormData] = useState({
    name: "",
    species: "",
    image: null,
  });
  const [selectedPlantIndex, setSelectedPlantIndex] = useState(null);

  // Save plants to localStorage whenever plants state changes
  useEffect(() => {
    localStorage.setItem("plants", JSON.stringify(plants));
  }, [plants]);

  // Helper to convert file to base64 string (for image persistence)
  const fileToBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });

  const handleChange = async (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      if (files && files[0]) {
        const base64 = await fileToBase64(files[0]);
        setFormData({ ...formData, image: base64 });
      }
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.name && formData.species && formData.image) {
      setPlants([...plants, formData]);
      setFormData({ name: "", species: "", image: null });
    }
  };

  const moodFromHealth = () => {
    const moods = ["😊 Happy", "👅💦 Thirsty", "😢 Sad", "💀 Dying"];
    return moods[Math.floor(Math.random() * moods.length)];
  };

  return (
    <div
      style={{
        backgroundColor: "#f5f5d4",
        minHeight: "100vh",
        width: "100vw",
        padding: "2rem",
        fontFamily: "'Segoe UI', sans-serif",
        color: "#5c7249",
      }}
    >
      <Link
        to="/"
        style={{
          position: "fixed",
          top: "1rem",
          left: "1rem",
          padding: "0.5rem 1rem",
          backgroundColor: "#5c7249",
          color: "#f5f5d4",
          borderRadius: "8px",
          textDecoration: "none",
          fontWeight: "bold",
          zIndex: 1000,
        }}
      >
        Home
      </Link>

      <h1
        style={{
          fontSize: "2.5rem",
          marginBottom: "1.5rem",
          textAlign: "center",
        }}
      >
        🪴 My Plants
      </h1>

      <form
        onSubmit={handleSubmit}
        style={{
          backgroundColor: "#ffffff",
          padding: "4.5rem",
          borderRadius: "12px",
          boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
          maxWidth: "700px",
          margin: "0 auto 2rem",
          boxSizing: "border-box",
        }}
      >
        <h2 style={{ marginBottom: "1rem", color: "#5c7249" }}>
          Register a Plant
        </h2>

        <label style={{ display: "block", marginBottom: "0.5rem" }}>
          Name:
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            style={{
              width: "100%",
              padding: "0.5rem",
              marginTop: "0.3rem",
              marginBottom: "1rem",
              borderRadius: "8px",
              border: "1px solid #ccc",
            }}
            required
          />
        </label>

        <label style={{ display: "block", marginBottom: "0.5rem" }}>
          Species:
          <input
            type="text"
            name="species"
            value={formData.species}
            onChange={handleChange}
            style={{
              width: "100%",
              padding: "0.5rem",
              marginTop: "0.3rem",
              marginBottom: "1rem",
              borderRadius: "8px",
              border: "1px solid #ccc",
            }}
            required
          />
        </label>

        <label style={{ display: "block", marginBottom: "1rem" }}>
          Picture:
          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={handleChange}
            required
          />
        </label>

        <button
          type="submit"
          style={{
            backgroundColor: "#5c7249",
            color: "#f5f5d4",
            border: "none",
            padding: "0.75rem 1.5rem",
            borderRadius: "8px",
            cursor: "pointer",
            fontSize: "1rem",
          }}
        >
          Add Plant
        </button>
      </form>

      <div style={{ maxWidth: "600px", margin: "0 auto" }}>
        <h2 style={{ marginTop: "2rem", marginBottom: "1rem" }}>
          🌿 Existing Plants
        </h2>
        {plants.length === 0 && <p>No plants registered yet.</p>}

        {plants.map((plant, index) => (
          <div
            key={index}
            onClick={() =>
              selectedPlantIndex === index
                ? setSelectedPlantIndex(null)
                : setSelectedPlantIndex(index)
            }
            style={{
              backgroundColor: "#ffffff",
              marginBottom: "1rem",
              padding: "1rem",
              borderRadius: "10px",
              boxShadow: "0 3px 8px rgba(0,0,0,0.1)",
              cursor: "pointer",
              transition: "all 0.2s ease-in-out",
            }}
          >
            <strong>{plant.name}</strong> ({plant.species})
            {selectedPlantIndex === index && (
              <div style={{ marginTop: "1rem" }}>
                <img
                  src={plant.image}
                  alt={plant.name}
                  style={{ width: "100%", maxWidth: "300px", borderRadius: "8px" }}
                />
                <p style={{ marginTop: "0.5rem" }}>
                  State: <strong>{moodFromHealth()}</strong>
                </p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
