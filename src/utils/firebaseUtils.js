// src/utils/firebaseUtils.js
import { doc, updateDoc, increment, collection, getDocs, query, where, addDoc } from "firebase/firestore";
import { db } from "../firebase";

// Find user by name (case-insensitive)
export async function getUserIdByName(name) {
  const q = query(collection(db, "users"), where("name", "==", name));
  const snapshot = await getDocs(q);
  if (!snapshot.empty) {
    return snapshot.docs[0].id;
  } else {
    // Add user if not found
    const docRef = await addDoc(collection(db, "users"), { name, points: 0 });
    return docRef.id;
  }
}

export async function updateUserPoints(userId, delta) {
  const userRef = doc(db, "users", userId);
  await updateDoc(userRef, { points: increment(delta) });
}