import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";

import Navbar from '../../../components/Navbar'
import { db } from "../../../config/firebaseconfig/firebaseconfig";

const ViewStudents = () => {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    const fetchStudents = async () => {
      // 1️⃣ Get all students
      const usersSnap = await getDocs(collection(db, "users"));
      const studentsList = usersSnap.docs
        .map(doc => ({ id: doc.id, ...doc.data() }))
        .filter(user => user.role === "student");

      // 2️⃣ Get enrollments
      const enrollSnap = await getDocs(collection(db, "enrollments"));
      const enrollments = enrollSnap.docs.map(doc => doc.data());

      // 3️⃣ Attach courses
      const finalStudents = studentsList.map(student => {
        const myCourses = enrollments
          .filter(e => e.studentId === student.id)
          .map(e => e.courseName);
        return {
          ...student,
          enrolledCourses: myCourses,
        };
      });

      setStudents(finalStudents);
    };

    fetchStudents();
  }, []);

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Navbar />

      <div className="flex-1 p-6">
        <h2 className="text-2xl font-bold mb-6">All Students</h2>

        {/* Responsive Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {students.map(student => (
            <div key={student.id} className="bg-white rounded-xl shadow-lg p-6 hover:shadow-2xl transition duration-300">
              {/* Profile placeholder */}
              <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center mb-4 mx-auto text-gray-500 text-xl font-bold">
                {student.name.charAt(0).toUpperCase()}
              </div>

              <h3 className="text-xl font-semibold text-center mb-2">{student.name}</h3>
              <p className="text-gray-600 text-center mb-2">{student.email}</p>
              <p className="text-gray-700 text-center">
                Courses: {student.enrolledCourses.length > 0 ? student.enrolledCourses.join(", ") : "No courses assigned"}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ViewStudents;
