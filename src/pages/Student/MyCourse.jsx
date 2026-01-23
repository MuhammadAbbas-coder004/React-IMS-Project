// src/pages/Student/MyCourses.jsx
import React, { useEffect, useState } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../../config/firebaseconfig/firebaseconfig";
import StudentNavbar from "../../components/StudentNavbar";

const MyCourses = () => {
  const [courses, setCourses] = useState([]);
  const [error, setError] = useState(null);
  const [studentName, setStudentName] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        setError("Please log in to view your courses");
        return;
      }

      try {
        const email = user.email;

        const userQuery = query(
          collection(db, "users"),
          where("email", "==", email)
        );
        const userSnap = await getDocs(userQuery);
        if (!userSnap.empty) {
          setStudentName(userSnap.docs[0].data().name);
        }

        const enrollQuery = query(
          collection(db, "enrollments"),
          where("studentEmail", "==", email)
        );
        const enrollSnap = await getDocs(enrollQuery);

        if (enrollSnap.empty) {
          setCourses([]);
          return;
        }

        const courseNames = enrollSnap.docs.map(
          (d) => d.data().courseName
        );

        const coursesPromises = courseNames.map(async (courseName) => {
          const courseQuery = query(
            collection(db, "courses"),
            where("courseName", "==", courseName)
          );
          const courseSnap = await getDocs(courseQuery);
          if (!courseSnap.empty) {
            return {
              id: courseSnap.docs[0].id,
              ...courseSnap.docs[0].data(),
            };
          }
          return null;
        });

        const result = (await Promise.all(coursesPromises)).filter(Boolean);
        setCourses(result);
      } catch {
        setError("Failed to load courses");
      }
    });

    return () => unsubscribe();
  }, []);

  /* ---------- ERROR ---------- */
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="bg-white p-8 rounded-2xl shadow-lg text-center">
          <p className="text-red-600 font-semibold">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 px-5 py-10 md:pl-80">
      <div className="max-w-7xl mx-auto">
        <StudentNavbar />

        {/* HERO / WELCOME (FIXED FOR MOBILE) */}
        <div
          className="
          bg-gradient-to-r from-blue-600 to-indigo-600
          text-white rounded-3xl
          p-6 md:p-8
          mb-10 shadow-xl
          grid md:grid-cols-2 gap-6 items-center
          mt-14 md:mt-0
        "
        >
          {/* LEFT CONTENT */}
          <div>
            <h1 className="text-2xl md:text-3xl font-extrabold mb-2 md:mb-3">
              My Courses 🎓
            </h1>
            <p className="text-blue-100 text-base md:text-lg mb-2 md:mb-3">
              Welcome back,{" "}
              <span className="font-semibold">
                {studentName || "Student"}
              </span>
            </p>
            <p className="text-blue-100 max-w-xl text-sm md:text-base">
              This is your personal learning area where you can access all
              your enrolled courses and continue your journey.
            </p>

            <div className="mt-4 md:mt-6 flex items-center gap-5 bg-white/20 backdrop-blur rounded-2xl px-5 py-3 w-fit">
              <div>
                <p className="text-xs md:text-sm text-blue-100">
                  Total Courses
                </p>
                <p className="text-2xl md:text-3xl font-extrabold">
                  {courses.length}
                </p>
              </div>
              <div className="h-10 w-px bg-white/40"></div>
              <div>
                <p className="text-xs md:text-sm text-blue-100">Status</p>
                <p className="font-semibold text-green-200">Active</p>
              </div>
            </div>
          </div>

          {/* RIGHT IMAGE */}
          <div className="flex justify-center md:justify-end mt-4 md:mt-0">
            <div className="relative group">
              <img
                src="https://cdn-icons-png.flaticon.com/512/219/219986.png"
                alt="Student Profile"
                className="w-28 h-28 md:w-52 md:h-52 rounded-full shadow-2xl transition-all duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 rounded-full ring-2 ring-white/30 group-hover:ring-blue-200 transition"></div>
            </div>
          </div>
        </div>

        {/* EMPTY STATE */}
        {courses.length === 0 ? (
          <div className="bg-white rounded-3xl p-16 text-center shadow-lg">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              No Courses Yet
            </h2>
            <p className="text-gray-500">
              Once admin assigns courses, they will appear here.
            </p>
          </div>
        ) : (
          <>
            {/* COURSES GRID */}
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {courses.map((course, index) => (
                <div
                  key={course.id}
                  className="group bg-white rounded-3xl shadow-md hover:shadow-2xl transition-all duration-300 border border-transparent hover:border-blue-400 hover:-translate-y-2"
                >
                  <div className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-t-3xl px-6 py-5">
                    <p className="text-xs opacity-80 mb-1">
                      Course {index + 1}
                    </p>
                    <h3 className="text-lg font-bold">
                      {course.courseName}
                    </h3>
                  </div>

                  <div className="p-6">
                    {course.description && (
                      <p className="text-gray-600 mb-5 leading-relaxed">
                        {course.description}
                      </p>
                    )}

                    {course.duration && (
                      <div className="flex justify-between items-center bg-blue-50 border border-blue-200 rounded-xl px-4 py-3">
                        <span className="text-sm text-gray-600">
                          Duration
                        </span>
                        <span className="font-bold text-blue-700">
                          {course.duration}
                        </span>
                      </div>
                    )}

                    <div className="mt-6 text-center">
                      <span className="inline-block bg-green-100 text-green-700 px-6 py-2 rounded-full text-sm font-bold">
                        Enrolled
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* SUMMARY */}
            <div className="mt-16 bg-white rounded-3xl p-10 shadow-xl">
              <h3 className="text-xl font-bold text-gray-800 mb-6">
                Learning Overview
              </h3>
              <div className="grid sm:grid-cols-3 gap-6">
                <div className="bg-blue-50 rounded-xl p-6 text-center hover:shadow-md transition">
                  <p className="text-sm text-gray-500">Courses</p>
                  <p className="text-3xl font-extrabold text-blue-600">
                    {courses.length}
                  </p>
                </div>
                <div className="bg-green-50 rounded-xl p-6 text-center hover:shadow-md transition">
                  <p className="text-sm text-gray-500">Progress</p>
                  <p className="font-bold text-green-600">In Progress</p>
                </div>
                <div className="bg-purple-50 rounded-xl p-6 text-center hover:shadow-md transition">
                  <p className="text-sm text-gray-500">Student</p>
                  <p className="font-bold text-purple-600 truncate">
                    {studentName}
                  </p>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default MyCourses;
