import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    const phoneRegex = /^\+254\d{9}$/;

    if (!phoneRegex.test(phone)) {
      setError("Enter a valid phone number starting with +254");
      return;
    }

    // Mock login
    localStorage.setItem("loggedIn", "true");
    navigate("/main");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-black">
      <form
        onSubmit={handleLogin}
        className="bg-gray-900 p-8 rounded shadow-md w-full max-w-sm"
      >
        <h1 className="text-2xl font-bold text-white mb-6 text-center">
          YouBloom Explorer Login
        </h1>
        <input
          type="text"
          placeholder="+254712345678"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="w-full p-3 mb-4 rounded text-black"
        />
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <button
          type="submit"
          className="w-full bg-red-600 hover:bg-red-500 text-white py-3 rounded font-semibold"
        >
          Login
        </button>
      </form>
    </div>
  );
}