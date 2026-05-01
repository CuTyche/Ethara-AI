import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";

export default function Register() {
  const navigate = useNavigate();
  const [data, setData] = useState({
    email: "",
    password: "",
    role: "member",
  });

  const register = async () => {
    try {
      await API.post("/auth/register", data);
      navigate("/login");
    } catch {
      alert("Error");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center 
      bg-gradient-to-br from-[#0f172a] via-[#020617] to-black text-white">

      <div className="bg-slate-800/60 backdrop-blur-xl 
        p-6 rounded-xl w-80 border border-slate-700 shadow-lg">

        <h2 className="text-2xl mb-4 text-purple-400">Register</h2>

        <input
          className="w-full mb-3 p-2 bg-slate-700 rounded"
          placeholder="Email"
          onChange={(e) => setData({ ...data, email: e.target.value })}
        />

        <input
          type="password"
          className="w-full mb-3 p-2 bg-slate-700 rounded"
          placeholder="Password"
          onChange={(e) => setData({ ...data, password: e.target.value })}
        />

        <select
          className="w-full mb-3 p-2 bg-slate-700 rounded"
          onChange={(e) => setData({ ...data, role: e.target.value })}
        >
          <option value="member">Member</option>
          <option value="admin">Admin</option>
        </select>

        <button
          onClick={register}
          className="w-full py-2 rounded-lg 
          bg-gradient-to-r from-indigo-500 to-purple-500"
        >
          Register
        </button>
      </div>
    </div>
  );
}