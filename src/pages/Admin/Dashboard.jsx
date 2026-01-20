import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import Sidebar from "../../components/Navbar";
import { auth, db } from "../../config/firebaseconfig/firebaseconfig";
import { collection, getDocs } from "firebase/firestore";

const Dashboard = () => {
  const [adminName, setAdminName] = useState("");
  const [totalStudents, setTotalStudents] = useState(0);
  const [totalCourses, setTotalCourses] = useState(0);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchAdminName = async () => {
      const snapshot = await getDocs(collection(db, "users"));
      const admin = snapshot.docs.find(
        (doc) => doc.data().email === auth.currentUser?.email
      );
      if (admin) setAdminName(admin.data().name);
    };
    fetchAdminName();
  }, []);

  useEffect(() => {
    const fetchStudentsCount = async () => {
      const snapshot = await getDocs(collection(db, "users"));
      const students = snapshot.docs.filter(
        (doc) => doc.data().role === "student"
      );
      setTotalStudents(students.length);
    };
    fetchStudentsCount();
  }, []);

  useEffect(() => {
    const fetchCoursesCount = async () => {
      const snapshot = await getDocs(collection(db, "courses"));
      setTotalCourses(snapshot.docs.length);
    };
    fetchCoursesCount();
  }, []);

  return (
    <div className="flex min-h-screen bg-gray-50 overflow-hidden">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 p-8">
        {/* WELCOME CARD */}
        <div className="mb-10">
          <div className="bg-gradient-to-r from-blue-400 to-indigo-500 text-white rounded-3xl p-6 flex justify-between items-center shadow-lg">
            <div>
              <h1 className="text-2xl font-bold">Welcome back, {adminName}</h1>
              <p className="text-sm opacity-90 mt-2">
                Track your institute progress easily
              </p>
            </div>
            <img
              src="https://cdn-icons-png.flaticon.com/512/4140/4140048.png"
              alt="Admin"
              className="w-32 hidden md:block animate-bounceSlow"
            />
          </div>
        </div>

        {/* STATS CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div className="rounded-3xl p-6 bg-white shadow-md hover:shadow-xl transition transform hover:scale-105">
            <p className="text-sm text-gray-500">Total Students</p>
            <p className="text-4xl font-bold mt-3 text-gray-800">{totalStudents}</p>
          </div>

          <div className="rounded-3xl p-6 bg-white shadow-md hover:shadow-xl transition transform hover:scale-105">
            <p className="text-sm text-gray-500">Total Courses</p>
            <p className="text-4xl font-bold mt-3 text-gray-800">{totalCourses}</p>
          </div>

          <div className="rounded-3xl p-6 bg-white shadow-md hover:shadow-xl transition transform hover:scale-105">
            <p className="text-sm text-gray-500">Logged Admin</p>
            <p className="text-xl font-semibold text-gray-800 mt-4">{adminName}</p>
          </div>
        </div>

        {/* ACTION CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div
            onClick={() => navigate("/students/add")}
            className="bg-white rounded-3xl p-7 shadow-md hover:shadow-xl cursor-pointer transition transform hover:scale-105 border-l-4 border-blue-400"
          >
            <h3 className="font-semibold text-lg text-gray-800">👨‍🎓 Add Student</h3>
            <p className="text-sm text-gray-500 mt-2">Register new student</p>
            <button className="mt-4 px-5 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-full transition">
              Add Now
            </button>
          </div>

          <div
            onClick={() => navigate("/courses/add")}
            className="bg-white rounded-3xl p-7 shadow-md hover:shadow-xl cursor-pointer transition transform hover:scale-105 border-l-4 border-purple-400"
          >
            <h3 className="font-semibold text-lg text-gray-800">📘 Add Course</h3>
            <p className="text-sm text-gray-500 mt-2">Create new course</p>
            <button className="mt-4 px-5 py-2 bg-purple-500 hover:bg-purple-600 text-white rounded-full transition">
              Create
            </button>
          </div>

          <div
            onClick={() => navigate("/assign-course")}
            className="bg-white rounded-3xl p-7 shadow-md hover:shadow-xl cursor-pointer transition transform hover:scale-105 border-l-4 border-teal-400"
          >
            <h3 className="font-semibold text-lg text-gray-800">🧩 Assign Course</h3>
            <p className="text-sm text-gray-500 mt-2">Assign courses to students</p>
            <button className="mt-4 px-5 py-2 bg-teal-500 hover:bg-teal-600 text-white rounded-full transition">
              Assign
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
