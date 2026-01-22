import React, { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db, secondaryAuth } from "../../../config/firebaseconfig/firebaseconfig";
import { createUserWithEmailAndPassword, signOut } from "firebase/auth";
import Sidebar from "../../../components/Navbar";
import { HiUserAdd, HiKey, HiAcademicCap } from "react-icons/hi";

const AddStudent = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleAddStudent = async () => {
    if (!name || !email || !password) return alert("Fill all fields");

    setLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(
        secondaryAuth,
        email,
        password
      );
      const student = userCredential.user;

      await addDoc(collection(db, "users"), {
        id: student.uid,
        name,
        email,
        role: "student",
      });

      alert("Student added successfully!");
      setName("");
      setEmail("");
      setPassword("");

      await signOut(secondaryAuth);
    } catch (err) {
      console.error("Error adding student:", err);
      alert("Failed to add student");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">

      {/* Sidebar fixed */}
      <div className="fixed top-0 left-0 h-full z-40">
        <Sidebar />
      </div>

      {/* Main content */}
      <div className="flex-1 md:ml-72 flex flex-col items-center px-3 sm:px-6
                      pt-16 sm:pt-20 md:pt-6 min-h-[100vh]">

        {/* Form + Image Card */}
        <div className="w-full max-w-3xl flex flex-col sm:flex-row bg-white rounded-3xl shadow-2xl overflow-hidden mb-6">

          {/* Left Image - FULL CIRCLE like AssignCourse */}
          <div className="flex w-full sm:w-1/2 bg-blue-500 items-center justify-center p-3 sm:p-6">
            <div className="w-36 sm:w-72 h-36 sm:h-72 rounded-full shadow-2xl overflow-hidden flex items-center justify-center">
              <img
                src="https://cdn-icons-png.flaticon.com/512/219/219986.png"
                alt="Student"
                className="w-full h-full object-cover rounded-full transition-transform duration-500 hover:scale-105"
              />
            </div>
          </div>

          {/* Right Form */}
          <div className="w-full sm:w-1/2 p-3 sm:p-10 flex flex-col justify-center">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-3 sm:mb-6 text-center sm:text-left">
              Add New Student
            </h2>

            <div className="mb-2 sm:mb-4">
              <label className="block text-gray-700 mb-1 font-medium text-sm">
                Full Name
              </label>
              <input
                type="text"
                value={name}
                onChange={e => setName(e.target.value)}
                placeholder="Enter student name"
                className="w-full px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400"
              />
            </div>

            <div className="mb-2 sm:mb-4">
              <label className="block text-gray-700 mb-1 font-medium text-sm">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="Enter student email"
                className="w-full px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400"
              />
            </div>

            <div className="mb-3 sm:mb-5">
              <label className="block text-gray-700 mb-1 font-medium text-sm">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="Enter password"
                className="w-full px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400"
              />
            </div>

            <div className="mt-auto pb-4 sm:pb-0">
              <button
                onClick={handleAddStudent}
                disabled={loading}
                className={`w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl transition-all duration-300 ${
                  loading ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                {loading ? "Adding..." : "Add Student"}
              </button>
            </div>
          </div>
        </div>

        {/* STUDENT SUCCESS INFO CARDS */}
        <div className="w-full max-w-3xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-8">

          <div className="bg-gradient-to-r from-emerald-400 to-emerald-600
                          text-white shadow-lg rounded-2xl p-4
                          flex flex-col items-center hover:scale-105 transition">
            <HiUserAdd className="text-2xl mb-2" />
            <p className="font-bold text-sm mb-1">Student Created</p>
            <p className="text-xs text-center text-white/90">
              New student account has been successfully created in the system.
            </p>
          </div>

          <div className="bg-gradient-to-r from-indigo-400 to-indigo-600
                          text-white shadow-lg rounded-2xl p-4
                          flex flex-col items-center hover:scale-105 transition">
            <HiKey className="text-2xl mb-2" />
            <p className="font-bold text-sm mb-1">Login Credentials</p>
            <p className="text-xs text-center text-white/90">
              Student can now log in using provided email & password.
            </p>
          </div>

          <div className="bg-gradient-to-r from-blue-400 to-blue-600
                          text-white shadow-lg rounded-2xl p-4
                          flex flex-col items-center hover:scale-105 transition">
            <HiAcademicCap className="text-2xl mb-2" />
            <p className="font-bold text-sm mb-1">Ready for Courses</p>
            <p className="text-xs text-center text-white/90">
              Student is now ready to be enrolled in available courses.
            </p>
          </div>

        </div>

      </div>
    </div>
  );
};

export default AddStudent;
