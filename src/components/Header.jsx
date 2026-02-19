import React from "react";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="bg-black text-white flex justify-between items-center p-4 shadow">
      <h1 className="text-xl font-bold">YouBloom Explorer</h1>
      <nav>
        <Link to="/" className="text-red hover:text-white mr-4">
          Home
        </Link>
        <Link to="/main" className="text-red hover:text-white">
          Dashboard
        </Link>
      </nav>
    </header>
  );
}