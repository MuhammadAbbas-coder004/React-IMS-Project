// src/pages/Student/Profile.jsx
import React from "react";
import { useSelector } from "react-redux";

const Profile = () => {
  const user = useSelector((state) => state.auth.user);

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <p className="text-gray-600 text-xl">Loading profile...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-sm text-center hover:shadow-2xl transition duration-300">
        <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center mx-auto mb-4 text-gray-500 text-3xl font-bold">
          {user.name.charAt(0).toUpperCase()}
        </div>
        <h2 className="text-2xl font-semibold mb-2">{user.name}</h2>
        <p className="text-gray-600 mb-2">{user.email}</p>
        <p className="text-gray-700 font-medium">Role: {user.role}</p>
      </div>
    </div>
  );
};

export default Profile;
