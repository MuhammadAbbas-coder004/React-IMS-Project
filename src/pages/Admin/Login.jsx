import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { collection, query, where, getDocs } from "firebase/firestore";
import { auth, db } from "../../config/firebaseconfig/firebaseconfig";
import { useNavigate, Link } from "react-router";
import { HiEye, HiEyeOff } from "react-icons/hi";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();
    setError("");
    setLoading(true);

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      const q = query(collection(db, "users"), where("email", "==", user.email));
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        setError("User data not found in Firestore");
        return;
      }

      const userData = querySnapshot.docs[0].data();

      userData.role.toLowerCase() === "admin"
        ? navigate("/")
        : navigate("/profile");
    } catch (err) {
      console.error(err);
      setError(err.message || "Login failed. Check email and password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl p-8 animate-fadeIn">
        {/* LOGO */}
        <div className="text-center mb-6">
          <h1 className="text-4xl font-black text-indigo-600 tracking-wide">IMS</h1>
          <p className="text-gray-500 mt-1 text-sm">Student & Admin Portal</p>
        </div>

        {error && (
          <div className="bg-red-100 text-red-700 px-4 py-2 rounded-lg mb-4 text-sm text-center">
            {error}
          </div>
        )}

        <form className="space-y-5" onSubmit={handleLogin}>

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
              className="w-full px-4 py-3 rounded-xl border border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-600 transition text-black"
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
              className="w-full px-4 py-3 rounded-xl border border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-600 transition pr-12 text-black"
              required
            />
            {/* EYE ICON - ADJUSTED VERTICAL POSITION */}
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute top-[50%] translate-y-[-50%] right-3 flex items-center justify-center text-gray-400 hover:text-indigo-500 transition"
            >
              {showPassword ? <HiEyeOff className="w-5 h-5" /> : <HiEye className="w-5 h-5" />}
            </button>
          </div>

          {/* BUTTON */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl bg-indigo-600 text-white font-semibold text-lg hover:scale-[1.02] hover:shadow-lg transition-all duration-300 flex items-center justify-center disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {loading ? (
              <span className="loading loading-spinner loading-md"></span>
            ) : (
              "Login"
            )}
          </button>
        </form>

        <div className="text-center mt-6">
          <p className="text-sm text-gray-600">
            Don't have an account?{" "}
            <Link to="/signup" className="text-indigo-600 font-bold hover:underline">
              Create Account
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

export default Login;
