// src/pages/Admin/ViewStudents.jsx
import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import Navbar from '../../../components/Navbar';
import { db } from "../../../config/firebaseconfig/firebaseconfig";

const ViewStudents = () => {
  const [students, setStudents] = useState([]);

  const fetchStudents = async () => {
    const usersSnap = await getDocs(collection(db, "users"));
    const studentsList = usersSnap.docs
      .map(doc => ({ id: doc.id, ...doc.data() }))
      .filter(user => user.role === "student");

    const enrollSnap = await getDocs(collection(db, "enrollments"));
    const enrollments = enrollSnap.docs.map(doc => doc.data());

    const finalStudents = studentsList.map(student => {
      const myCourses = enrollments
        .filter(e => e.studentId === student.id)
        .map(e => e.courseName);
      return { ...student, enrolledCourses: myCourses };
    });

    setStudents(finalStudents);
  };

  useEffect(() => {
    (async () => {
      await fetchStudents();
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
        <h2 className="text-3xl sm:text-4xl font-extrabold mb-12 text-gray-800 text-left tracking-tight leading-snug">
          All Students
        </h2>

        {/* Students Grid */}
        <div className="w-full max-w-6xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center sm:justify-items-start">
          {students.map(student => (
            <div
              key={student.id}
              className="bg-white rounded-3xl shadow-md p-6 flex flex-col items-center
                         hover:shadow-xl transform hover:-translate-y-2 transition duration-300 w-full max-w-xs"
            >
              {/* Profile */}
              <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full border-2 border-gray-300 shadow-md overflow-hidden mb-5 flex items-center justify-center text-3xl sm:text-4xl font-semibold text-gray-500 bg-gray-100">
                {student.name.charAt(0).toUpperCase()}
              </div>

              {/* Student Info */}
              <h3 className="text-lg sm:text-xl font-semibold text-gray-800 text-center sm:text-left mb-1">
                {student.name}
              </h3>
              <p className="text-gray-600 text-sm sm:text-base mb-2 text-center sm:text-left">
                {student.email}
              </p>

              {/* Courses */}
              <div className="mt-2 flex flex-wrap justify-center sm:justify-start gap-2">
                {student.enrolledCourses.length > 0 ? (
                  student.enrolledCourses.map((course, idx) => (
                    <span
                      key={idx}
                      className="bg-gray-100 text-gray-800 text-xs px-3 py-1 rounded-full shadow-sm"
                    >
                      {course}
                    </span>
                  ))
                ) : (
                  <span className="bg-gray-100 text-gray-500 text-xs px-3 py-1 rounded-full shadow-sm">
                    No courses
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ViewStudents;
