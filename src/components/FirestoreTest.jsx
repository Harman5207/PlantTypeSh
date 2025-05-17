import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";

function FirestoreTest() {
  const [status, setStatus] = useState("Testing...");

  useEffect(() => {
    async function testConnection() {
      try {
        const querySnapshot = await getDocs(collection(db, "test"));
        setStatus(
          `Success! Connected to Firestore. Found ${querySnapshot.size} documents.`
        );
      } catch (error) {
        setStatus("Error connecting to Firestore: " + error.message);
      }
    }
    testConnection();
  }, []);

  return <div>{status}</div>;
}

export default FirestoreTest;