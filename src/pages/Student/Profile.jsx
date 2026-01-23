import React, { useEffect, useState } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { auth, db } from "../../config/firebaseconfig/firebaseconfig";
import StudentNavbar from "../../components/StudentNavbar";

const StudentProfile = () => {
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    role: "",
    image: "https://cdn-icons-png.flaticon.com/512/219/219986.png",
  });

  useEffect(() => {
    const user = auth.currentUser;
    if (!user) return;

    const getProfile = async () => {
      const q = query(
        collection(db, "users"),
        where("email", "==", user.email)
      );
      const snap = await getDocs(q);

      if (!snap.empty) {
        setProfile({
          ...snap.docs[0].data(),
          image: "https://cdn-icons-png.flaticon.com/512/219/219986.png",
        });
      }
    };

    getProfile();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 px-4 sm:px-6 pt-16 md:pl-80">
      {/* NAVBAR */}
      <StudentNavbar />

      {/* HERO */}
      <div className="max-w-6xl mx-auto mb-10">
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-3xl shadow-lg p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6">

          {/* LEFT */}
          <div className="text-white text-center md:text-left">
            <h1 className="text-2xl md:text-3xl font-bold">
              Welcome, {profile.name || "Student"}
            </h1>
            <p className="text-blue-100 mt-2 text-sm md:text-base">
              Here is your student profile dashboard
            </p>
          </div>

          {/* RIGHT IMAGE */}
          <div className="relative group">
            <img
              src={profile.image}
              alt="student"
              className="w-28 h-28 md:w-44 md:h-44 rounded-full shadow-2xl transition-all duration-300 group-hover:scale-105"
            />
            <div className="absolute inset-0 rounded-full ring-2 ring-white/30 group-hover:ring-blue-200 transition"></div>
          </div>
        </div>
      </div>

      {/* INFO CARDS */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div className="bg-white rounded-2xl p-6 shadow hover:shadow-lg transition">
          <p className="text-xs text-gray-500 uppercase tracking-wide">
            Full Name
          </p>
          <p className="text-lg font-semibold text-gray-800 mt-1">
            {profile.name}
          </p>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow hover:shadow-lg transition">
          <p className="text-xs text-gray-500 uppercase tracking-wide">
            Email
          </p>
          <p className="text-lg font-semibold text-gray-800 mt-1 break-all">
            {profile.email}
          </p>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow hover:shadow-lg transition">
          <p className="text-xs text-gray-500 uppercase tracking-wide">
            Role
          </p>
          <p className="text-lg font-semibold text-gray-800 mt-1 capitalize">
            {profile.role}
          </p>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow hover:shadow-lg transition">
          <p className="text-xs text-gray-500 uppercase tracking-wide">
            Account Status
          </p>
          <p className="text-lg font-semibold text-green-600 mt-1">
            Verified Student
          </p>
        </div>
      </div>
    </div>
  );
};

export default StudentProfile;
