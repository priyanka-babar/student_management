import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
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
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const navigate = useNavigate();
  // Fetch countries from backend
  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const res = await axios.get("http://localhost:3000/api/location/countries");
        setCountries(res.data);
      } catch (err) {
        console.error("Failed to fetch countries", err);
      }
    };
    fetchCountries();
  }, []);
  // Update states when country changes
  useEffect(() => {
    if (form.country) {
      const selectedCountry = countries.find(c => c.name === form.country);
      setStates(selectedCountry ? selectedCountry.states : []);
      setForm(prev => ({ ...prev, state: "", city: "" }));
      setCities([]);
    }
  }, [form.country, countries]);
  // Update cities when state changes
  useEffect(() => {
    if (form.state) {
      const selectedState = states.find(s => s.name === form.state);
      setCities(selectedState ? selectedState.cities : []);
      setForm(prev => ({ ...prev, city: "" }));
    }
  }, [form.state, states]);
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const validatePassword = (password) => {
    const strongRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    return strongRegex.test(password);
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validatePassword(form.password)) {
      alert(
        "Password must be at least 8 characters long, include uppercase, lowercase, number, and special character."
      );
      return;
    }
    if (form.password !== form.confirmPassword) {

      alert("Passwords do not match!");
      return;
    }
    try {
      const { data } = await axios.post(
        "http://localhost:3000/api/users/register",
        form
      );
      alert(data.message || "Registration successful!");
      navigate("/register-list");
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
      alert(err.response?.data?.message || "Something went wrong!");
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
        <label className="block font-medium mb-1">Name</label>
        <input
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          className="w-full border rounded-md p-2 mb-4"
          required
        />
        {/* Education */}
        <label className="block font-medium mb-1">Education</label>
        <input
          type="text"
          name="education"
          value={form.education}
          onChange={handleChange}
          className="w-full border rounded-md p-2 mb-4"
          required
        />
        {/* Country */}
        <label className="block font-medium mb-1">Country</label>
        <select
          name="country"
          value={form.country}
          onChange={handleChange}
          className="w-full border rounded-md p-2 mb-4"
          required
        >
          <option value="">-- Select Country --</option>
          {countries.map(c => (
            <option key={c.id} value={c.name}>{c.name}</option>
          ))}
        </select>
        {/* State */}
        <label className="block font-medium mb-1">State</label>
        <select
          name="state"
          value={form.state}
          onChange={handleChange}
          className="w-full border rounded-md p-2 mb-4"
          required
          disabled={!states.length}
        >
          <option value="">-- Select State --</option>
          {states.map(s => (
            <option key={s.name} value={s.name}>{s.name}</option>
          ))}
        </select>
        {/* City */}
        <label className="block font-medium mb-1">City</label>
        <select
          name="city"
          value={form.city}
          onChange={handleChange}
          className="w-full border rounded-md p-2 mb-4"
          required
          disabled={!cities.length}
        >
          <option value="">-- Select City --</option>
          {cities.map(c => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
        {/* Username */}
        <label className="block font-medium mb-1">Username</label>
        <input
          type="text"
          name="userName"
          value={form.userName}
          onChange={handleChange}
          className="w-full border rounded-md p-2 mb-4"
          required
        />
        {/* Email */}
        <label className="block font-medium mb-1">Email</label>
        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          className="w-full border rounded-md p-2 mb-4"
          required
        />
        {/* Password */}
        <label className="block font-medium mb-1">Password</label>
        <input
          type="password"
          name="password"
          value={form.password}
          onChange={handleChange}
          className="w-full border rounded-md p-2 mb-4"
          required
        />
        {/* Confirm Password */}
        <label className="block font-medium mb-1">Confirm Password</label>
        <input
          type="password"
          name="confirmPassword"
          value={form.confirmPassword}
          onChange={handleChange}
          className="w-full border rounded-md p-2 mb-6"
          required
        />
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

// import { useState, useEffect } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// export default function RegistrationForm() {
//   const [form, setForm] = useState({
//     name: "",
//     education: "",
//     country: "",
//     state: "",
//     city: "",
//     userName: "",
//     email: "",
//     password: "",
//     confirmPassword: "",
//   });

//   const [countries, setCountries] = useState([]);
//   const [states, setStates] = useState([]);
//   const [cities, setCities] = useState([]);

//   const navigate = useNavigate();

//   // Fetch Countries from Backend
//   useEffect(() => {
//     axios
//       .get("http://localhost:3000/api/location/countries")
//       .then((res) => {
//         console.log("Countries:", res.data);
//         setCountries(res.data);
//       })
//       .catch((err) => console.error("Error fetching countries:", err));
//   }, []);

//   // Handle Country Change
//   const handleCountryChange = (e) => {
//     const selectedCountry = e.target.value;

//     const countryObj = countries.find((c) => c.name === selectedCountry);

//     setForm({ ...form, country: selectedCountry, state: "", city: "" });

//     setStates(countryObj ? countryObj.states : []);
//     setCities([]);
//   };

//   // Handle State Change
//   const handleStateChange = (e) => {
//     const selectedState = e.target.value;

//     const stateObj = states.find((s) => s.name === selectedState);

//     setForm({ ...form, state: selectedState, city: "" });

//     setCities(stateObj ? stateObj.cities : []);
//   };

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   return (
//     <div className="flex items-center justify-center min-h-screen bg-gray-100">
//       <form className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
//         <h2 className="text-2xl font-bold mb-6 text-center">Registration Form</h2>

//         {/* Name */}
//         <label className="block font-medium mb-1">Name</label>
//         <input
//           type="text"
//           name="name"
//           className="w-full border rounded-md p-2 mb-4"
//           value={form.name}
//           onChange={handleChange}
//           required
//         />

//         {/* Education */}
//         <label className="block font-medium mb-1">Education</label>
//         <input
//           type="text"
//           name="education"
//           className="w-full border rounded-md p-2 mb-4"
//           value={form.education}
//           onChange={handleChange}
//           required
//         />

//         {/* Country Dropdown */}
//         <label className="block font-medium mb-1">Country</label>
//         <select
//           className="w-full border p-2 rounded mb-4"
//           value={form.country}
//           onChange={handleCountryChange}
//           required
//         >
//           <option value="">-- Select Country --</option>
//           {countries.map((c) => (
//             <option key={c.id} value={c.name}>
//               {c.name}
//             </option>
//           ))}
//         </select>

//         {/* State Dropdown */}
//         <label className="block font-medium mb-1">State</label>
//         <select
//           className="w-full border p-2 rounded mb-4"
//           value={form.state}
//           onChange={handleStateChange}
//           required
//         >
//           <option value="">-- Select State --</option>
//           {states.map((s, i) => (
//             <option key={i} value={s.name}>
//               {s.name}
//             </option>
//           ))}
//         </select>

//         {/* City Dropdown */}
//         <label className="block font-medium mb-1">City</label>
//         <select
//           className="w-full border p-2 rounded mb-4"
//           name="city"
//           value={form.city}
//           onChange={handleChange}
//           required
//         >
//           <option value="">-- Select City --</option>
//           {cities.map((c, i) => (
//             <option key={i} value={c}>
//               {c}
//             </option>
//           ))}
//         </select>

//         {/* Username */}
//         <label className="block font-medium mb-1">Username</label>
//         <input
//           type="text"
//           name="userName"
//           className="w-full border rounded-md p-2 mb-4"
//           value={form.userName}
//           onChange={handleChange}
//           required
//         />

//         {/* Email */}
//         <label className="block font-medium mb-1">Email</label>
//         <input
//           type="email"
//           name="email"
//           className="w-full border rounded-md p-2 mb-4"
//           value={form.email}
//           onChange={handleChange}
//           required
//         />

//         {/* Password */}
//         <label className="block font-medium mb-1">Password</label>
//         <input
//           type="password"
//           name="password"
//           className="w-full border rounded-md p-2 mb-4"
//           value={form.password}
//           onChange={handleChange}
//           required
//         />

//         {/* Confirm Password */}
//         <label className="block font-medium mb-1">Confirm Password</label>
//         <input
//           type="password"
//           name="confirmPassword"
//           className="w-full border rounded-md p-2 mb-6"
//           value={form.confirmPassword}
//           onChange={handleChange}
//           required
//         />

//         {/* Submit */}
//         <button
//           type="submit"
//           className="w-full bg-blue-600 text-white py-2 rounded-md font-semibold hover:bg-blue-700"
//         >
//           Register
//         </button>
//       </form>
//     </div>
//   );
// }




