"use client";

import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";

export default function ProjectPage() {
  const { currentUser, setCurrentUser } = useAuth();
  const { id } = useParams();
  const router = useRouter();

  const [project, setProject] = useState(null);
  const [newTaskTitle, setNewTaskTitle] = useState("");

  useEffect(() => {
    if (currentUser) {
      const selected = currentUser.projects.find((p) => p.id === id);
      setProject(selected);
    }
  }, [currentUser, id]);

  if (!project) return <p className="p-4 text-red-600">Project not found.</p>;

  const completedTasks = project.tasks.filter((t) => t.status === "completed").length;
  const totalTasks = project.tasks.length;
  const isCompleted = project.completed;

  const handleMarkTaskComplete = (taskIndex) => {
    const updatedTasks = project.tasks.map((task, i) =>
      i === taskIndex ? { ...task, status: "completed" } : task
    );

    const updatedProject = { ...project, tasks: updatedTasks };
    const updatedProjects = currentUser.projects.map((p) =>
      p.id === project.id ? updatedProject : p
    );

    const updatedUser = { ...currentUser, projects: updatedProjects };
    setCurrentUser(updatedUser);
    localStorage.setItem("projexa-user", JSON.stringify(updatedUser));
    setProject(updatedProject);
  };

  const handleAddTask = () => {
    if (!newTaskTitle.trim()) return;
    const newTask = { title: newTaskTitle, status: "pending" };
    const updatedProject = {
      ...project,
      tasks: [...project.tasks, newTask],
    };

    const updatedProjects = currentUser.projects.map((p) =>
      p.id === project.id ? updatedProject : p
    );

    const updatedUser = { ...currentUser, projects: updatedProjects };
    setCurrentUser(updatedUser);
    localStorage.setItem("projexa-user", JSON.stringify(updatedUser));
    setProject(updatedProject);
    setNewTaskTitle("");
  };

  const handleMarkProjectComplete = () => {
    const updatedProject = { ...project, completed: true };
    const updatedProjects = currentUser.projects.map((p) =>
      p.id === project.id ? updatedProject : p
    );
    const updatedUser = { ...currentUser, projects: updatedProjects };
    setCurrentUser(updatedUser);
    localStorage.setItem("projexa-user", JSON.stringify(updatedUser));
    router.push("/dashboard");
  };

  return (
    <div className="p-4 sm:p-6 md:p-8 space-y-8 max-w-4xl mx-auto">
      
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
        <h1 className="text-2xl sm:text-3xl font-bold text-indigo-700">{project.title}</h1>
        <Link href="/dashboard" className="text-sm text-indigo-600 hover:underline">
          ← Back to Dashboard
        </Link>
      </div>

      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="bg-white border-l-4 border-indigo-500 p-4 sm:p-6 rounded-xl shadow">
          <p className="text-lg sm:text-xl font-semibold text-gray-700">Total Tasks</p>
          <p className="text-2xl sm:text-3xl font-bold text-indigo-700">{totalTasks}</p>
        </div>
        <div className="bg-white border-l-4 border-green-500 p-4 sm:p-6 rounded-xl shadow">
          <p className="text-lg sm:text-xl font-semibold text-gray-700">Completed Tasks</p>
          <p className="text-2xl sm:text-3xl font-bold text-green-600">{completedTasks}</p>
        </div>
      </div>

      
      <div>
        <h2 className="text-xl sm:text-2xl font-bold text-indigo-600 mb-4">Tasks</h2>
        {totalTasks === 0 ? (
          <p className="text-gray-500">No tasks added yet.</p>
        ) : (
          <ul className="space-y-3">
            {project.tasks.map((task, index) => (
              <li
                key={index}
                className={`p-3 rounded-md shadow flex flex-col sm:flex-row justify-between items-start sm:items-center ${
                  task.status === "completed" ? "bg-green-100" : "bg-white"
                }`}
              >
                <span
                  className={`font-medium ${
                    task.status === "completed" ? "line-through text-gray-500" : ""
                  }`}
                >
                  {task.title}
                </span>
                {!isCompleted && task.status !== "completed" && (
                  <button
                    onClick={() => handleMarkTaskComplete(index)}
                    className="mt-2 sm:mt-0 text-sm bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                  >
                    Mark Complete
                  </button>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>

      
      {!isCompleted && (
        <div className="flex flex-col sm:flex-row gap-2">
          <input
            type="text"
            placeholder="New Task Title"
            value={newTaskTitle}
            onChange={(e) => setNewTaskTitle(e.target.value)}
            className="border p-2 rounded-md flex-1"
          />
          <button
            onClick={handleAddTask}
            className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
          >
            Add Task
          </button>
        </div>
      )}

      
      {!isCompleted && totalTasks > 0 && completedTasks === totalTasks && (
        <button
          onClick={handleMarkProjectComplete}
          className="w-full sm:w-auto mt-4 bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
        >
          Mark Project as Completed
        </button>
      )}
    </div>
  );
}
