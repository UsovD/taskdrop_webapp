'use client';
import { useEffect, useState } from 'react';

const API = 'https://taskdrop-render-backend.onrender.com';

const categories = [
  { label: 'Все', filter: () => true, icon: 'fa-list' },
  { label: 'Входящие', filter: t => !t.done, icon: 'fa-inbox' },
  { label: 'Сегодня', filter: t => new Date(t.created_at).toDateString() === new Date().toDateString(), icon: 'fa-calendar-day' },
  { label: 'Завтра', filter: t => {
    const d = new Date(); d.setDate(d.getDate() + 1);
    return new Date(t.created_at).toDateString() === d.toDateString();
  }, icon: 'fa-calendar-plus' },
  { label: '7 дней', filter: t => {
    const now = new Date(); const next = new Date(); next.setDate(now.getDate() + 7);
    const tDate = new Date(t.created_at);
    return tDate >= now && tDate <= next;
  }, icon: 'fa-calendar-week' },
  { label: 'Выполненные', filter: t => t.done, icon: 'fa-check-circle' },
];

export default function Page() {
  const [userId, setUserId] = useState<number | null>(null);
  const [tasks, setTasks] = useState<any[]>([]);
  const [category, setCategory] = useState(categories[0]);

  useEffect(() => {
    const uid = (window as any)?.Telegram?.WebApp?.initDataUnsafe?.user?.id || 1;
    setUserId(uid);
    fetch(`${API}/tasks?user_id=${uid}`)
      .then(res => res.json())
      .then(setTasks);
  }, []);

  const addTask = async () => {
    const text = prompt('Новая задача');
    if (!text || !userId) return;
    const res = await fetch(`${API}/tasks`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ user_id: userId, text }),
    });
    const data = await res.json();
    setTasks([{ id: data.id, user_id: userId, text, done: false, created_at: new Date().toISOString() }, ...tasks]);
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-white">
      <aside className="md:w-64 p-4 space-y-2 bg-white dark:bg-gray-800 shadow-md">
        {categories.map(c => (
          <button key={c.label} onClick={() => setCategory(c)} className={`w-full flex items-center gap-2 p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700 ${category.label === c.label ? 'bg-gray-200 dark:bg-gray-700' : ''}`}>
            <i className={`fas ${c.icon}`}></i> {c.label}
          </button>
        ))}
      </aside>
      <main className="flex-1 p-4">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-xl font-semibold">{category.label}</h1>
          <button onClick={addTask} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded">
            ➕ Добавить
          </button>
        </div>
        <ul className="space-y-2">
          {tasks.filter(category.filter).map(task => (
            <li key={task.id} className="bg-white dark:bg-gray-700 p-3 rounded shadow">
              <span className={task.done ? 'line-through text-gray-400' : ''}>{task.text}</span>
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
}