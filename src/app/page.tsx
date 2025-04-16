'use client'
import { useEffect, useState } from 'react'
import axios from 'axios'

export default function Home() {
  const [tasks, setTasks] = useState([])
  const [input, setInput] = useState('')
  const [editing, setEditing] = useState(null)

  const fetchTasks = async () => {
    const res = await axios.get('https://taskdrop-render-backend.onrender.com/tasks', {
      params: { user_id: 1 }
    })
    setTasks(res.data)
  }

  const addTask = async () => {
    if (!input) return
    if (editing !== null) {
      await axios.put(`https://taskdrop-render-backend.onrender.com/tasks/${editing}`, {
        text: input,
        done: false,
      })
      setEditing(null)
    } else {
      await axios.post('https://taskdrop-render-backend.onrender.com/tasks', {
        user_id: 1,
        text: input,
      })
    }
    setInput('')
    fetchTasks()
  }

  const editTask = (task) => {
    setInput(task.text)
    setEditing(task.id)
  }

  useEffect(() => {
    fetchTasks()
  }, [])

  return (
    <div className="max-w-md mx-auto">
      <h1 className="text-3xl font-bold mb-4">TaskDrop</h1>
      <div className="flex mb-4">
        <input
          className="flex-1 p-2 rounded bg-zinc-900 border border-zinc-700"
          placeholder="Новая задача..."
          value={input}
          onChange={e => setInput(e.target.value)}
        />
        <button onClick={addTask} className="ml-2 px-4 py-2 bg-blue-600 rounded">
          {editing !== null ? '💾' : '➕'}
        </button>
      </div>
      <ul>
        {tasks.map(t => (
          <li key={t.id} className="flex justify-between items-center border-b border-zinc-800 py-2">
            <span>{t.text}</span>
            <button onClick={() => editTask(t)} className="text-sm text-blue-400">✏️</button>
          </li>
        ))}
      </ul>
    </div>
  )
}
