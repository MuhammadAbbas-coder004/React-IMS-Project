import React, { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../../../config/firebaseconfig/firebaseconfig";
import Sidebar from "../../../components/Navbar"; // Sidebar import

const AddCourse = () => {
  const [courseName, setCourseName] = useState("");
  const [description, setDescription] = useState("");
  const [duration, setDuration] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (courseName === "" || description === "" || duration === "") {
      alert("Please fill all fields");
      return;
    }
    try {
      await addDoc(collection(db, "courses"), {
        courseName,
        description,
        duration,
      });
      alert(`Course "${courseName}" added successfully!`);
      setCourseName("");
      setDescription("");
      setDuration("");
    } catch (err) {
      console.log("Error adding course:", err);
      alert("Failed to add course");
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center px-6">
        <div className="w-full max-w-4xl flex bg-white rounded-3xl shadow-2xl overflow-hidden">
          
          {/* Left: Illustration */}
          <div className="hidden md:flex w-1/2 bg-purple-500 items-center justify-center p-8">
            <div className="w-80 h-80 bg-white rounded-full shadow-2xl flex items-center justify-center p-8">
              <img
                src="https://img.freepik.com/free-vector/online-certification-illustration_23-2148575636.jpg"
                alt="Add Course"
                className="w-full h-full object-cover rounded-full"
              />
            </div>
          </div>

          {/* Right: Form */}
          <div className="w-full md:w-1/2 p-10">
            <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
              Add New Course
            </h2>

            {/* Course Name */}
            <div className="mb-6">
              <label className="block text-gray-700 mb-2 font-medium">Course Name</label>
              <input
                type="text"
                value={courseName}
                onChange={(e) => setCourseName(e.target.value)}
                placeholder="Enter course name"
                className="w-full px-5 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
              />
            </div>

            {/* Course Description */}
            <div className="mb-6">
              <label className="block text-gray-700 mb-2 font-medium">Course Description</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Enter course description"
                className="w-full px-5 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
              ></textarea>
            </div>

            {/* Course Duration */}
            <div className="mb-8">
              <label className="block text-gray-700 mb-2 font-medium">Course Duration</label>
              <input
                type="text"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                placeholder="Enter course duration"
                className="w-full px-5 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
              />
            </div>

            {/* Add Course Button */}
            <button
              onClick={handleSubmit}
              className="w-full bg-purple-500 hover:bg-purple-600 text-white font-semibold py-3 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              Add Course
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddCourse;
