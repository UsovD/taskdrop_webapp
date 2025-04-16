
'use client';

import { useEffect, useState } from 'react';

const API_URL = "https://taskdrop-render-backend.onrender.com";

export default function Home() {
  const [tasks, setTasks] = useState([]);
  const [text, setText] = useState("");

  const loadTasks = async () => {
    const res = await fetch(`${API_URL}/tasks?user_id=1`);
    const data = await res.json();
    setTasks(data);
  };

  const addTask = async () => {
    if (!text.trim()) return;
    await fetch(`${API_URL}/tasks`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ user_id: 1, text }),
    });
    setText("");
    loadTasks();
  };

  useEffect(() => {
    loadTasks();
  }, []);

  return (
    <main>
      <div className="flex flex-wrap gap-2 mb-4">
        <button className="bg-blue-600 px-3 py-1 rounded">📋 Все</button>
        <button className="bg-orange-600 px-3 py-1 rounded">💬 Входящие</button>
        <button className="bg-green-600 px-3 py-1 rounded">📅 Сегодня</button>
        <button className="bg-pink-600 px-3 py-1 rounded">📅 Завтра</button>
        <button className="bg-purple-600 px-3 py-1 rounded">📅 7 дней</button>
        <button className="bg-gray-600 px-3 py-1 rounded">✅ Выполненные</button>
      </div>

      <h1 className="text-3xl font-bold mb-4">Все</h1>

      <div className="mb-4">
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="bg-gray-800 border border-gray-600 px-3 py-2 rounded w-64"
          placeholder="Новая задача..."
        />
        <button onClick={addTask} className="ml-2 bg-blue-500 px-4 py-2 rounded text-white">
          ➕ Добавить
        </button>
      </div>

      <ul className="list-disc pl-6 space-y-1">
        {tasks.map((task: any) => (
          <li key={task.id}>{task.text}</li>
        ))}
      </ul>
    </main>
  );
}
