import { useEffect, useState } from "react";
import API from "../api/axios";

export default function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    const res = await API.get("/tasks");
    setTasks(res.data);
  };

  const createTask = async () => {
    if (!title) return;

    await API.post("/tasks", {
      title,
      status: "pending",
    });

    setTitle("");
    fetchTasks();
  };

  const updateStatus = async (id, status) => {
    await API.put(`/tasks/${id}`, { status });
    fetchTasks();
  };

  const deleteTask = async (id) => {
    await API.delete(`/tasks/${id}`);
    fetchTasks();
  };

  const getStatusColor = (status) => {
    if (status === "pending") return "text-yellow-400";
    if (status === "in-progress") return "text-blue-400";
    if (status === "done") return "text-green-400";
  };

  return (
    <div>

      <h1 className="text-3xl font-bold mb-6 text-center">
        Dashboard
      </h1>

      {/* Create Task */}
      <div className="flex gap-3 mb-6">
        <input
          className="flex-1 px-4 py-3 bg-slate-800 border border-slate-700 rounded text-white"
          placeholder="New task..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <button
          onClick={createTask}
          className="px-5 py-3 bg-indigo-500 hover:bg-indigo-600 rounded text-white"
        >
          Add
        </button>
      </div>

      {/* Tasks */}
      {tasks.length === 0 ? (
        <p className="text-center text-gray-400">
          No tasks yet
        </p>
      ) : (
        <div className="space-y-4">
          {tasks.map((t) => (
            <div
              key={t._id}
              className="bg-slate-800 border border-slate-700 p-4 rounded flex justify-between items-center"
            >
              <div>
                <h3 className="font-semibold text-white">
                  {t.title}
                </h3>
                <p className={getStatusColor(t.status)}>
                  {t.status}
                </p>
              </div>

              <div className="flex gap-3">
                <select
                  value={t.status}
                  onChange={(e) =>
                    updateStatus(t._id, e.target.value)
                  }
                  className="bg-slate-700 px-3 py-2 rounded text-white"
                >
                  <option value="pending">Pending</option>
                  <option value="in-progress">In Progress</option>
                  <option value="done">Done</option>
                </select>

                <button
                  onClick={() => deleteTask(t._id)}
                  className="bg-red-500 px-3 py-2 rounded text-white"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}