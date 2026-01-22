import React, { useEffect, useState } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../../config/firebaseconfig/firebaseconfig";

const StudentProfile = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (user) => {
      if (!user) return;

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
      setLoading(false);
    });

    return () => unsub();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin h-12 w-12 border-4 border-blue-500 border-t-transparent rounded-full"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 px-4 sm:px-6 pt-16">

      {/* BLUE WELCOME CARD */}
      <div className="max-w-5xl mx-auto mb-10">
        <div className="bg-gradient-to-r from-blue-500 to-indigo-600 rounded-3xl shadow-lg p-8 sm:p-10 flex flex-col sm:flex-row items-center justify-between gap-6">

          {/* LEFT TEXT */}
          <div className="text-white text-center sm:text-left">
            <h1 className="text-2xl sm:text-3xl font-bold">
              Welcome, {profile.name} 👋
            </h1>
            <p className="text-sm sm:text-base text-blue-100 mt-2">
              Here is your student profile dashboard
            </p>
          </div>

          {/* RIGHT IMAGE */}
          <img
            src={profile.image}
            alt="student"
            className="w-32 h-32 sm:w-40 sm:h-40 rounded-full bg-white p-2 shadow-xl"
          />
        </div>
      </div>

      {/* INFO CARDS (NO CHANGE) */}
      <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-4">

        <div className="bg-white rounded-2xl p-5 shadow hover:shadow-lg transition">
          <p className="text-xs text-gray-500 uppercase tracking-wide">
            Full Name
          </p>
          <p className="text-lg font-semibold text-gray-800 mt-1">
            {profile.name}
          </p>
        </div>

        <div className="bg-white rounded-2xl p-5 shadow hover:shadow-lg transition">
          <p className="text-xs text-gray-500 uppercase tracking-wide">
            Email
          </p>
          <p className="text-lg font-semibold text-gray-800 mt-1 break-all">
            {profile.email}
          </p>
        </div>

        <div className="bg-white rounded-2xl p-5 shadow hover:shadow-lg transition">
          <p className="text-xs text-gray-500 uppercase tracking-wide">
            Role
          </p>
          <p className="text-lg font-semibold text-gray-800 mt-1 capitalize">
            {profile.role}
          </p>
        </div>

        <div className="bg-white rounded-2xl p-5 shadow hover:shadow-lg transition">
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
