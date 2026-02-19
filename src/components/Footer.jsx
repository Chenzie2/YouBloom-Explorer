import React from "react";

export default function Footer() {
  return (
    <footer className="bg-black text-white p-6 text-center">
      <p>
        &copy; {new Date().getFullYear()} YouBloom Explorer. All rights reserved.
      </p>
      <p>
        Powered by React, Tailwind CSS, and passion for live music experiences.
      </p>
    </footer>
  );
}