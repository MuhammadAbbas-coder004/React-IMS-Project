// src/pages/Student/MyCourses.jsx
import React, { useEffect, useState } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../../config/firebaseconfig/firebaseconfig";

const MyCourses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userEmail, setUserEmail] = useState(null);
  const [studentName, setStudentName] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        setLoading(false);
        setError("Please log in to view your courses");
        return;
      }

      try {
        const email = user.email;
        setUserEmail(email);

        // get student name
        const userQuery = query(
          collection(db, "users"),
          where("email", "==", email)
        );
        const userSnap = await getDocs(userQuery);
        if (!userSnap.empty) {
          setStudentName(userSnap.docs[0].data().name);
        }

        // get enrollments
        const enrollQuery = query(
          collection(db, "enrollments"),
          where("studentEmail", "==", email)
        );
        const enrollSnap = await getDocs(enrollQuery);

        if (enrollSnap.empty) {
          setCourses([]);
          setLoading(false);
          return;
        }

        const courseNames = enrollSnap.docs.map(d => d.data().courseName);

        const coursesPromises = courseNames.map(async (courseName) => {
          const courseQuery = query(
            collection(db, "courses"),
            where("courseName", "==", courseName)
          );
          const courseSnap = await getDocs(courseQuery);
          if (!courseSnap.empty) {
            return { id: courseSnap.docs[0].id, ...courseSnap.docs[0].data() };
          }
          return null;
        });

        const result = (await Promise.all(coursesPromises)).filter(Boolean);
        setCourses(result);
      } catch (err) {
        setError("Failed to load courses");
      } finally {
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  /* ---------- LOADING ---------- */
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-500 border-t-transparent mx-auto mb-4"></div>
          <p className="text-lg font-semibold text-gray-700">
            Preparing your learning dashboard...
          </p>
        </div>
      </div>
    );
  }

  /* ---------- ERROR ---------- */
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
        <div className="bg-white p-8 rounded-2xl shadow-xl text-center max-w-md w-full">
          <div className="text-6xl mb-4">⚠️</div>
          <p className="text-red-600 font-bold text-lg">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 px-4 py-10">
      <div className="max-w-6xl mx-auto">

        {/* HERO HEADER */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-3xl shadow-2xl p-8 sm:p-10 mb-10 text-white flex flex-col sm:flex-row justify-between items-center gap-6">
          <div>
            <h1 className="text-3xl sm:text-4xl font-extrabold mb-2">
              My Courses 🎓
            </h1>
            <p className="text-blue-100 text-lg">
              Welcome back, {studentName || userEmail}
            </p>
            <p className="text-sm text-blue-200 mt-1">
              Keep learning, keep growing 
            </p>
          </div>

          <div className="bg-white/20 backdrop-blur-md rounded-2xl px-8 py-6 text-center border border-white/30">
            <p className="text-sm font-semibold text-gray-900 mb-1">
              Enrolled Courses
            </p>
            <p className="text-5xl font-extrabold text-gray-900">
              {courses.length}
            </p>
          </div>
        </div>

        {/* NO COURSES */}
        {courses.length === 0 ? (
          <div className="bg-white rounded-3xl shadow-xl p-12 text-center">
            <div className="text-7xl mb-4">📭</div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              No Courses Assigned
            </h2>
            <p className="text-gray-500 text-lg">
              Ask your admin to enroll you in courses.
            </p>
          </div>
        ) : (
          <>
            {/* COURSES GRID */}
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {courses.map((course, index) => (
                <div
                  key={course.id}
                  className="group bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden border border-gray-200"
                >
                  {/* TOP */}
                  <div className="bg-gradient-to-r from-blue-500 to-indigo-500 p-5 text-white">
                    <div className="flex justify-between items-center mb-3">
                      <span className="bg-white text-gray-900 px-4 py-1 rounded-full text-sm font-bold">
                        #{index + 1}
                      </span>
                      <span className="text-2xl">📘</span>
                    </div>
                    <h3 className="text-xl font-extrabold leading-snug">
                      {course.courseName}
                    </h3>
                  </div>

                  {/* BODY */}
                  <div className="p-6">
                    {course.description && (
                      <p className="text-gray-600 mb-4 leading-relaxed">
                        {course.description}
                      </p>
                    )}

                    {course.duration && (
                      <div className="flex items-center bg-blue-50 border border-blue-200 rounded-xl p-3 mb-4">
                        <span className="text-2xl mr-3">⏳</span>
                        <div>
                          <p className="text-xs uppercase text-gray-500 font-semibold">
                            Duration
                          </p>
                          <p className="text-lg font-bold text-blue-600">
                            {course.duration}
                          </p>
                        </div>
                      </div>
                    )}

                    <div className="flex justify-center">
                      <span className="bg-green-100 text-green-700 px-6 py-2 rounded-full font-bold text-sm">
                        ✅ ENROLLED
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* SUMMARY */}
            <div className="mt-12 bg-white rounded-3xl shadow-xl p-8">
              <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                📊 Learning Summary
              </h3>
              <div className="grid sm:grid-cols-3 gap-6">
                <div className="bg-blue-50 rounded-xl p-5 text-center border border-blue-200">
                  <p className="text-sm text-gray-500 mb-1">Total Courses</p>
                  <p className="text-4xl font-extrabold text-blue-600">
                    {courses.length}
                  </p>
                </div>
                <div className="bg-green-50 rounded-xl p-5 text-center border border-green-200">
                  <p className="text-sm text-gray-500 mb-1">Status</p>
                  <p className="text-xl font-bold text-green-600">Active</p>
                </div>
                <div className="bg-purple-50 rounded-xl p-5 text-center border border-purple-200">
                  <p className="text-sm text-gray-500 mb-1">Student</p>
                  <p className="text-lg font-bold text-purple-600 truncate">
                    {studentName || "Student"}
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
