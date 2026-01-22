// src/pages/Admin/ViewCourses.jsx
import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../../config/firebaseconfig/firebaseconfig";
import Navbar from '../../../components/Navbar';

const ViewCourses = () => {
  const [courses, setCourses] = useState([]);

  const fetchCourses = async () => {
    const snapshot = await getDocs(collection(db, "courses"));
    const courseList = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    setCourses(courseList);
  };

  useEffect(() => {
    (async () => {
      await fetchCourses();
    })();
  }, []);

  return (
    <div className="flex min-h-screen bg-gray-100">

      {/* Sidebar */}
      <div className="fixed top-0 left-0 h-full z-40">
        <Navbar />
      </div>

      {/* Main Content */}
      <div className="flex-1 ml-0 md:ml-72 p-4 sm:p-6 md:p-8 pt-12 flex flex-col items-start">
        {/* Heading */}
        <h2 className="text-3xl sm:text-4xl font-extrabold mb-12 text-gray-800 text-left tracking-tight leading-snug">
          All Courses
        </h2>

        {/* Courses Grid */}
        <div className="w-full max-w-6xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 
                        justify-items-center sm:justify-items-start">
          {courses.map(course => (
            <div
              key={course.id}
              className="bg-white rounded-3xl shadow-md p-6 flex flex-col items-center
                         hover:shadow-xl transform hover:-translate-y-2 transition duration-300 w-full max-w-xs"
            >
              {/* Course Icon */}
              <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full border-2 border-gray-300 shadow-md overflow-hidden mb-5 flex items-center justify-center text-3xl sm:text-4xl font-semibold text-gray-500 bg-gray-100">
                {course.courseName.charAt(0).toUpperCase()}
              </div>

              {/* Course Info */}
              <h3 className="text-lg sm:text-xl font-semibold text-gray-800 text-center sm:text-left mb-1">
                {course.courseName}
              </h3>
              <p className="text-gray-600 text-sm sm:text-base mb-2 text-center sm:text-left">
                Duration: {course.duration}
              </p>
              <p className="text-gray-700 text-sm sm:text-base mt-1 text-center sm:text-left leading-relaxed">
                {course.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ViewCourses;
