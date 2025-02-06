import { useNavigate } from "react-router-dom";

export default function Dash() {
  const navigate = useNavigate();

  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Lowest Layer - Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://img.freepik.com/free-vector/gradient-particle-wave-background_23-2150521668.jpg?t=st=1738838105~exp=1738841705~hmac=dbc872a13353510e2e6758704c12b9dd0a21a48ef2c2de4e47dd9bfd998e687c&w=1800')",
        }}
      ></div>

      {/* Middle Layer - Semi-transparent Image */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-60 scale-y-[-1]"
        style={{
          backgroundImage:
            "url('https://img.freepik.com/free-vector/technology-background-with-hexagonal-net_79603-303.jpg?semt=ais_hybrid')",
        }}
      ></div>

      {/* Full-Screen Glassmorphism Overlay */}
      <div className="absolute inset-0 bg-white/10 backdrop-blur-lg"></div>

      {/* Centered 80% Frosted Glass Container */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-[80vw] h-[80vh] bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl p-5 grid grid-cols-4 grid-rows-3 gap-5">
          {/* Glassmorphism Boxes with Content */}
          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-5 col-span-1 row-span-2 flex flex-col items-center justify-center">
            <h2 className="text-white text-xl font-semibold">CollabHive</h2>
            <p className="text-white/80 text-sm text-center mt-2">
              A seamless way to collaborate with your team.
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-5 col-span-2 row-span-2 flex flex-col items-center justify-center">
            <h2 className="text-white text-xl font-semibold">SwipeStack</h2>
            <p className="text-white/80 text-sm text-center mt-2">
              Effortlessly browse and manage your tasks.
            </p>
          </div>

          <div
            className="bg-white/10 backdrop-blur-lg rounded-xl p-5 col-span-1 row-span-1 flex items-center justify-center cursor-pointer"
            onClick={() => window.open("http://localhost:8501", "_blank")}
          >
            <h2 className="text-white text-2xl font-bold typewriter">DevSmart</h2>
          </div>

          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-5 col-span-1 row-span-2 flex flex-col items-center justify-center">
            <h2 className="text-white text-xl font-semibold">Analytics Hub</h2>
            <p className="text-white/80 text-sm text-center mt-2">
              Get insights and trends in real time.
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-5 col-span-2 row-span-1 flex flex-col items-center justify-center">
            <h2 className="text-white text-xl font-semibold">Project Nexus</h2>
            <p className="text-white/80 text-sm text-center mt-2">
              Manage and track your projects effortlessly.
            </p>
          </div>

          {/* Task Manager with Launch Button */}
          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-5 col-span-1 row-span-1 flex flex-col items-center justify-center">
            <h2 className="text-white text-xl font-semibold">Task Manager</h2>
            <p className="text-white/80 text-sm text-center mt-2">
              Organize your workflow efficiently.
            </p>

            {/* Launch Now Button */}
            <button
              onClick={() => navigate("/Custom")}
              className="mt-3 px-5 py-2 text-sm font-semibold text-white bg-white/20 backdrop-blur-md rounded-lg shadow-md transition duration-300 hover:bg-white/30 hover:scale-105"
            >
              Launch Now →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
