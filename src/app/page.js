"use client";

import Navbar from "@/components/Navbar";
import Link from "next/link";

export default function HomePage() {
  return (
    <>
      <main className="flex flex-col items-center justify-center min-h-screen px-4 py-12">
        <h1 className="text-4xl font-bold mb-4 text-center">Welcome to Projexa</h1>
        <p className="text-lg text-center max-w-xl mb-8">
          Projexa helps you organize, track, and manage your projects and tasks efficiently.
        </p>
        <div className="flex space-x-4">
          <Link
            href="/login"
            className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Login
          </Link>
          <Link
            href="/signup"
            className="px-6 py-2 border border-blue-600 text-blue-600 rounded hover:bg-blue-50"
          >
            Sign Up
          </Link>
        </div>
      </main>
    </>
  );
}

  