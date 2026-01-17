// src/pages/Admin/ViewCourses.jsx
import React, { useEffect, useState } from "react";

import { collection, getDocs } from "firebase/firestore";
import { db } from "../../../config/firebaseconfig/firebaseconfig";
import Navbar from '../../../components/Navbar'
const ViewCourses = () => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const fetchCourses = async () => {
      const snapshot = await getDocs(collection(db, "courses"));
      const courseList = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setCourses(courseList);
    };

    fetchCourses();
  }, []);

  return (
    <div className="flex min-h-screen bg-gray-100">
<Navbar/>

      <div className="flex-1 p-6">
        <h2 className="text-2xl font-bold mb-6">All Courses</h2>

        {/* Responsive Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map(course => (
            <div
              key={course.id}
              className="bg-white rounded-xl shadow-lg p-6 hover:shadow-2xl transition duration-300"
            >
              {/* Course Icon placeholder */}
              <div className="w-16 h-16 rounded-full bg-blue-200 flex items-center justify-center mb-4 mx-auto text-blue-700 text-xl font-bold">
                {course.courseName.charAt(0).toUpperCase()}
              </div>

              <h3 className="text-xl font-semibold text-center mb-2">{course.courseName}</h3>
              <p className="text-gray-600 text-center mb-1">Duration: {course.duration}</p>
              <p className="text-gray-700 text-center">{course.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ViewCourses;
