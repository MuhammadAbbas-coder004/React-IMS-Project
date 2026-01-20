import React, { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../../config/firebaseconfig/firebaseconfig";
import Sidebar from "../../../components/Navbar"; // sidebar path

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
    <div className="flex min-h-screen" style={{ backgroundColor: "#ffffff" }}>
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center px-6">
        <div className="w-full max-w-4xl flex bg-white rounded-3xl shadow-2xl overflow-hidden">
          
          {/* Left: Student Illustration */}
          <div className="hidden md:flex w-1/2 bg-blue-500 items-center justify-center">
            <img
              src="https://cdn-icons-png.flaticon.com/512/219/219986.png"
              alt="Student"
              className="w-3/4 rounded-full shadow-lg"
            />
          </div>

          {/* Right: Form */}
          <div className="w-full md:w-1/2 p-10">
            <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
              Add New Student
            </h2>

            {/* Name */}
            <div className="mb-6">
              <label className="block text-gray-700 mb-2 font-medium">
                Full Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter student name"
                className="w-full px-5 py-3 border border-gray-300 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

            {/* Email */}
            <div className="mb-6">
              <label className="block text-gray-700 mb-2 font-medium">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter student email"
                className="w-full px-5 py-3 border border-gray-300 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

            {/* Password */}
            <div className="mb-8">
              <label className="block text-gray-700 mb-2 font-medium">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                className="w-full px-5 py-3 border border-gray-300 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

            {/* Add Student Button */}
            <button
              onClick={handleAddStudent}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl transition-all duration-300"
            >
              Add Student
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default AddStudent;
