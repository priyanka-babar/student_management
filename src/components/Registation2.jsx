import { useState } from "react";
import axios from "axios";

export default function RegistrationForm() {
  const [form, setForm] = useState({
    name: "",
    education: "",
    country: "",
    state: "",
    city: "",
    userName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.password !== form.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    try {
      const { data } = await axios.post(
        "http://localhost:3000/api/users/register",
        {
          name: form.name,
          education: form.education,
          country: form.country,
          state: form.state,
          city: form.city,
          userName: form.userName,
          email: form.email,
          password: form.password,
        }
      );

      alert(data.message || "Registration successful!");

      // Reset form
      setForm({
        name: "",
        education: "",
        country: "",
        state: "",
        city: "",
        userName: "",
        email: "",
        password: "",
        confirmPassword: "",
      });
    } catch (err) {
      console.error(err);
      if (err.response && err.response.data) {
        alert(err.response.data.message || "Registration failed");
      } else {
        alert("Something went wrong!");
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Registration Form</h2>

        {/* Name */}
        <label className="block font-medium mb-1">name</label>
        <input
          type="text"
          name="name"
          className="w-full border rounded-md p-2 mb-4"
          placeholder="Enter your name"
          value={form.name}
          onChange={handleChange}
          required
        />

        {/* Education */}
        <label className="block font-medium mb-1">Education</label>
        <input
          type="text"
          name="education"
          className="w-full border rounded-md p-2 mb-4"
          placeholder="Enter your education"
          value={form.education}
          onChange={handleChange}
          required
        />

        {/* Country */}
        <label className="block font-medium mb-1">Country</label>
        <input
          type="text"
          name="country"
          className="w-full border rounded-md p-2 mb-4"
          placeholder="Enter your country"
          value={form.country}
          onChange={handleChange}
          required
        />

        {/* State */}
        <label className="block font-medium mb-1">State</label>
        <input
          type="text"
          name="state"
          className="w-full border rounded-md p-2 mb-4"
          placeholder="Enter your state"
          value={form.state}
          onChange={handleChange}
          required
        />

        {/* City */}
        <label className="block font-medium mb-1">City</label>
        <input
          type="text"
          name="city"
          className="w-full border rounded-md p-2 mb-4"
          placeholder="Enter your city"
          value={form.city}
          onChange={handleChange}
          required
        />

        {/* Username */}
        <label className="block font-medium mb-1">Username</label>
        <input
          type="text"
          name="userName"
          className="w-full border rounded-md p-2 mb-4"
          placeholder="Enter your username"
          value={form.userName}
          onChange={handleChange}
          required
        />

        {/* Email */}
        <label className="block font-medium mb-1">Email</label>
        <input
          type="email"
          name="email"
          className="w-full border rounded-md p-2 mb-4"
          placeholder="Enter your email"
          value={form.email}
          onChange={handleChange}
          required
        />

        {/* Password */}
        <label className="block font-medium mb-1">Password</label>
        <input
          type="password"
          name="password"
          className="w-full border rounded-md p-2 mb-4"
          placeholder="Enter your password"
          value={form.password}
          onChange={handleChange}
          required
        />

        {/* Confirm Password */}
        <label className="block font-medium mb-1">Confirm Password</label>
        <input
          type="password"
          name="confirmPassword"
          className="w-full border rounded-md p-2 mb-6"
          placeholder="Confirm your password"
          value={form.confirmPassword}
          onChange={handleChange}
          required
        />

        {/* Submit */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-md font-semibold hover:bg-blue-700"
        >
          Register
        </button>
      </form>
    </div>
  );
}
