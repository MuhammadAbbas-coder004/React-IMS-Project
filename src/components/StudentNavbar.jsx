import React, { useState } from "react";
import { Link, useLocation } from "react-router";
import {
  HiMenu,
  HiX,
  HiUserCircle,
  HiClipboardList,
  HiLogout,
} from "react-icons/hi";
import { signOut } from "firebase/auth";
import { auth } from "../config/firebaseconfig/firebaseconfig";

const Sidebar = () => {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  const logout = async () => {
    await signOut(auth);
    window.location.href = "/login";
  };

  // ONLY PROFILE & MY COURSES
  const menuItems = [
    { name: "Profile", icon: <HiUserCircle />, to: "/profile" }, // changed icon to HiUserCircle
    { name: "My Courses", icon: <HiClipboardList />, to: "/my-courses" },
  ];

  return (
    <>
      {/* MOBILE HAMBURGER BUTTON */}
      <button
        onClick={() => setOpen(!open)}
        className="
          md:hidden fixed top-5 left-5 z-50 p-2 bg-white rounded-full shadow-md
          hover:bg-purple-50 transition duration-300 text-purple-600
          flex items-center justify-center text-xl
        "
      >
        {open ? <HiX className="text-red-500 text-xl" /> : <HiMenu className="text-purple-600" />}
      </button>

      {/* SIDEBAR */}
      <aside
        className={`
          fixed top-0 bottom-0 left-0
          w-72 bg-white shadow-xl z-40
          transition-transform duration-300
          ${open ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
          flex flex-col
        `}
      >
        {/* LOGO */}
        <div className="h-20 flex items-center justify-center border-b border-gray-200 flex-shrink-0">
          <h1
            className="text-4xl font-black text-purple-600 select-none tracking-tight"
            style={{ fontFamily: 'Bebas Neue, sans-serif', textTransform: 'uppercase' }}
          >
            IMS
          </h1>
        </div>

        {/* NAV - scrollable */}
        <nav className="px-4 mt-4 space-y-1 flex-1 overflow-auto">
          <p className="text-xs text-gray-400 px-3 mb-2">NAVIGATION</p>

          {menuItems.map((item, i) => {
            const active = location.pathname === item.to;
            return (
              <Link
                key={i}
                to={item.to}
                onClick={() => setOpen(false)}
                className={`
                  flex items-center gap-4 px-4 py-3 rounded-xl
                  transition
                  ${active
                    ? "bg-purple-100 text-purple-600 font-semibold"
                    : "text-gray-600 hover:bg-gray-100"
                  }
                `}
              >
                <span
                  className={`text-xl ${
                    item.name === "Profile" ? "text-purple-500" : ""
                  }`}
                >
                  {item.icon}
                </span>
                <span className="font-medium">{item.name}</span>
              </Link>
            );
          })}
        </nav>

        {/* LOGOUT */}
        <div className="w-full px-6 py-4 flex-shrink-0">
          <button
            onClick={logout}
            className="
              w-full flex items-center justify-center gap-2
              bg-red-500 text-white py-2.5 rounded-xl shadow-md
              hover:bg-red-600 transition text-base font-medium
            "
          >
            <HiLogout className="text-lg" />
            Logout
          </button>
        </div>
      </aside>

      {/* OVERLAY (mobile) */}
      {open && (
        <div
          className="fixed inset-0 bg-black/40 z-30 md:hidden"
          onClick={() => setOpen(false)}
        />
      )}
    </>
  );
};

export default Sidebar;
