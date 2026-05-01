import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";

export default function Login() {
  const navigate = useNavigate();
  const [data, setData] = useState({ email: "", password: "" });

  const login = async () => {
    try {
      const res = await API.post("/auth/login", data);
      localStorage.setItem("token", res.data.access_token);
      navigate("/");
    } catch {
      alert("Login failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950 text-white">

      <div className="w-full max-w-sm bg-slate-800 border border-slate-700 p-6 rounded-lg">

        <h2 className="text-2xl font-semibold mb-4 text-center">
          Login
        </h2>

        <input
          className="w-full mb-3 p-3 rounded bg-slate-700 text-white"
          placeholder="Email"
          onChange={(e) => setData({ ...data, email: e.target.value })}
        />

        <input
          type="password"
          className="w-full mb-4 p-3 rounded bg-slate-700 text-white"
          placeholder="Password"
          onChange={(e) => setData({ ...data, password: e.target.value })}
        />

        <button
          onClick={login}
          className="w-full py-3 bg-indigo-500 hover:bg-indigo-600 rounded text-white"
        >
          Login
        </button>

        <p
          className="text-center mt-4 text-sm text-gray-400 cursor-pointer"
          onClick={() => navigate("/register")}
        >
          Create account
        </p>
      </div>
    </div>
  );
}