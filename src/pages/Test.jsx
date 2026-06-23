import React, { useState } from "react";

const Test = () => {
  const [student, setStudent] = useState({
    name: "",
    enrollmentNumber: "",
    email: "",
    mobileNumber: "",
    branch: "",
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setStudent({
      ...student,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  setMessage("");

  try {
    const response = await fetch("http://localhost:8080/api/students", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(student),
    });

    const responseData = await response.text();

    console.log("Status:", response.status);
    console.log("Backend response:", responseData);

    if (response.ok) {
      setMessage("Student account created successfully!");

      setStudent({
        name: "",
        enrollmentNumber: "",
        email: "",
        mobileNumber: "",
        branch: "",
      });
    } else {
      setMessage(`Failed: ${responseData}`);
    }
  } catch (error) {
    console.error("Connection error:", error);
    setMessage("Backend server is not running or connection failed.");
  }
};

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-[80%] min-h-[80vh] bg-[#fdf5e6] rounded-xl flex justify-center items-center shadow-lg">
        <form
          onSubmit={handleSubmit}
          className="w-[400px] p-6 bg-white rounded-lg shadow"
        >
          <h2 className="text-2xl font-bold mb-4 text-center">
            Student Registration System
          </h2>

          {message && (
            <p className="text-center mb-4 text-sm text-green-600">
              {message}
            </p>
          )}

          <input
            type="text"
            name="name"
            value={student.name}
            onChange={handleChange}
            placeholder="Name"
            required
            className="w-full p-3 border rounded mb-4"
          />

          <input
            type="text"
            name="enrollmentNumber"
            value={student.enrollmentNumber}
            onChange={handleChange}
            placeholder="Enrollment Number"
            required
            className="w-full p-3 border rounded mb-4"
          />

          <input
            type="email"
            name="email"
            value={student.email}
            onChange={handleChange}
            placeholder="Email"
            required
            className="w-full p-3 border rounded mb-4"
          />

          <input
            type="tel"
            name="mobileNumber"
            value={student.mobileNumber}
            onChange={handleChange}
            placeholder="Mobile Number"
            required
            className="w-full p-3 border rounded mb-4"
          />

          <input
            type="text"
            name="branch"
            value={student.branch}
            onChange={handleChange}
            placeholder="Branch (CSE, ECE, EEE)"
            required
            className="w-full p-3 border rounded mb-4"
          />

          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white p-3 rounded transition"
          >
            Create Account
          </button>
        </form>
      </div>
    </div>
  );
};

export default Test;