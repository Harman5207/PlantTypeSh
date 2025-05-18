import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { db } from "../firebase";
import { collection, getDocs, query, orderBy } from "firebase/firestore";

function getRank(points) {
  if (points < 100) return "Iron";
  if (points < 200) return "Bronze";
  if (points < 300) return "Silver";
  if (points < 400) return "Gold";
  return "Diamond";
}

export default function Leaderboard() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    async function fetchUsers() {
      const q = query(collection(db, "users"), orderBy("points", "desc"));
      const snapshot = await getDocs(q);
      setUsers(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    }
    fetchUsers();
  }, []);

  return (
    <div style={{ backgroundColor: "#f5f5d4", minHeight: "100vh", width: "100vw", padding: "2rem", fontFamily: "'Segoe UI', sans-serif", color: "#5c7249" }}>
      <Link to="/" style={{ position: "fixed", top: "1rem", left: "1rem", padding: "0.5rem 1rem", backgroundColor: "#5c7249", color: "#f5f5d4", borderRadius: "8px", textDecoration: "none", fontWeight: "bold", zIndex: 1000 }}>Home</Link>
      <h1 style={{ fontSize: "2.5rem", marginBottom: "1.5rem", textAlign: "center" }}>🏆 Leaderboard</h1>
      <table style={{ backgroundColor: "#fff", margin: "0 auto", borderRadius: "12px", boxShadow: "0 4px 10px rgba(0,0,0,0.1)", maxWidth: "600px", width: "100%", padding: "2rem", borderCollapse: "collapse", fontSize: "1.1rem" }}>
        <thead>
          <tr style={{ background: "#c7d7ae", color: "#234014" }}>
            <th style={{ padding: "1rem", borderRadius: "12px 0 0 0" }}>Rank</th>
            <th style={{ padding: "1rem" }}>User</th>
            <th style={{ padding: "1rem" }}>Points</th>
            <th style={{ padding: "1rem", borderRadius: "0 12px 0 0" }}>Badge</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, i) => (
            <tr key={user.id} style={{ background: i % 2 === 0 ? "#f5f5f5" : "#fff" }}>
              <td style={{ textAlign: "center", padding: "0.8rem" }}>{i + 1}</td>
              <td style={{ textAlign: "center", padding: "0.8rem" }}>{user.name || user.email || user.id}</td>
              <td style={{ textAlign: "center", padding: "0.8rem" }}>{user.points || 0}</td>
              <td style={{ textAlign: "center", padding: "0.8rem" }}>{getRank(user.points || 0)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}