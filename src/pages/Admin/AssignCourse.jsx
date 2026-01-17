import React, { useState, useEffect } from "react";
import { db } from "../../config/firebaseconfig/firebaseconfig";
import { collection, getDocs, addDoc } from "firebase/firestore";

const AssignCourse = () => {
  const [students, setStudents] = useState([]);
  const [courses, setCourses] = useState([]);
  const [student, setStudent] = useState("");
  const [course, setCourse] = useState("");

  // fetch students
  useEffect(() => {
    const fetchStudents = async () => {
      const snapshot = await getDocs(collection(db, "users"));
      const studentList = snapshot.docs
        .map(doc => ({ id: doc.id, ...doc.data() }))
        .filter(user => user.role === "student");
      setStudents(studentList);
    };
    fetchStudents();
  }, []);

  // fetch courses
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
      const selectedStudent = students.find(s => s.id === student);

      await addDoc(collection(db, "enrollments"), {
        studentId: student,
        studentName: selectedStudent.name,
        studentEmail: selectedStudent.email,
        courseName: course
      });

      alert("Course assigned successfully");
      setStudent("");
      setCourse("");
    } catch (err) {
      console.log("Error assigning course:", err);
      alert("Failed to assign course");
    }
  };

  return (
    <div style={{ maxWidth: "500px", margin: "50px auto", padding: "20px", background: "#fff", borderRadius: "8px", boxShadow: "0 0 10px rgba(0,0,0,0.1)" }}>
      <h2 style={{ textAlign: "center", marginBottom: "20px" }}>Assign Course to Student</h2>

      {/* Student Dropdown */}
      <div style={{ marginBottom: "20px" }}>
        <label>Select Student:</label>
        <select
          value={student}
          onChange={(e) => setStudent(e.target.value)}
          style={{ width: "100%", padding: "8px" }}
        >
          <option value="">--Select Student--</option>
          {students.map(s => (
            <option key={s.id} value={s.id}>{s.name}</option>
          ))}
        </select>
      </div>

      {/* Course Dropdown */}
      <div style={{ marginBottom: "30px" }}>
        <label>Select Course:</label>
        <select
          value={course}
          onChange={(e) => setCourse(e.target.value)}
          style={{ width: "100%", padding: "8px" }}
        >
          <option value="">--Select Course--</option>
          {courses.map((c, i) => (
            <option key={i} value={c}>{c}</option>
          ))}
        </select>
      </div>

      <button
        onClick={handleAssign}
        style={{
          width: "100%",
          padding: "10px",
          backgroundColor: "#3b82f6",
          color: "#fff",
          border: "none",
          borderRadius: "4px",
        }}
      >
        Assign Course
      </button>
    </div>
  );
};

export default AssignCourse;
