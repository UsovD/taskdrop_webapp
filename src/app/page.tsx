
"use client";
import React, { useEffect, useState } from "react";
import { FaPlus, FaTrash, FaEdit, FaSave } from "react-icons/fa";

const API = "https://taskdrop-render-backend.onrender.com";

export default function Home() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editingText, setEditingText] = useState("");

  const userId = 1;

  const fetchTasks = async () => {
    const res = await fetch(`${API}/tasks?user_id=${userId}`);
    const data = await res.json();
    setTasks(data);
  };

  const addTask = async () => {
    if (!newTask.trim()) return;
    await fetch(`${API}/tasks`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ user_id: userId, text: newTask }),
    });
    setNewTask("");
    fetchTasks();
  };

  const deleteTask = async (id: number) => {
    await fetch(`${API}/tasks/${id}`, { method: "DELETE" });
    fetchTasks();
  };

  const updateTask = async (id: number) => {
    await fetch(`${API}/tasks/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ done: false, text: editingText }),
    });
    setEditingId(null);
    fetchTasks();
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <main className="p-4 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">📝 TaskDrop</h1>
      <div className="flex gap-2 mb-6">
        <input
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Новая задача..."
          className="flex-1 bg-[#1a1a1a] px-3 py-2 rounded text-white"
        />
        <button onClick={addTask} className="bg-blue-600 p-3 rounded hover:bg-blue-700">
          <FaPlus />
        </button>
      </div>
      <div className="space-y-3">
        {tasks.map((task) => (
          <div key={task.id} className="bg-[#1A1A1A] p-4 rounded-xl flex justify-between items-center">
            {editingId === task.id ? (
              <>
                <input
                  value={editingText}
                  onChange={(e) => setEditingText(e.target.value)}
                  className="bg-black text-white border px-2 py-1 rounded w-full"
                />
                <button onClick={() => updateTask(task.id)} className="ml-2 text-green-400"><FaSave /></button>
              </>
            ) : (
              <>
                <span>{task.text}</span>
                <div className="flex gap-3">
                  <button onClick={() => { setEditingId(task.id); setEditingText(task.text); }} className="text-yellow-400"><FaEdit /></button>
                  <button onClick={() => deleteTask(task.id)} className="text-red-500"><FaTrash /></button>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </main>
  );
}
