
"use client";
import { useState } from "react";
import { FaPlus, FaEdit } from "react-icons/fa";

export default function Home() {
  const [tasks, setTasks] = useState([
    { id: 1, text: "Первая задача", done: false },
    { id: 2, text: "Вторая задача", done: false },
  ]);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [input, setInput] = useState("");

  const handleEdit = (id: number, currentText: string) => {
    setEditingId(id);
    setInput(currentText);
  };

  const handleSave = (id: number) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, text: input } : t));
    setEditingId(null);
  };

  return (
    <main className="p-4 max-w-xl mx-auto space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">📂 Входящие</h1>
        <button className="bg-blue-600 px-4 py-2 rounded-xl flex items-center gap-2 hover:bg-blue-700">
          <FaPlus /> Новая
        </button>
      </div>

      <div className="grid gap-3">
        {tasks.map(task => (
          <div key={task.id} className="bg-[#1A1A1A] p-4 rounded-xl flex justify-between items-center">
            {editingId === task.id ? (
              <>
                <input
                  className="bg-black text-white border border-gray-500 rounded px-2 py-1 w-full"
                  value={input}
                  onChange={e => setInput(e.target.value)}
                />
                <button onClick={() => handleSave(task.id)} className="ml-3 text-green-400">💾</button>
              </>
            ) : (
              <>
                <span>{task.text}</span>
                <button onClick={() => handleEdit(task.id, task.text)} className="text-gray-400 hover:text-white">
                  <FaEdit />
                </button>
              </>
            )}
          </div>
        ))}
      </div>
    </main>
  );
}
