import { useEffect, useState } from "react";
import axios from "axios";

export default function LoginList() {
    const [list, setList] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchList();
    }, []);

    const fetchList = async () => {
        try {
            const { data } = await axios.get(
                "http://localhost:3000/api/users/login-list"
            );

            setList(data.data); // backend gives data.data
            setLoading(false);
        } catch (err) {
            console.error(err);
            alert("Failed to fetch login list");
            setLoading(false);
        }
    };

    if (loading) return <h2>Loading...</h2>;

    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">Login User List</h2>
            <table className="w-full border">
                <thead>
                    <tr>
                        <th className="border p-2">ID</th>
                        <th className="border p-2">Email</th>
                        {/* <th className="border p-2">Role</th> */}
                    </tr>
                </thead>

                <tbody>
                    {list.map((user) => (
                        <tr key={user.id}>
                            <td className="border p-2">{user.id}</td>
                            <td className="border p-2">{user.email}</td>
                            {/* <td className="border p-2">{user.role}</td> */}
                        </tr>
                    ))}
                </tbody>
            </table>

        </div>
    );
}
