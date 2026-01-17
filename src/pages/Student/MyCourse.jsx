// src/pages/Student/MyCourses.jsx
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { db } from "../../config/firebaseconfig/firebaseconfig";
import { collection, getDocs, query, where } from "firebase/firestore";

const MyCourses = () => {
  const user = useSelector((state) => state.auth.user);
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    if (!user?.id) return;

    const fetchMyCourses = async () => {
      try {
        const enrollSnap = await getDocs(
          query(
            collection(db, "enrollments"),
            where("studentId", "==", user.id)
          )
        );

        const myEnrollments = enrollSnap.docs.map(doc => doc.data());

        const coursesList = myEnrollments.map(e => ({
          name: e.courseName,
          duration: e.courseDuration || "N/A",
        }));

        setCourses(coursesList);
      } catch (err) {
        console.log("Error fetching courses:", err);
      }
    };

    fetchMyCourses();
  }, [user]);

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h2 className="text-3xl font-bold text-center mb-8">{user.name}'s Courses</h2>

      {courses.length === 0 ? (
        <p className="text-center text-gray-600 text-xl">No courses assigned yet.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-lg p-6 hover:shadow-2xl transition duration-300"
            >
              <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center mb-4 mx-auto text-blue-500 text-2xl font-bold">
                {course.name.charAt(0).toUpperCase()}
              </div>
              <h3 className="text-xl font-semibold text-center">{course.name}</h3>
              <p className="text-gray-600 text-center mt-2">Duration: {course.duration}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyCourses;
