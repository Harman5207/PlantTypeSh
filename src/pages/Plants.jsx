import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import * as tmImage from "@teachablemachine/image";
import { getUserIdByName, updateUserPoints } from "../utils/firebaseUtils";

// Teachable Machine model URLs
const modelURL = "https://teachablemachine.withgoogle.com/models/86A_E1N9A/model.json";
const metadataURL = "https://teachablemachine.withgoogle.com/models/86A_E1N9A/metadata.json";
let model;
async function loadModel() {
  if (!model) {
    model = await tmImage.load(modelURL, metadataURL);
  }
}
async function predictHealth(imageBase64) {
  await loadModel();
  const img = document.createElement("img");
  img.src = imageBase64;
  await new Promise(resolve => img.onload = resolve);
  const prediction = await model.predict(img);
  const result = prediction.reduce((prev, curr) => (curr.probability > prev.probability ? curr : prev));
  return result.className;
}

function moodFromHealth(health) {
  if (!health) return "🤔 Unknown";
  const h = health.toLowerCase();
  if (h.includes("really happy")) return "😄 Really Happy";
  if (h.includes("happy")) return "😊 Happy";
  if (h.includes("disease") || h.includes("unhealthy") || h.includes("sad") || h.includes("dead")) return "😢 Sad";
  return "🤔 Unknown";
}

const ESP_CAMERA_URL = "http://10.37.108.72/capture";

export default function Plants() {
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
  const [cameraImage, setCameraImage] = useState(null);
  const [cameraPrediction, setCameraPrediction] = useState(null);
  const [cameraLoading, setCameraLoading] = useState(false);

  useEffect(() => {
    localStorage.setItem("plants", JSON.stringify(plants));
  }, [plants]);

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.name && formData.species && formData.image) {
      const health = await predictHealth(formData.image);
      setPlants([...plants, { ...formData, health }]);
      setFormData({ name: "", species: "", image: null });

      // --- Firestore logic ---
      // Ensure user exists or create with 0 points
      const userId = await getUserIdByName(formData.name);

      // If plant is "really happy", add 5 points
      if (health.toLowerCase().includes("really happy")) {
        await updateUserPoints(userId, 5);
      }
    }
  };

  // CAMERA FUNCTIONALITY
  const handleCameraClick = async (plantIndex) => {
    setSelectedPlantIndex(plantIndex);
    setCameraImage(null);
    setCameraPrediction(null);
    setCameraLoading(true);
    try {
      const response = await fetch(ESP_CAMERA_URL + "?t=" + Date.now());
      const blob = await response.blob(); 
      const reader = new FileReader();
      reader.readAsDataURL(blob);
      reader.onloadend = async () => {
        const base64 = reader.result;
        setCameraImage(base64);
        const health = await predictHealth(base64);
        setCameraPrediction(health);

        // If you want to also award points for camera "really happy", you can add similar logic here:
        // const userId = await getUserIdByName(plants[plantIndex].name);
        // if (health.toLowerCase().includes("really happy")) {
        //   await updateUserPoints(userId, 5);
        // }

        setCameraLoading(false);
      };
    } catch {
      setCameraImage(null);
      setCameraPrediction("Error");
      setCameraLoading(false);
    }
  };

  return (
    <div style={{
      backgroundColor: "#f5f5d4",
      minHeight: "100vh",
      width: "100vw",
      padding: "2rem",
      fontFamily: "'Segoe UI', sans-serif",
      color: "#5c7249",
    }}>
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

      <h1 style={{
        fontSize: "2.5rem",
        marginBottom: "1.5rem",
        textAlign: "center",
      }}>🪴 My Plants</h1>

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
            <button
              style={{
                marginLeft: "1rem",
                backgroundColor: "#c7d7ae",
                color: "#5c7249",
                border: "none",
                padding: "0.5rem 1rem",
                borderRadius: "8px",
                cursor: "pointer",
                fontSize: "0.9rem",
                float: "right"
              }}
              onClick={() => handleCameraClick(index)}
            >
              Camera
            </button>
            <div style={{ clear: "both" }}></div>
            <div style={{ marginTop: "1rem" }}>
              <img
                src={plant.image}
                alt={plant.name}
                style={{ width: "100%", maxWidth: "300px", borderRadius: "8px" }}
              />
              <p style={{ marginTop: "0.5rem" }}>
                State: <strong>{moodFromHealth(plant.health)}</strong>
              </p>
              {selectedPlantIndex === index && (
                <div
                  style={{
                    marginTop: "1rem",
                    padding: "1rem",
                    background: "#f5f5f5",
                    borderRadius: "8px",
                    border: "1px solid #c7d7ae"
                  }}
                >
                  <h4>ESP Camera Snapshot</h4>
                  {cameraLoading && <p>Loading camera...</p>}
                  {cameraImage && (
                    <img
                      src={cameraImage}
                      alt="ESP Camera"
                      style={{ width: "100%", maxWidth: "300px", borderRadius: "8px" }}
                    />
                  )}
                  {cameraPrediction && (
                    <p>
                      Camera State: <strong>{moodFromHealth(cameraPrediction)}</strong>
                    </p>
                  )}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}