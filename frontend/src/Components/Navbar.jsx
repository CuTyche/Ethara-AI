import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();

  return (
    <div className="bg-slate-900 border-b border-slate-700">
      <div className="max-w-5xl mx-auto flex justify-between items-center px-6 py-4">

        <h1 className="text-xl font-bold text-indigo-400">
          Ethara AI
        </h1>

        <button
          onClick={() => {
            localStorage.removeItem("token");
            navigate("/login");
          }}
          className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded text-white"
        >
          Logout
        </button>
      </div>
    </div>
  );
}