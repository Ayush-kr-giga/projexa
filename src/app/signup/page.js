"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function SignupPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

//   useEffect(() => {
    
//     const existingUsers = localStorage.getItem("projexa-users");
//     if (!existingUsers) {
//       localStorage.setItem(
//         "projexa-users",
//         JSON.stringify([
//           {
//             username: "ayush",
//             password: "123456",
//             projects: [],
//           },
//         ])
//       );
//     }
//   }, []);

  const handleSignup = (e) => {
    e.preventDefault();

    if (!username.trim() || !password.trim()) {
      alert("Username and password are required.");
      return;
    }

    const users = JSON.parse(localStorage.getItem("projexa-users")) || [];

    const userExists = users.some((u) => u.username === username);
    if (userExists) {
      alert("User already exists. Please log in instead.");
      return;
    }

    const newUser = {
      username,
      password,
      projects: [],
    };

    const updatedUsers = [...users, newUser];
    localStorage.setItem("projexa-users", JSON.stringify(updatedUsers));

    alert("Account created! Please log in.");
    router.push("/login");
  };

  return (
    <main className="min-h-screen flex items-center justify-center px-4">
      <form
        onSubmit={handleSignup}
        className="w-full max-w-sm bg-white p-6 rounded shadow-md"
      >
        <h2 className="text-2xl font-bold text-center text-indigo-600 mb-6">
          Sign Up for Projexa
        </h2>

        <input
          type="text"
          placeholder="Choose a username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full mb-4 px-4 py-2 border rounded"
        />

        <input
          type="password"
          placeholder="Choose a password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full mb-6 px-4 py-2 border rounded"
        />

        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700"
        >
          Sign Up
        </button>
      </form>
    </main>
  );
}
