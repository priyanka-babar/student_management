
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Login from "./components/Login";
import Admin from "./components/Admin";
import RegistrationForm from "./components/Registation2";
import RegisterList from "./components/RegisterList"; // Admin page to show registered users
import LoginList from "./components/loginList";

export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        {/* Navbar */}
        <Navbar />

        {/* Page Content */}
        <div className="mt-6 px-6">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/login-list" element={<LoginList />} />


            <Route path="/register" element={<RegistrationForm />} />
            <Route path="/register-list" element={<RegisterList />} />

            <Route path="/admin" element={<Admin />} />
            <Route path="*" element={<Login />} /> {/* Default Route */}
          </Routes>
        </div>
      </div>
    </Router>
  );
}
