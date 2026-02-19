import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function DetailPage() {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch(
          `https://jsonplaceholder.typicode.com/users/${id}`
        );
        if (!res.ok) throw new Error("Failed to fetch user details");
        const data = await res.json();
        setUser(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, [id]);

  if (loading) return <p className="p-8 text-white">Loading...</p>;
  if (error) return <p className="p-8 text-red-500">{error}</p>;
  if (!user) return null;

  return (
    <div className="p-8 min-h-screen bg-black text-white">
      <button
        onClick={() => navigate(-1)}
        className="mb-6 px-4 py-2 bg-gray-700 rounded hover:bg-gray-600"
      >
        Back
      </button>
      <h1 className="text-3xl font-bold mb-4">{user.name}</h1>
      <p className="mb-2">
        <strong>Email:</strong> {user.email}
      </p>
      <p className="mb-2">
        <strong>Phone:</strong> {user.phone}
      </p>
      <p className="mb-2">
        <strong>Website:</strong> {user.website}
      </p>
      <p className="mb-2">
        <strong>Company:</strong> {user.company.name}
      </p>
      <p className="mb-2">
        <strong>Address:</strong> {user.address.street}, {user.address.city}
      </p>
    </div>
  );
}