import React from "react";
import { signOut } from "firebase/auth";
import { auth } from "../config/firebaseconfig/firebaseconfig";
import { Link } from "react-router";

const Sidebar = () => {

  const logout = () => {
    signOut(auth)
      .then(() => window.location.href = "/login") // simple navigation
      .catch(() => alert("Logout failed"));
  };

  return (
    <div className="h-screen w-64 bg-gray-900 text-white flex flex-col justify-between">
      {/* Logo */}
      <div className="text-center py-6 border-b border-gray-700">
        <h1 className="text-2xl font-bold">IMS</h1>
      </div>

      {/* Menu */}
      <nav className="flex-1 mt-6 flex flex-col gap-2 px-4">
        <Link
          to="/"
          className="text-left py-2 px-3 rounded hover:bg-gray-700 transition"
        >
          Dashboard
        </Link>

        <Link
          to="/students"
          className="text-left py-2 px-3 rounded hover:bg-gray-700 transition"
        >
          Students
        </Link>

        <Link
          to="/courses"
          className="text-left py-2 px-3 rounded hover:bg-gray-700 transition"
        >
          Courses
        </Link>
      </nav>

      {/* Logout */}
      <button
        onClick={logout}
        className="bg-red-600 mx-4 mb-6 py-2 rounded hover:bg-red-700 transition"
      >
        Logout
      </button>
    </div>
  );
};

export default Sidebar;
