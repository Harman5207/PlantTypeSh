import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function Social() {
  const [posts, setPosts] = useState(() => {
    // Load saved posts from localStorage or use default initial post
    const savedPosts = localStorage.getItem("plantPosts");
    return savedPosts
      ? JSON.parse(savedPosts)
      : [
          {
            id: 1,
            plantName: "Share your plant!",
            caption: "More likes = More points",
            imageUrl:
              "https://plus.unsplash.com/premium_photo-1663962158789-0ab624c4f17d?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          },
        ];
  });

  const [plantName, setPlantName] = useState("");
  const [caption, setCaption] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  // Save posts to localStorage whenever posts change
  useEffect(() => {
    localStorage.setItem("plantPosts", JSON.stringify(posts));
  }, [posts]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!plantName || !caption || !imageUrl)
      return alert("Please fill all fields");
    const newPost = {
      id: Date.now(),
      plantName,
      caption,
      imageUrl,
    };
    setPosts([newPost, ...posts]);
    setPlantName("");
    setCaption("");
    setImageUrl("");
  };

  return (
    <div
      style={{
        backgroundColor: "#f5f5d4",
        minHeight: "100vh",
        width: "100vw",
        padding: "2rem",
        boxSizing: "border-box",
        display: "flex",
        justifyContent: "center",
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
      <div
        style={{
          maxWidth: 600,
          width: "100%",
          backgroundColor: "transparent",
          borderRadius: "12px",
          boxShadow: "0 4px 12px rgba(92, 114, 73, 0.2)",
          fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        }}
      >
        <h2
          style={{
            color: "#5c7249",
            textAlign: "center",
            marginBottom: "1.5rem",
            textShadow: "1px 1px 1px rgba(0,0,0,0.1)",
          }}
        >
          Plant Social Feed
        </h2>

        <form onSubmit={handleSubmit} style={{ marginBottom: "2rem" }}>
          <input
            type="text"
            placeholder="Plant Name/Post Title"
            value={plantName}
            onChange={(e) => setPlantName(e.target.value)}
            style={{
              width: "90%",
              marginBottom: 12,
              marginLeft: 13,
              padding: "15px 15px",
              fontSize: "1rem",
              borderRadius: "8px",
              border: "2px solid #5c7249",
              outline: "none",
              transition: "border-color 0.3s ease",
            }}
            onFocus={(e) => (e.target.style.borderColor = "#486135")}
            onBlur={(e) => (e.target.style.borderColor = "#5c7249")}
          />
          <input
            type="text"
            placeholder="Caption"
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
            style={{
              width: "90%",
              marginLeft: 13,
              marginBottom: 12,
              padding: "12px 15px",
              fontSize: "1rem",
              borderRadius: "8px",
              border: "2px solid #5c7249",
              outline: "none",
              transition: "border-color 0.3s ease",
            }}
            onFocus={(e) => (e.target.style.borderColor = "#486135")}
            onBlur={(e) => (e.target.style.borderColor = "#5c7249")}
          />
          <input
            type="text"
            placeholder="Image URL"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            style={{
              width: "90%",
              marginLeft: 13,
              marginBottom: 16,
              padding: "12px 15px",
              fontSize: "1rem",
              borderRadius: "8px",
              border: "2px solid #5c7249",
              outline: "none",
              transition: "border-color 0.3s ease",
            }}
            onFocus={(e) => (e.target.style.borderColor = "#486135")}
            onBlur={(e) => (e.target.style.borderColor = "#5c7249")}
          />
          <button
            type="submit"
            style={{
              backgroundColor: "#5c7249",
              color: "#f5f5d4",
              border: "none",
              padding: "12px 30px",
              fontSize: "1.1rem",
              borderRadius: "12px",
              cursor: "pointer",
              display: "block",
              margin: "0 auto",
              boxShadow: "0 4px 8px rgba(92, 114, 73, 0.5)",
              transition: "background-color 0.3s ease",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.backgroundColor = "#486135")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.backgroundColor = "#5c7249")
            }
          >
            Post
          </button>
        </form>

        <div>
          {posts.map(({ id, plantName, caption, imageUrl }) => (
            <div
              key={id}
              style={{
                backgroundColor: "#ffffffcc",
                borderRadius: "12px",
                padding: "15px",
                marginBottom: "20px",
                boxShadow: "0 3px 8px rgba(92, 114, 73, 0.25)",
                color: "#3e4a2e",
                textAlign: "center",
              }}
            >
              <h3 style={{ marginBottom: "8px" }}>{plantName}</h3>
              <img
                src={imageUrl}
                alt={plantName}
                style={{
                  width: "100%",
                  maxHeight: 280,
                  objectFit: "cover",
                  borderRadius: "10px",
                  marginBottom: "10px",
                }}
              />
              <p
                style={{
                  fontStyle: "italic",
                  fontSize: "1rem",
                  userSelect: "text",
                }}
              >
                {caption}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
