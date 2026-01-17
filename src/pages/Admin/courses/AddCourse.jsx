import React, { useState } from "react";

import { collection, addDoc } from "firebase/firestore";
import { db } from "../../../config/firebaseconfig/firebaseconfig";

const AddCourse = () => {
  const [courseName, setCourseName] = useState("");
  const [description, setDescription] = useState("");
  const [duration, setDuration] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (courseName === "" || description === "" || duration === "") {
      alert("Please fill all fields");
      return;
    }

    try {
      await addDoc(collection(db, "courses"), {
        courseName: courseName,
        description: description,
        duration: duration,
      });

      alert(`Course "${courseName}" added successfully!`);
      setCourseName("");
      setDescription("");
      setDuration("");
    } catch (err) {
      console.log("Error adding course:", err);
      alert("Failed to add course");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded shadow-md w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Add New Course</h2>

        <label>Course Name</label>
        <input
          type="text"
          value={courseName}
          onChange={(e) => setCourseName(e.target.value)}
          className="w-full border px-3 py-2 rounded mb-4"
        />

        <label>Course Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full border px-3 py-2 rounded mb-4"
        ></textarea>

        <label>Course Duration</label>
        <input
          type="text"
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
          className="w-full border px-3 py-2 rounded mb-6"
        />

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded"
        >
          Add Course
        </button>
      </form>
    </div>
  );
};

export default AddCourse;
