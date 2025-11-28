

import { useEffect, useState } from "react";
import axios from "axios";
export default function RegisterList({ refreshListTrigger }) {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [editUser, setEditUser] = useState(null);
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  // Fetch users
  const fetchUsers = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/users/getlist");
      setUsers(response.data.data);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch users");
    } finally {
      setLoading(false);
    }
  };
  // Fetch countries
  const fetchCountries = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/location/countries");
      setCountries(res.data);
    } catch (err) {
      console.error("Failed to fetch countries", err);
    }
  };
  // Initial fetch
  useEffect(() => {
    fetchUsers();
    fetchCountries();
  }, [refreshListTrigger]); // refresh after register
  // Delete user
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete?")) return;
    try {
      await axios.delete(`http://localhost:3000/api/users/delete-user/${id}`);
      alert("User deleted!");
      fetchUsers();
    } catch (err) {
      console.error(err);
      alert("Delete failed");
    }
  };
  // Update user
  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!editUser) return;
    try {
      await axios.put(`http://localhost:3000/api/users/edit-user/${editUser.id}`, editUser);
      alert("User updated!");
      setEditUser(null);
      fetchUsers();
    } catch (err) {
      console.error(err);
      alert("Update failed");
    }
  };
  // Handle cascading dropdowns in Edit Modal
  const handleCountryChange = (e) => {
    const selectedCountry = e.target.value;
    const countryObj = countries.find((c) => c.name === selectedCountry);
    setEditUser({ ...editUser, country: selectedCountry, state: "", city: "" });
    setStates(countryObj ? countryObj.states : []);
    setCities([]);
  };
  const handleStateChange = (e) => {
    const selectedState = e.target.value;
    const stateObj = states.find((s) => s.name === selectedState);
    setEditUser({ ...editUser, state: selectedState, city: "" });
    setCities(stateObj ? stateObj.cities : []);
  };
  if (loading) return <p>Loading users...</p>;
  if (error) return <p>{error}</p>;
  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Registered Users</h2>
      <table className="w-full border-collapse border">
        <thead>
          <tr className="bg-gray-200">
            <th className="border px-2 py-1">ID</th>
            <th className="border px-2 py-1">Name</th>
            <th className="border px-2 py-1">Username</th>
            <th className="border px-2 py-1">Email</th>
            <th className="border px-2 py-1">City</th>
            <th className="border px-2 py-1">Country</th>
            <th className="border px-2 py-1">Education</th>
            <th className="border px-2 py-1">State</th>
            <th className="border px-2 py-1">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id} className="text-center">
              <td className="border px-2 py-1">{user.id}</td>
              <td className="border px-2 py-1">{user.name}</td>
              <td className="border px-2 py-1">{user.userName}</td>
              <td className="border px-2 py-1">{user.email}</td>
              <td className="border px-2 py-1">{user.city}</td>
              <td className="border px-2 py-1">{user.country}</td>
              <td className="border px-2 py-1">{user.education}</td>
              <td className="border px-2 py-1">{user.state}</td>
              <td className="border px-2 py-1 flex gap-2 justify-center">
                <button
                  className="bg-blue-500 text-white px-3 py-1 rounded"
                  onClick={() => {
                    setEditUser(user);
                    const countryObj = countries.find(c => c.name === user.country);
                    setStates(countryObj ? countryObj.states : []);
                    const stateObj = countryObj?.states.find(s => s.name === user.state);
                    setCities(stateObj ? stateObj.cities : []);
                  }}
                >
                  Edit
                </button>
                <button
                  className="bg-red-500 text-white px-3 py-1 rounded"
                  onClick={() => handleDelete(user.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* EDIT MODAL */}
      {editUser && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg w-96 shadow-xl">
            <h2 className="text-xl font-bold mb-4">Edit User</h2>
            <form onSubmit={handleUpdate} className="space-y-2">
              <input type="text" className="w-full border p-2 rounded" value={editUser.id} disabled />
              <input type="text" className="w-full border p-2 rounded" value={editUser.name} onChange={(e) => setEditUser({ ...editUser, name: e.target.value })} />
              <input type="text" className="w-full border p-2 rounded" value={editUser.userName} onChange={(e) => setEditUser({ ...editUser, userName: e.target.value })} />
              <input type="email" className="w-full border p-2 rounded" value={editUser.email} onChange={(e) => setEditUser({ ...editUser, email: e.target.value })} />
              {/* Country */}
              <select className="w-full border p-2 rounded" value={editUser.country || ""} onChange={handleCountryChange}>
                <option value="">-- Select Country --</option>
                {countries.map((c) => (
                  <option key={c.id} value={c.name}>{c.name}</option>
                ))}
              </select>
              {/* State */}
              <select className="w-full border p-2 rounded" value={editUser.state || ""} onChange={handleStateChange}>
                <option value="">-- Select State --</option>
                {states.map((s, i) => (
                  <option key={i} value={s.name}>{s.name}</option>
                ))}
              </select>
              {/* City */}
              <select className="w-full border p-2 rounded" value={editUser.city || ""} onChange={(e) => setEditUser({ ...editUser, city: e.target.value })}>
                <option value="">-- Select City --</option>
                {cities.map((c, i) => (
                  <option key={i} value={c}>{c}</option>
                ))}
              </select>
              <input type="text" className="w-full border p-2 rounded" value={editUser.education} onChange={(e) => setEditUser({ ...editUser, education: e.target.value })} />
              <div className="flex justify-between mt-4">
                <button type="button" className="bg-gray-500 text-white px-4 py-1 rounded" onClick={() => setEditUser(null)}>Cancel</button>
                <button type="submit" className="bg-green-600 text-white px-4 py-1 rounded">Update</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

