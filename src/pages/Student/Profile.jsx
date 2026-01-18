import React, { useEffect, useState } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../../config/firebaseconfig/firebaseconfig";

const StudentProfile = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        setLoading(false);
        setError("Please log in first");
        return;
      }

      try {
        const email = user.email;
        console.log("🔍 Fetching profile for:", email);

        // Get Student Profile by Email
        const userQuery = query(
          collection(db, "users"),
          where("email", "==", email)
        );
        const userSnap = await getDocs(userQuery);

        if (userSnap.empty) {
          setError("Profile not found");
          setLoading(false);
          return;
        }

        const studentData = {
          id: userSnap.docs[0].id,
          ...userSnap.docs[0].data()
        };
        setProfile(studentData);
        console.log("✅ Student Profile:", studentData);

      } catch (err) {
        console.error("❌ Error:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-600 mx-auto mb-4"></div>
          <p className="text-xl text-gray-700 font-medium">Loading profile...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-3xl mx-auto mt-10 p-6 bg-red-50 rounded-xl border-2 border-red-300">
        <div className="text-center">
          <div className="text-5xl mb-4">❌</div>
          <p className="text-red-700 font-semibold text-lg">{error}</p>
        </div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="max-w-3xl mx-auto mt-10 p-6 bg-yellow-50 rounded-xl border-2 border-yellow-300">
        <div className="text-center">
          <div className="text-5xl mb-4">⚠️</div>
          <p className="text-yellow-700 font-semibold text-lg">Profile not found</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-3xl mx-auto">
        
        {/* Profile Card */}
        <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-200">
          
          {/* Header with Avatar */}
          <div className="flex items-center justify-center mb-8">
            <div className="w-24 h-24 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full flex items-center justify-center border-4 border-blue-200 shadow-lg">
              <span className="text-4xl font-bold text-white">
                {profile.name?.charAt(0).toUpperCase()}
              </span>
            </div>
          </div>

          {/* Profile Info */}
          <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
            Student Profile
          </h2>

          <div className="space-y-5">
            
            {/* Name */}
            <div className="bg-gray-50 p-5 rounded-lg border border-gray-200">
              <p className="text-sm text-gray-500 mb-2 font-medium">Name</p>
              <p className="text-xl font-semibold text-gray-800">{profile.name}</p>
            </div>

            {/* Email */}
            <div className="bg-gray-50 p-5 rounded-lg border border-gray-200">
              <p className="text-sm text-gray-500 mb-2 font-medium">Email</p>
              <p className="text-xl font-semibold text-gray-800">{profile.email}</p>
            </div>

            {/* Role */}
            <div className="bg-gray-50 p-5 rounded-lg border border-gray-200">
              <p className="text-sm text-gray-500 mb-2 font-medium">Role</p>
              <p className="text-xl font-semibold text-gray-800 capitalize">{profile.role}</p>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};

export default StudentProfile;