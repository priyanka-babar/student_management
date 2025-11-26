import React, { useState } from "react";

const Registation = () => {
  const [name, setName] = useState("");
  const [Eduction, setEduction] = useState("");
  const [country, setCountry] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({
      name,
      Eduction,
      country,
      state,
      city,
      userName,
      password,
      confirmpassword,
      email,
    });
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100 p-6">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-xl bg-white rounded-2xl shadow-xl p-8 space-y-6"
      >
        <h2 className="text-3xl font-bold text-center text-indigo-700">
          Register Account
        </h2>

        {/* Grid Inputs */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Name */}
          <InputField label="Name" type="text" placeholder="Enter Name" onChange={(e) => setName(e.target.value)} />

          {/* Education */}
          <InputField label="Education" type="text" placeholder="Enter Education" onChange={(e) => setEduction(e.target.value)} />

          {/* Country */}
          <InputField label="Country" type="text" placeholder="Enter Country" onChange={(e) => setCountry(e.target.value)} />

          {/* State */}
          <InputField label="State" type="text" placeholder="Enter State" onChange={(e) => setState(e.target.value)} />

          {/* City */}
          <InputField label="City" type="text" placeholder="Enter City" onChange={(e) => setCity(e.target.value)} />

          {/* Username */}
          <InputField label="Username" type="text" placeholder="Enter Username" onChange={(e) => setUserName(e.target.value)} />

          {/* Password */}
          <InputField label="Password" type="password" placeholder="Enter Password" onChange={(e) => setPassword(e.target.value)} />

          {/* Confirm Password */}
          <InputField label="Confirm Password" type="password" placeholder="Confirm Password" onChange={(e) => setConfirmPassword(e.target.value)} />
        </div>

        {/* Email - Full Width */}
        <InputField label="Email" type="email" placeholder="Enter Email" onChange={(e) => setEmail(e.target.value)} />

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg shadow-lg transition-all"
        >
          Save
        </button>
      </form>
    </div>
  );
};

export default Registation;

/* ------------ Reusable Input Component ------------ */
const InputField = ({ label, type, placeholder, onChange }) => (
  <div className="space-y-1">
    <label className="text-sm font-medium text-gray-700">{label}</label>
    <input
      type={type}
      placeholder={placeholder}
      onChange={onChange}
      className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
    />
  </div>
);
