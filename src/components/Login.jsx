import { useState } from "react";
import axios from "axios";

export default function Login() {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.post(
        "http://localhost:3000/api/users/login",
        {
          email: form.email,
          password: form.password,
        }
      );

      alert("Login Successful!");

      // Save token in localStorage
      localStorage.setItem("token", data.data.token);

      console.log("TOKEN:", data.data.token);

    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>

        {/* Email */}
        <label className="block font-medium mb-1">Email</label>
        <input
          type="email"
          name="email"
          onChange={handleChange}
          className="w-full border rounded-md p-2 mb-4"
          placeholder="Enter email"
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
