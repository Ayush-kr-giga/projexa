"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";

export default function Dashboard() {
  const { currentUser, setCurrentUser } = useAuth();
  const [projects, setProjects] = useState([]);
  const [newProjectTitle, setNewProjectTitle] = useState("");

  useEffect(() => {
    if (currentUser?.projects) {
      const updatedProjects = currentUser.projects.map((project) => {
        const isCompleted =
          project.tasks.length > 0 &&
          project.tasks.every((task) => task.status === "completed");
        return { ...project, completed: isCompleted };
      });
      setProjects(updatedProjects);
    }
  }, [currentUser]);

  if (!currentUser) {
    return (
      <p className="p-4 text-red-600">
        Please login to view your dashboard.
      </p>
    );
  }

  const totalProjects = projects.length;
  const completedProjects = projects.filter((p) => p.completed).length;
  const ongoingProjects = projects.filter((p) => !p.completed);

  const handleAddProject = () => {
    if (!newProjectTitle.trim()) return;
    const newProject = {
      id: `p${Date.now()}`,
      title: newProjectTitle,
      tasks: [],
    };
    const updatedUser = {
      ...currentUser,
      projects: [...currentUser.projects, newProject],
    };
    setCurrentUser(updatedUser);
    localStorage.setItem("projexa-user", JSON.stringify(updatedUser));
    setNewProjectTitle("");
  };

  return (
    <div className="p-4 sm:p-6 md:p-8 max-w-6xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-3xl sm:text-4xl font-bold text-indigo-700">
          Welcome, {currentUser.username}
        </h1>
        <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
          <input
            type="text"
            placeholder="New Project Title"
            value={newProjectTitle}
            onChange={(e) => setNewProjectTitle(e.target.value)}
            className="border border-gray-300 rounded-md p-2 w-full sm:w-64"
          />
          <button
            onClick={handleAddProject}
            className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 w-full sm:w-auto"
          >
            Add Project
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="bg-white border-l-4 border-indigo-500 p-6 rounded-xl shadow">
          <p className="text-xl font-semibold text-gray-700">
            Total Projects
          </p>
          <p className="text-3xl font-bold text-indigo-700">{totalProjects}</p>
        </div>
        <div className="bg-white border-l-4 border-green-500 p-6 rounded-xl shadow">
          <p className="text-xl font-semibold text-gray-700">
            Completed Projects
          </p>
          <p className="text-3xl font-bold text-green-600">
            {completedProjects}
          </p>
        </div>
      </div>

      {/* Ongoing Projects */}
      <div>
        <h2 className="text-2xl font-bold text-indigo-600 border-b pb-2 mb-4">
          Ongoing Projects
        </h2>
        {ongoingProjects.length === 0 ? (
          <p className="text-gray-500">No ongoing projects.</p>
        ) : (
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {ongoingProjects.map((project) => (
              <li
                key={project.id}
                className="bg-indigo-50 p-4 rounded-xl shadow hover:shadow-md transition"
              >
                <Link
                  href={`/project/${project.id}`}
                  className="text-lg font-semibold text-indigo-700 hover:underline"
                >
                  {project.title}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Completed Projects */}
      <div>
        <h2 className="text-2xl font-bold text-green-600 border-b pb-2 mb-4">
          Completed Projects
        </h2>
        {completedProjects === 0 ? (
          <p className="text-gray-500">No completed projects.</p>
        ) : (
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {projects
              .filter((project) => project.completed)
              .map((project) => (
                <li
                  key={project.id}
                  className="bg-green-50 p-4 rounded-xl shadow hover:shadow-md transition"
                >
                  <Link
                    href={`/project/${project.id}`}
                    className="text-lg font-semibold text-green-700 hover:underline"
                  >
                    {project.title}
                  </Link>
                </li>
              ))}
          </ul>
        )}
      </div>
    </div>
  );
}
