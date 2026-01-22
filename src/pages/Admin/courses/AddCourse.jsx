import React, { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../../../config/firebaseconfig/firebaseconfig";
import Sidebar from "../../../components/Navbar";
import { HiBookOpen, HiAcademicCap, HiCheckCircle } from "react-icons/hi";

const AddCourse = () => {
  const [courseName, setCourseName] = useState("");
  const [description, setDescription] = useState("");
  const [duration, setDuration] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!courseName || !description || !duration) return alert("Please fill all fields");

    setLoading(true);
    try {
      await addDoc(collection(db, "courses"), { courseName, description, duration });
      alert(`Course "${courseName}" added successfully!`);
      setCourseName("");
      setDescription("");
      setDuration("");
    } catch (err) {
      console.error(err);
      alert("Failed to add course");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">

      {/* Sidebar */}
      <div className="fixed top-0 left-0 h-full z-40">
        <Sidebar />
      </div>

      {/* Main Content */}
      <div className="flex-1 md:ml-72 flex flex-col items-center px-3 sm:px-6
                      pt-24 sm:pt-28 md:pt-6 min-h-[100vh]">

        {/* Form Card */}
        <div className="w-full max-w-3xl flex flex-col sm:flex-row bg-white rounded-3xl shadow-2xl overflow-hidden mb-6">

          {/* Left Image - FULL CIRCLE like AssignCourse */}
          <div className="flex w-full sm:w-1/2 bg-purple-500 items-center justify-center p-4 sm:p-6">
            <div className="w-36 sm:w-72 h-36 sm:h-72 rounded-full shadow-2xl overflow-hidden flex items-center justify-center">
              <img
                src="https://img.freepik.com/free-vector/online-learning-abstract-concept-illustration_335657-4141.jpg"
                alt="Add IT Course"
                className="w-full h-full object-cover rounded-full transition-transform duration-500 hover:scale-105"
              />
            </div>
          </div>

          {/* Right Form */}
          <div className="w-full sm:w-1/2 p-4 sm:p-10 flex flex-col justify-center">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4 sm:mb-6 text-center sm:text-left">
              Add New Course
            </h2>

            <div className="mb-3 sm:mb-4">
              <label className="block text-gray-700 mb-1 font-medium text-sm">
                Course Name
              </label>
              <input
                type="text"
                value={courseName}
                onChange={e => setCourseName(e.target.value)}
                placeholder="Enter course name"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg
                           focus:outline-none focus:ring-2 focus:ring-purple-400
                           text-sm sm:text-base"
              />
            </div>

            <div className="mb-3 sm:mb-4">
              <label className="block text-gray-700 mb-1 font-medium text-sm">
                Description
              </label>
              <textarea
                value={description}
                onChange={e => setDescription(e.target.value)}
                placeholder="Enter course description"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg
                           focus:outline-none focus:ring-2 focus:ring-purple-400
                           text-sm sm:text-base resize-none"
              />
            </div>

            <div className="mb-4 sm:mb-5">
              <label className="block text-gray-700 mb-1 font-medium text-sm">
                Duration
              </label>
              <input
                type="text"
                value={duration}
                onChange={e => setDuration(e.target.value)}
                placeholder="e.g. 3 Months"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg
                           focus:outline-none focus:ring-2 focus:ring-purple-400
                           text-sm sm:text-base"
              />
            </div>

            <div className="mt-auto pb-6 sm:pb-0">
              <button
                onClick={handleSubmit}
                disabled={loading}
                className={`w-full bg-purple-500 hover:bg-purple-600 text-white
                            font-semibold py-3 rounded-xl transition-all duration-300
                            ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
              >
                {loading ? "Adding..." : "Add Course"}
              </button>
            </div>
          </div>
        </div>

        {/* Info Cards */}
        <div className="w-full max-w-3xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          <div className="bg-gradient-to-r from-purple-400 to-purple-600
                          text-white shadow-lg rounded-2xl p-4 flex flex-col
                          items-center hover:scale-105 transition">
            <HiBookOpen className="text-2xl mb-2" />
            <p className="font-bold text-sm mb-1">Create Course</p>
            <p className="text-[10px] sm:text-xs text-center text-white/90">
              Add structured learning content.
            </p>
          </div>

          <div className="bg-gradient-to-r from-indigo-400 to-indigo-600
                          text-white shadow-lg rounded-2xl p-4 flex flex-col
                          items-center hover:scale-105 transition">
            <HiAcademicCap className="text-2xl mb-2" />
            <p className="font-bold text-sm mb-1">Course Info</p>
            <p className="text-[10px] sm:text-xs text-center text-white/90">
              Name, duration & description.
            </p>
          </div>

          <div className="bg-gradient-to-r from-teal-400 to-teal-600
                          text-white shadow-lg rounded-2xl p-4 flex flex-col
                          items-center hover:scale-105 transition">
            <HiCheckCircle className="text-2xl mb-2" />
            <p className="font-bold text-sm mb-1">Ready to Use</p>
            <p className="text-[10px] sm:text-xs text-center text-white/90">
              Course ready for students.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default AddCourse;

