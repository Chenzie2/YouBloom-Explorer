import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    if (!phone.startsWith("+254") || phone.length < 13) {
      setError("Enter a valid phone number starting with +254");
      return;
    }
    setError("");
    navigate("/main");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white px-4">
      <h1 className="text-3xl font-bold mb-8">YouBloom Explorer Login</h1>
      <input
        type="text"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        placeholder="+254712345678"
        className="mb-4 p-3 rounded w-full max-w-sm text-black"
      />
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <button
        onClick={handleLogin}
        className="bg-red-600 hover:bg-red-700 px-6 py-3 rounded text-white font-semibold"
      >
        Login
      </button>
    </div>
  );
}