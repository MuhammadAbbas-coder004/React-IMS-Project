import React, { useState, useEffect } from "react";
import { db } from "../../config/firebaseconfig/firebaseconfig";
import { collection, getDocs, addDoc, query, where } from "firebase/firestore";
import Sidebar from "../../components/Navbar";
import { HiUser, HiBookOpen, HiCheckCircle } from "react-icons/hi";

const AssignCourse = () => {
  const [students, setStudents] = useState([]);
  const [courses, setCourses] = useState([]);
  const [student, setStudent] = useState("");
  const [course, setCourse] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchStudents = async () => {
      const snapshot = await getDocs(collection(db, "users"));
      setStudents(
        snapshot.docs
          .map(doc => ({ id: doc.id, ...doc.data() }))
          .filter(u => u.role === "student")
      );
    };
    fetchStudents();
  }, []);

  useEffect(() => {
    const fetchCourses = async () => {
      const snapshot = await getDocs(collection(db, "courses"));
      setCourses(snapshot.docs.map(doc => doc.data().courseName));
    };
    fetchCourses();
  }, []);

  const handleAssign = async () => {
    if (!student || !course) return alert("Please select both student and course");

    setLoading(true);
    try {
      const q = query(
        collection(db, "enrollments"),
        where("studentId", "==", student),
        where("courseName", "==", course)
      );

      const snapshot = await getDocs(q);
      if (!snapshot.empty) {
        setLoading(false);
        return alert("Student already assigned to this course");
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
      console.error(err);
      alert("Failed to assign course");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">

      {/* Sidebar */}
      <div className="fixed top-0 left-0 h-full z-40">
        <Sidebar />
      </div>

      {/* Main Content */}
      <div className="flex-1 md:ml-72 flex flex-col items-center
                      px-3 sm:px-6 pt-16 sm:pt-20 md:pt-6 min-h-[100vh]">

        {/* FORM (BIGGER) */}
        <div className="w-full max-w-4xl flex flex-col sm:flex-row
                        bg-white rounded-3xl shadow-2xl overflow-hidden mb-8">

          {/* Image */}
          <div className="flex w-full sm:w-1/2 bg-teal-500
                          items-center justify-center p-4 sm:p-8">
            <div className="w-36 sm:w-72 h-36 sm:h-72 rounded-full shadow-2xl overflow-hidden flex items-center justify-center">
              <img
                src="https://cdn-icons-png.flaticon.com/512/219/219986.png"
                alt="Assign Course"
                className="w-full h-full object-cover rounded-full transition-transform duration-500 hover:scale-105"
              />
            </div>
          </div>

          {/* Form */}
          <div className="w-full sm:w-1/2 p-4 sm:p-12 flex flex-col justify-center">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-800
                           mb-4 sm:mb-8 text-center sm:text-left">
              Assign Course to Student
            </h2>

            <div className="mb-3 sm:mb-5">
              <label className="block text-gray-700 mb-1 font-medium text-sm">
                Select Student
              </label>
              <select
                value={student}
                onChange={e => setStudent(e.target.value)}
                className="w-full px-4 py-3 sm:py-4 border border-gray-300
                           rounded-lg focus:ring-2 focus:ring-teal-400
                           text-sm sm:text-base"
              >
                <option value="">-- Select Student --</option>
                {students.map(s => (
                  <option key={s.id} value={s.id}>{s.name}</option>
                ))}
              </select>
            </div>

            <div className="mb-4 sm:mb-6">
              <label className="block text-gray-700 mb-1 font-medium text-sm">
                Select Course
              </label>
              <select
                value={course}
                onChange={e => setCourse(e.target.value)}
                className="w-full px-4 py-3 sm:py-4 border border-gray-300
                           rounded-lg focus:ring-2 focus:ring-teal-400
                           text-sm sm:text-base"  
              >
                <option value="">-- Select Course --</option>
                {courses.map((c, i) => (
                  <option key={i} value={c}>{c}</option>
                ))}
              </select>
            </div>

            <div className="mt-auto pb-4 sm:pb-0">
              <button
                onClick={handleAssign}
                disabled={loading}
                className={`w-full bg-teal-600 hover:bg-teal-700
                            text-white font-semibold py-3 sm:py-4
                            rounded-xl transition-all duration-300
                            ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
              >
                {loading ? "Assigning..." : "Assign Course"}
              </button>
            </div>
          </div>
        </div>

        {/* INFO CARDS (SLIGHTLY BIGGER) */}
        <div className="w-full max-w-4xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3
                        gap-3 sm:gap-4 mb-8">

          <div className="bg-gradient-to-r from-teal-400 to-teal-600
                          text-white shadow-lg rounded-2xl
                          p-4 sm:p-5 flex flex-col items-center
                          hover:scale-105 transition">
            <HiUser className="text-2xl sm:text-3xl mb-2" />
            <p className="font-bold text-sm sm:text-base mb-1">Student</p>
            <p className="text-xs text-center text-white/90">
              Select student for enrollment
            </p>
          </div>

          <div className="bg-gradient-to-r from-cyan-400 to-cyan-600
                          text-white shadow-lg rounded-2xl
                          p-4 sm:p-5 flex flex-col items-center
                          hover:scale-105 transition">
            <HiBookOpen className="text-2xl sm:text-3xl mb-2" />
            <p className="font-bold text-sm sm:text-base mb-1">Course</p>
            <p className="text-xs text-center text-white/90">
              Choose available course
            </p>
          </div>

          <div className="bg-gradient-to-r from-emerald-400 to-emerald-600
                          text-white shadow-lg rounded-2xl
                          p-4 sm:p-5 flex flex-col items-center
                          hover:scale-105 transition">
            <HiCheckCircle className="text-2xl sm:text-3xl mb-2" />
            <p className="font-bold text-sm sm:text-base mb-1">Assigned</p>
            <p className="text-xs text-center text-white/90">
              Course successfully assigned
            </p>
          </div>

        </div>

      </div>
    </div>
  );
};

export default AssignCourse;
