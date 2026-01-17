import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import Sidebar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { auth, db } from "../../config/firebaseconfig/firebaseconfig";
import { collection, getDocs } from "firebase/firestore";

const Dashboard = () => {
  const [adminName, setAdminName] = useState("");
  const [students, setStudents] = useState([]);
  const [courses, setCourses] = useState([]);
  const navigate = useNavigate();

  // fetch admin name
  useEffect(() => {
    const fetchAdmin = async () => {
      const usersSnap = await getDocs(collection(db, "users"));
      const user = usersSnap.docs.find(doc => doc.data().email === auth.currentUser?.email);
      if (user) setAdminName(user.data().name);
      else setAdminName("Admin");
    };
    fetchAdmin();
  }, []);

  // fetch students with their courses
  useEffect(() => {
    const fetchStudents = async () => {
      // 1️⃣ Students
      const usersSnap = await getDocs(collection(db, "users"));
      const studentsList = usersSnap.docs
        .map(doc => ({ id: doc.id, ...doc.data() }))
        .filter(user => user.role === "student");

      //Enrollments
      const enrollSnap = await getDocs(collection(db, "enrollments"));
      const enrollments = enrollSnap.docs.map(doc => doc.data());

      // courses
      const finalStudents = studentsList.map(student => {
        const myCourses = enrollments
          .filter(e => e.studentId === student.id) 
          .map(e => e.courseName);

        return {
          ...student,
          enrolledCourses: myCourses
        };
      });

      setStudents(finalStudents);
    };

    fetchStudents();
  }, []);

  // fetch courses
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
      <Sidebar />

      <div className="flex-1 p-6">
        {/* Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="bg-white rounded shadow p-6 text-center hover:shadow-lg transition">
            <h3 className="text-gray-500 mb-2">Total Students</h3>
            <p className="text-3xl font-bold">{students.length}</p>
          </div>

          <div className="bg-white rounded shadow p-6 text-center hover:shadow-lg transition">
            <h3 className="text-gray-500 mb-2">Total Courses</h3>
            <p className="text-3xl font-bold">{courses.length}</p>
          </div>

          <div className="bg-white rounded shadow p-6 text-center hover:shadow-lg transition">
            <h3 className="text-gray-500 mb-2">Logged Admin</h3>
            <p className="text-3xl font-bold">{adminName}</p>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <button onClick={() => navigate("/students/add")} className="bg-green-500 text-white py-3 rounded hover:bg-green-600 transition">Add Student</button>
          <button onClick={() => navigate("/courses/add")} className="bg-blue-500 text-white py-3 rounded hover:bg-blue-600 transition">Add Course</button>
          <button onClick={() => navigate("/assign-course")} className="bg-yellow-500 text-white py-3 rounded hover:bg-yellow-600 transition">Assign Course</button>
        </div>

        {/* Latest Students Table */}
        <div className="bg-white rounded shadow p-4 mb-6 overflow-x-auto">
          <h3 className="text-lg font-bold mb-3">Latest Students</h3>
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-200">
                <th className="border-b p-2">Name</th>
                <th className="border-b p-2">Email</th>
                <th className="border-b p-2">Enrolled Courses</th>
                <th className="border-b p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {students.map(student => (
                <tr key={student.id} className="hover:bg-gray-50">
                  <td className="border-b p-2">{student.name}</td>
                  <td className="border-b p-2">{student.email}</td>
                  <td className="border-b p-2">
                    {student.enrolledCourses.length > 0 ? student.enrolledCourses.join(", ") : "No courses assigned"}
                  </td>
                  <td className="border-b p-2">
                    <button className="text-blue-500 hover:underline mr-2">Edit</button>
                    <button className="text-red-500 hover:underline">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Latest Courses Table */}
        <div className="bg-white rounded shadow p-4 overflow-x-auto">
          <h3 className="text-lg font-bold mb-3">Latest Courses</h3>
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-200">
                <th className="border-b p-2">Name</th>
                <th className="border-b p-2">Duration</th>
                <th className="border-b p-2">Description</th>
                <th className="border-b p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {courses.map(course => (
                <tr key={course.id} className="hover:bg-gray-50">
                  <td className="border-b p-2">{course.courseName}</td>
                  <td className="border-b p-2">{course.duration}</td>
                  <td className="border-b p-2">{course.description}</td>
                  <td className="border-b p-2">
                    <button className="text-blue-500 hover:underline mr-2">Edit</button>
                    <button className="text-red-500 hover:underline">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <Footer />
      </div>
    </div>
  );
};

export default Dashboard;
