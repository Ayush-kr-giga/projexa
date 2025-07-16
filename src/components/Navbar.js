"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  useEffect(() => {
    const user = localStorage.getItem("projexa-user");
    setIsLoggedIn(!!user);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("projexa-user");
    setIsLoggedIn(false);
    window.location.href = "/";
  };


  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-indigo-600">
          Projexa
        </Link>

        <div className="flex space-x-6 items-center">
          <Link href="/" className="text-gray-700 hover:text-indigo-600 font-medium">
            Home
          </Link>

          <Link href="/about" className="text-gray-700 hover:text-indigo-600 font-medium">
            About
          </Link>

          <Link
            href={isLoggedIn ? "/dashboard" : "/login"}
            className="text-gray-700 hover:text-indigo-600 font-medium"
          >
            Dashboard
          </Link>

          {!isLoggedIn ? (
            <Link
              href="/login"
              className="text-indigo-600 font-semibold border border-indigo-600 px-3 py-1 rounded hover:bg-indigo-50"
            >
              Login
            </Link>
          ) : (
            <button
              onClick={handleLogout}
              className="text-red-600 font-semibold border border-red-600 px-3 py-1 rounded hover:bg-red-50"
            >
              Log Out
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
