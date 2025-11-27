import { NavLink } from "react-router-dom";

export default function Navbar() {
  const activeClass =
    "bg-white text-blue-600 px-4 py-1 rounded font-semibold";
  const normalClass = "hover:bg-blue-700 px-4 py-1 rounded";

  return (
    <nav className="bg-blue-600 text-white px-6 py-4 flex gap-4 shadow-md">
      <NavLink
        to="/admin"
        className={({ isActive }) => (isActive ? activeClass : normalClass)}
      >
        Admin
      </NavLink>

      <NavLink
        to="/register"
        className={({ isActive }) => (isActive ? activeClass : normalClass)}
      >
        Register
      </NavLink>

      <NavLink
        to="/login"
        className={({ isActive }) => (isActive ? activeClass : normalClass)}
      >
        Login
      </NavLink>
    </nav>
  );
}
