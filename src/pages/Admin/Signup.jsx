import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { collection, doc, setDoc } from "firebase/firestore";
import { auth, db } from "../../config/firebaseconfig/firebaseconfig";
import { useNavigate, Link } from "react-router";
import { HiEye, HiEyeOff } from "react-icons/hi";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("student");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSignup = async (event) => {
    event.preventDefault();
    setError("");
    setLoading(true);

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      console.log("User created:", user.uid);

      // Save user role to Firestore using UID as document ID
      await setDoc(doc(db, "users", user.uid), {
        name: name,
        email: user.email,
        role: role,
        uid: user.uid,
        createdAt: new Date().toISOString()
      });

      console.log("User data saved to Firestore");
      navigate("/login");
    } catch (err) {
      console.error(err);
      setError("Signup failed. " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl p-8 animate-fadeIn">
        {/* LOGO */}
        <div className="text-center mb-6">
          <h1 className="text-4xl font-black text-purple-600 tracking-wide">IMS</h1>
          <p className="text-gray-500 mt-1 text-sm">Create Your Account</p>
        </div>

        {error && (
          <div className="bg-red-100 text-red-700 px-4 py-2 rounded-lg mb-4 text-sm text-center">
            {error}
          </div>
        )}

        <form className="space-y-5" onSubmit={handleSignup}>
          {/* NAME */}
          <div>
            <label className="text-sm font-medium text-gray-600 block mb-1">
              Full Name
            </label>
            <input
              type="text"
              placeholder="John Doe"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-600 transition text-black"
              required
            />
          </div>

          {/* EMAIL */}
          <div>
            <label className="text-sm font-medium text-gray-600 block mb-1">
              Email Address
            </label>
            <input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-600 transition text-black"
              required
            />
          </div>

          {/* PASSWORD */}
          <div className="relative">
            <label className="text-sm font-medium text-gray-600 block mb-1">
              Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-600 transition pr-12 text-black"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute top-[42px] right-3 flex items-center justify-center text-gray-400 hover:text-purple-600 transition"
            >
              {showPassword ? <HiEyeOff className="w-5 h-5" /> : <HiEye className="w-5 h-5" />}
            </button>
          </div>

          {/* ROLE */}
          <div>
            <label className="text-sm font-medium text-gray-600 block mb-1">
              I am a...
            </label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-600 transition text-black"
            >
              <option value="student" className="text-black">Student</option>
              <option value="admin" className="text-black">Admin</option>
            </select>
          </div>

          {/* BUTTON */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl bg-purple-600 text-white font-semibold text-lg hover:scale-[1.02] hover:shadow-lg transition-all duration-300 flex items-center justify-center disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {loading ? (
              <span className="loading loading-spinner loading-md"></span>
            ) : (
              "Create Account"
            )}
          </button>
        </form>

        <div className="text-center mt-6">
          <p className="text-sm text-gray-600">
            Already have an account?{" "}
            <Link to="/login" className="text-purple-600 font-bold hover:underline">
              Login
            </Link>
          </p>
        </div>

        {/* FOOTER */}
        <p className="text-center text-xs text-gray-500 mt-6">
          © {new Date().getFullYear()} IMS • All rights reserved
        </p>
      </div>
    </div>
  );
};

export default Signup;
