import React, { useState, useEffect } from "react";
import { db } from "../../config/firebaseconfig/firebaseconfig";
import { collection, getDocs, addDoc, query, where } from "firebase/firestore";
import Sidebar from "../../components/Navbar"; // Sidebar import

const AssignCourse = () => {
  const [students, setStudents] = useState([]);
  const [courses, setCourses] = useState([]);
  const [student, setStudent] = useState("");
  const [course, setCourse] = useState("");

  // Fetch students
  useEffect(() => {
    const fetchStudents = async () => {
      const snapshot = await getDocs(collection(db, "users"));
      const studentList = snapshot.docs
        .map(doc => ({ id: doc.id, ...doc.data() }))
        .filter(user => user.role === "student"); // only students
      setStudents(studentList);
    };
    fetchStudents();
  }, []);

  // Fetch courses
  useEffect(() => {
    const fetchCourses = async () => {
      const snapshot = await getDocs(collection(db, "courses"));
      const courseList = snapshot.docs.map(doc => doc.data().courseName);
      setCourses(courseList);
    };
    fetchCourses();
  }, []);

  const handleAssign = async () => {
    if (!student || !course) {
      alert("Please select both student and course");
      return;
    }

    try {
      // Prevent duplicate assignment
      const q = query(
        collection(db, "enrollments"),
        where("studentId", "==", student),
        where("courseName", "==", course)
      );
      const snapshot = await getDocs(q);
      if (!snapshot.empty) {
        alert("This student is already assigned to this course!");
        return;
      }

      const selectedStudent = students.find(s => s.id === student);

      await addDoc(collection(db, "enrollments"), {
        studentId: student,
        studentName: selectedStudent.name,
        studentEmail: selectedStudent.email,
        courseName: course
      });

      alert("Course assigned successfully!");
      setStudent("");
      setCourse("");
    } catch (err) {
      console.log(err);
      alert("Failed to assign course");
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center px-6">
        <div className="w-full max-w-4xl flex bg-white rounded-3xl shadow-2xl overflow-hidden">
          
          {/* Left: Student Illustration */}
          <div className="hidden md:flex w-1/2 bg-teal-500 items-center justify-center p-8">
            <img
              src="https://cdn-icons-png.flaticon.com/512/219/219986.png"
              alt="Student"
              className="w-3/4 rounded-full shadow-lg"
            />
          </div>

          {/* Right: Form */}
          <div className="w-full md:w-1/2 p-10">
            <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
              Assign Course to Student
            </h2>

            {/* Student Dropdown */}
            <div className="mb-6">
              <label className="block text-gray-700 mb-2 font-medium">Select Student:</label>
              <select
                value={student}
                onChange={e => setStudent(e.target.value)}
                className="w-full px-5 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400"
              >
                <option value="">--Select Student--</option>
                {students.map(s => (
                  <option key={s.id} value={s.id}>{s.name}</option>
                ))}
              </select>
            </div>

            {/* Course Dropdown */}
            <div className="mb-8">
              <label className="block text-gray-700 mb-2 font-medium">Select Course:</label>
              <select
                value={course}
                onChange={e => setCourse(e.target.value)}
                className="w-full px-5 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400"
              >
                <option value="">--Select Course--</option>
                {courses.map((c, i) => (
                  <option key={i} value={c}>{c}</option>
                ))}
              </select>
            </div>

            {/* Assign Button */}
            <button
              onClick={handleAssign}
              className="w-full bg-teal-500 hover:bg-teal-600 text-white font-semibold py-3 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              Assign Course
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default AssignCourse;
