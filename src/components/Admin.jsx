import { useState } from "react";

export default function Admin() {
  const [form, setForm] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Login successful!");
    console.log("User Login:", form);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-6 text-center"> Admin Login</h2>

        {/* Username */}
        <label className="block font-medium mb-1">Username</label>
        <input
          type="text"
          name="username"
          onChange={handleChange}
          className="w-full border rounded-md p-2 mb-4"
          placeholder="Enter username"
          required
        />

        {/* Password */}
        <label className="block font-medium mb-1">Password</label>
        <input
          type="password"
          name="password"
          onChange={handleChange}
          className="w-full border rounded-md p-2 mb-6"
          placeholder="Enter password"
          required
        />

        {/* Login Button */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-md font-semibold hover:bg-blue-700"
        >
          Login
        </button>
      </form>
    </div>
  );
}