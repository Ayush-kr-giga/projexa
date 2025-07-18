"use client";

import { useAuth } from "@/context/AuthContext";
import { useState } from "react";

export default function Dashboard() {
  const { currentUser } = useAuth();
  const [projects, setProjects] = useState(currentUser?.projects || []);

  const totalProjects = projects.length;
  const completedProjects = projects.filter(
    (p) => p.tasks.length > 0 && p.tasks.every((t) => t.status === "completed")
  ).length;

  const handleToggleTask = (projectId, taskId) => {
    const updatedProjects = projects.map((project) => {
      if (project.id === projectId) {
        const updatedTasks = project.tasks.map((task) =>
          task.id === taskId
            ? {
                ...task,
                status: task.status === "completed" ? "active" : "completed",
              }
            : task
        );
        return { ...project, tasks: updatedTasks };
      }
      return project;
    });
    setProjects(updatedProjects);
  };

  const handleAddProject = () => {
    const title = prompt("Enter project title:");
    if (!title) return;
    const newProject = {
      id: `p${Date.now()}`,
      title,
      tasks: [],
    };
    setProjects([...projects, newProject]);
  };

  const handleAddTask = (projectId) => {
    const title = prompt("Enter task title:");
    if (!title) return;
    const newTask = {
      id: `t${Date.now()}`,
      title,
      status: "active",
    };
    const updatedProjects = projects.map((project) =>
      project.id === projectId
        ? { ...project, tasks: [...project.tasks, newTask] }
        : project
    );
    setProjects(updatedProjects);
  };

  const handleMarkProjectCompleted = (projectId) => {
    const updatedProjects = projects.map((project) =>
      project.id === projectId
        ? {
            ...project,
            tasks: project.tasks.map((t) => ({ ...t, status: "completed" })),
          }
        : project
    );
    setProjects(updatedProjects);
  };

  return (
    <main className="p-6 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold text-indigo-600 mb-4">
        Welcome, {currentUser?.username}
      </h1>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-indigo-100 p-4 rounded shadow">
          <h3 className="text-sm text-gray-600">Total Projects</h3>
          <p className="text-2xl font-bold text-indigo-800">{totalProjects}</p>
        </div>
        <div className="bg-green-100 p-4 rounded shadow">
          <h3 className="text-sm text-gray-600">Completed Projects</h3>
          <p className="text-2xl font-bold text-green-800">{completedProjects}</p>
        </div>
      </div>

      <div className="mb-6 flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-800">Projects</h2>
        <button
          onClick={handleAddProject}
          className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
        >
          + Add Project
        </button>
      </div>

      {projects.map((project) => {
        const completedTasks = project.tasks.filter((t) => t.status === "completed").length;
        const totalTasks = project.tasks.length;
        const allCompleted = totalTasks > 0 && completedTasks === totalTasks;

        return (
          <div key={project.id} className="border rounded p-4 mb-6">
            <div className="flex justify-between items-center mb-3">
              <div>
                <h3 className="text-lg font-bold text-indigo-700">{project.title}</h3>
                <p className="text-sm text-gray-600">
                  {completedTasks} / {totalTasks} tasks completed
                </p>
              </div>
              <button
                onClick={() => handleAddTask(project.id)}
                className="text-sm px-3 py-1 bg-indigo-100 border border-indigo-600 text-indigo-700 rounded hover:bg-indigo-200"
              >
                + Add Task
              </button>
            </div>

            {project.tasks.map((task) => (
              <div
                key={task.id}
                className="flex items-center justify-between py-2 border-b"
              >
                <div>
                  <p className={`font-medium ${task.status === "completed" ? "line-through text-gray-400" : ""}`}>
                    {task.title}
                  </p>
                </div>
                <input
                  type="checkbox"
                  checked={task.status === "completed"}
                  onChange={() => handleToggleTask(project.id, task.id)}
                  className="w-4 h-4 text-indigo-600"
                />
              </div>
            ))}

            {allCompleted ? (
              <button
                onClick={() => handleMarkProjectCompleted(project.id)}
                className="mt-3 text-sm px-3 py-1 border border-green-600 text-green-700 rounded hover:bg-green-100"
              >
                ✅ Mark Project as Completed
              </button>
            ) : null}
          </div>
        );
      })}
    </main>
  );
}