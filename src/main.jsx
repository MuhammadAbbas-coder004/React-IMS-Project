import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";
import { Provider } from "react-redux";
import "./index.css";

// Components

import ProtectedRoutes from "./components/ProtectedRoutes";

// Redux store
import store from "./config/firebaseconfig/redux/store/store"

// Admin Pages
import Login from "./pages/Admin/Login";
import Dashboard from "./pages/Admin/Dashboard";
import AssignCourse from "./pages/Admin/AssignCourse";
import Courses from "./pages/Admin/courses/Courses";
import AddCourse from "./pages/Admin/courses/AddCourse";
import Student from "./pages/Admin/student/Student";
import AddStudent from "./pages/Admin/student/AddStudent";
import StudentDashboard from "./pages/Admin/student/StudentDashboard";

// Student Pages
import MyCourse from "./pages/Student/MyCourse";
import Profile from "./pages/Student/Profile";

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <BrowserRouter>


      <Routes>
        {/* PUBLIC */}
        <Route path="/login" element={<Login />} />

        {/* ADMIN ROUTES */}
        <Route
          index                 // 🚀 index route
          element={
            <ProtectedRoutes role={['admin']} component={<Dashboard />} />
          }
        />

        <Route
          path="/students"
          element={<ProtectedRoutes role={['admin']} component={<Student />} />}
        />

        <Route
          path="/students/add"
          element={<ProtectedRoutes role={['admin']} component={<AddStudent />} />}
        />

        <Route
          path="/students/dashboard"
          element={<ProtectedRoutes role={['admin']} component={<StudentDashboard />} />}
        />

        <Route
          path="/courses"
          element={<ProtectedRoutes role={['admin']} component={<Courses />} />}
        />

        <Route
          path="/courses/add"
          element={<ProtectedRoutes role={['admin']} component={<AddCourse />} />}
        />

        <Route
          path="/assign-course"
          element={<ProtectedRoutes role={['admin']} component={<AssignCourse />} />}
        />

        {/* STUDENT ROUTES */}
        <Route
          path="/my-courses"
          element={<ProtectedRoutes role={['student']} component={<MyCourse />} />}
        />

        <Route
          path="/profile"
          element={<ProtectedRoutes role={['student']} component={<Profile />} />}
        />
      </Routes>
    </BrowserRouter>
  </Provider>
);
