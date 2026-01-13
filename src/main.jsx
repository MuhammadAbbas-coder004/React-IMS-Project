import { createRoot } from "react-dom/client";

import Navbar from "./components/Navbar";
import ProtectedRoutes from "./components/ProtectedRoutes";
import "./index.css";

import Login from "./pages/Admin/Login";
import Dashboard from "./pages/Admin/Dashboard";
import AssignCourse from "./pages/Admin/AssignCourse";
import Courses from "./pages/Admin/courses/Courses";
import AddCourse from "./pages/Admin/courses/AddCourse";
import Student from "./pages/Admin/student/Student";
import AddStudent from "./pages/Admin/student/AddStudent";
import StudentDashboard from "./pages/Admin/student/StudentDashboard";

// Student pages
import MyCourse from "./pages/Student/MyCourse";
import Profile from "./pages/Student/Profile";
import { BrowserRouter, Route, Routes } from "react-router";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Navbar />

    <Routes>
      {/* Public */}
      <Route path="/login" element={<Login />} />

      {/* Admin */}
      <Route
        index
        element={<ProtectedRoutes><Dashboard /></ProtectedRoutes>}
      />

      <Route
        path="/students"
        element={<ProtectedRoutes><Student /></ProtectedRoutes>}
      />

      <Route
        path="/students/add"
        element={<ProtectedRoutes><AddStudent /></ProtectedRoutes>}
      />

      <Route
        path="/students/dashboard"
        element={<ProtectedRoutes><StudentDashboard /></ProtectedRoutes>}
      />

      <Route
        path="/courses"
        element={<ProtectedRoutes><Courses /></ProtectedRoutes>}
      />

      <Route
        path="/courses/add"
        element={<ProtectedRoutes><AddCourse /></ProtectedRoutes>}
      />

      <Route
        path="/assign-course"
        element={<ProtectedRoutes><AssignCourse /></ProtectedRoutes>}
      />

      {/* Student */}
      <Route
        path="/my-courses"
        element={<ProtectedRoutes><MyCourse /></ProtectedRoutes>}
      />

      <Route
        path="/profile"
        element={<ProtectedRoutes><Profile /></ProtectedRoutes>}
      />
    </Routes>
  </BrowserRouter>
);
