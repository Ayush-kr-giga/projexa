"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    const users = JSON.parse(localStorage.getItem("projexa-users")) || [];
    const user = users.find(
      (u) => u.username === username && u.password === password
    );

    if (user) {
      login(user); // 👈 This sets it in context and localStorage
      router.push("/dashboard");
    } else {
      alert("Invalid credentials.");
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center px-4">
      <form onSubmit={handleLogin} className="w-full max-w-sm bg-white p-6 rounded shadow-md">
        <h2 className="text-2xl font-bold text-center text-indigo-600 mb-6">Login to Projexa</h2>

        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full mb-4 px-4 py-2 border rounded"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full mb-6 px-4 py-2 border rounded"
        />

        <button type="submit" className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700">
          Login
        </button>
      </form>
    </main>
  );
}
