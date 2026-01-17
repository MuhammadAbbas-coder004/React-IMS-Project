import React, { useState } from "react";

import { collection, addDoc } from "firebase/firestore";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../../config/firebaseconfig/firebaseconfig";

const AddStudent = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleAddStudent = () => {
    name === "" ? alert("Please fill Name") :
    email === "" ? alert("Please fill Email") :
    password === "" ? alert("Please fill Password") :
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;

        addDoc(collection(db, "users"), {
          id: user.uid,
          name: name,
          email: email,
          role: "student",
        });

        alert("Student added successfully!");

        // Reset fields
        setName("");
        setEmail("");
        setPassword("");
      })
      .catch((err) => {
        console.log("Error adding student:", err);
        alert("Failed to add student");
      });
  };

  return (
    <div
      style={{
        maxWidth: "500px",
        margin: "50px auto",
        padding: "20px",
        background: "#fff",
        borderRadius: "8px",
        boxShadow: "0 0 10px rgba(0,0,0,0.1)",
      }}
    >
      <h2 style={{ textAlign: "center", marginBottom: "20px" }}>Add New Student</h2>

      {/* Student Name */}
      <div style={{ marginBottom: "15px" }}>
        <label style={{ display: "block", marginBottom: "5px" }}>Student Name:</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter student name"
          style={{ width: "100%", padding: "8px", borderRadius: "4px", border: "1px solid #ccc" }}
        />
      </div>

      {/* Email */}
      <div style={{ marginBottom: "15px" }}>
        <label style={{ display: "block", marginBottom: "5px" }}>Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter student email"
          style={{ width: "100%", padding: "8px", borderRadius: "4px", border: "1px solid #ccc" }}
        />
      </div>

      {/* Password */}
      <div style={{ marginBottom: "25px" }}>
        <label style={{ display: "block", marginBottom: "5px" }}>Password:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter password"
          style={{ width: "100%", padding: "8px", borderRadius: "4px", border: "1px solid #ccc" }}
        />
      </div>

      {/* Add Student Button */}
      <button
        onClick={handleAddStudent}
        style={{
          width: "100%",
          padding: "10px",
          backgroundColor: "#10b981",
          color: "#fff",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
        }}
      >
        Add Student
      </button>
    </div>
  );
};

export default AddStudent;
