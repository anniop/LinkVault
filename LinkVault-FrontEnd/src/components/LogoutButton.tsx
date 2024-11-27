import React from 'react';
import { useNavigate } from 'react-router-dom';
export function LogoutButton() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("authToken"); // Replace with the actual key used for storing the token
    sessionStorage.removeItem("authToken"); // If you're using sessionStorage, clear it as well

    navigate("/signin");
  };

  return (
    <button onClick={handleLogout} className="bg-red-500 text-white p-2 rounded-md hover:bg-red-600 transition">
      Logout
    </button>
  );
}
