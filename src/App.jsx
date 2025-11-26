import { useState } from "react";
import Login from "../src/components/Login";
import Register from "../src/components/Registation2";
import Admin from "../src/components/Admin";

export default function App() {
  const [page, setPage] = useState("login");

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-blue-600 text-white px-6 py-4 flex justify-between items-center shadow-md">
        <div className="flex gap-4">
          <button
            onClick={() => setPage("login")}
            className={`px-4 py-1 rounded ${
              page === "login" ? "bg-white text-blue-600" : "hover:bg-blue-700"
            }`}
          >
            Login
          </button>

          <button
            onClick={() => setPage("register")}
            className={`px-4 py-1 rounded ${
              page === "register"
                ? "bg-white text-blue-600"
                : "hover:bg-blue-700"
            }`}
          >
            Register
          </button>

          <button
            onClick={() => setPage("admin")}
            className={`px-4 py-1 rounded ${
              page === "admin"
                ? "bg-white text-blue-600"
                : "hover:bg-blue-700"
            }`}
          >
            Admin
          </button>
        </div>
      </nav>

      {/* Page Content */}
      <div className="mt-6">
        {page === "login" && <Login />}
        {page === "register" && <Register />}
        {page === "admin" && <Admin />}
      </div>
    </div>
  );
}
