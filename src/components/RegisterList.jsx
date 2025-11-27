// import { useEffect, useState } from "react";
// import axios from "axios";

// export default function UsersList() {
//   const [users, setUsers] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   useEffect(() => {
//     const fetchUsers = async () => {
//       try {
//         const response = await axios.get("http://localhost:3000/api/users");
//         setUsers(response.data); // backend GET /api/users should return array
//       } catch (err) {
//         console.error(err);
//         setError("Failed to fetch users");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchUsers();
//   }, []);

//   if (loading) return <p>Loading users...</p>;
//   if (error) return <p>{error}</p>;

//   return (
//     <div className="p-4">
//       <h2 className="text-2xl font-bold mb-4">Registered Users</h2>
//       <table className="w-full border-collapse border">
//         <thead>
//           <tr className="bg-gray-200">
//             <th className="border px-2 py-1">Name</th>
//             <th className="border px-2 py-1">Username</th>
//             <th className="border px-2 py-1">Email</th>
//             <th className="border px-2 py-1">City</th>
//             <th className="border px-2 py-1">Country</th>
//             <th className="border px-2 py-1">Education</th>
//           </tr>
//         </thead>
//         <tbody>
//           {users.map((user) => (
//             <tr key={user.id} className="text-center">
//               <td className="border px-2 py-1">{user.name}</td>
//               <td className="border px-2 py-1">{user.userName}</td>
//               <td className="border px-2 py-1">{user.email}</td>
//               <td className="border px-2 py-1">{user.city}</td>
//               <td className="border px-2 py-1">{user.country}</td>
//               <td className="border px-2 py-1">{user.education}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// }
import { useEffect, useState } from "react";
import axios from "axios";

export default function RegisterList() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/users/getlist");
        setUsers(response.data.data); // backend GET /api/users should return array
      } catch (err) {
        console.error(err);
        setError("Failed to fetch users");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) return <p>Loading users...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Registered Users</h2>
      <table className="w-full border-collapse border">
        <thead>
          <tr className="bg-gray-200">
            <th className="border px-2 py-1">Name</th>
            <th className="border px-2 py-1">Username</th>
            <th className="border px-2 py-1">Email</th>
            <th className="border px-2 py-1">City</th>
            <th className="border px-2 py-1">Country</th>
            <th className="border px-2 py-1">Education</th>
            <th className="border px-2 py-1">State</th>
            <th className="border px-2 py-1">Password</th>
            {/* <th className="border px-2 py-1">Confirm Password</th> */}




          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id} className="text-center">
              <td className="border px-2 py-1">{user.name}</td>
              <td className="border px-2 py-1">{user.userName}</td>
              <td className="border px-2 py-1">{user.email}</td>
              <td className="border px-2 py-1">{user.city}</td>
              <td className="border px-2 py-1">{user.country}</td>
              <td className="border px-2 py-1">{user.education}</td>
              <td className="border px-2 py-1">{user.state}</td>
              <td className="border px-2 py-1">{user.password}</td>
              {/* <td className="border px-2 py-1">{user.confirmpassword}</td> */}


            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
