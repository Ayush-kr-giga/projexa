import Navbar from "@/components/Navbar";

export default function page (){
    return (
        <>
        <Navbar/>
        <div className="min-h-screen px-6 py-12 bg-white text-gray-800">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-indigo-700 mb-6">About Projexa</h1>
          <p className="text-lg mb-4">
            Projexa is a simple and powerful project management tool built to help individuals and small teams stay organized and focused. Our mission is to simplify task tracking, progress monitoring, and team collaboration with an intuitive interface.
          </p>
          <p className="text-lg mb-4">
            Whether you are managing personal goals or leading a team project, Projexa gives you the tools you need — like project dashboards, deadlines, progress summaries, and more — all in one clean workspace.
          </p>
          <p className="text-lg">
            Built using modern web technologies, Projexa is designed to be responsive, lightweight, and user-friendly. This project is part of a capstone effort to explore full-stack web development using React, Next.js, and Tailwind CSS.
          </p>
        </div>
      </div>
        </>
    )
}

