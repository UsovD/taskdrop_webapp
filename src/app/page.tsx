
"use client"
import { useEffect, useState } from 'react'
import { Button } from "@/components/ui/button"
import { Plus, CalendarCheck, Calendar, Inbox, Layers, CheckCircle, CalendarDays } from 'lucide-react'

const API = "https://taskdrop-render-backend.onrender.com"

export default function App() {
  const [tasks, setTasks] = useState([])
  const [newTask, setNewTask] = useState('')
  const [activeTab, setActiveTab] = useState('all')
  const userId = 1

  const fetchTasks = async () => {
    const res = await fetch(`${API}/tasks?user_id=${userId}`)
    const data = await res.json()
    setTasks(data)
  }

  useEffect(() => {
    fetchTasks()
  }, [])

  const handleAdd = async () => {
    if (!newTask.trim()) return
    await fetch(`${API}/tasks`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ user_id: userId, text: newTask })
    })
    setNewTask('')
    fetchTasks()
  }

  const handleUpdate = async (id, done) => {
    await fetch(`${API}/tasks/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ done: !done })
    })
    fetchTasks()
  }

  const handleEdit = async (id, newText) => {
    await fetch(`${API}/tasks/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text: newText })
    })
    fetchTasks()
  }

  const filteredTasks = tasks.filter(task => {
    if (activeTab === 'done') return task.done
    if (activeTab === 'inbox') return !task.done
    return true
  })

  const tabs = [
    { key: 'all', label: 'Все', icon: <Layers className="h-5 w-5" /> },
    { key: 'inbox', label: 'Входящие', icon: <Inbox className="h-5 w-5" /> },
    { key: 'today', label: 'Сегодня', icon: <CalendarCheck className="h-5 w-5" /> },
    { key: 'tomorrow', label: 'Завтра', icon: <Calendar className="h-5 w-5" /> },
    { key: '7days', label: 'Следующие 7 дней', icon: <CalendarDays className="h-5 w-5" /> },
    { key: 'done', label: 'Выполненные', icon: <CheckCircle className="h-5 w-5" /> },
  ]

  return (
    <div className="min-h-screen bg-black text-white p-4">
      <h1 className="text-2xl font-bold mb-4">TaskDrop</h1>

      <div className="flex gap-2 mb-4 overflow-x-auto">
        {tabs.map(tab => (
          <Button
            key={tab.key}
            variant={activeTab === tab.key ? 'default' : 'outline'}
            onClick={() => setActiveTab(tab.key)}
            className="flex items-center gap-2 shrink-0"
          >
            {tab.icon} {tab.label}
          </Button>
        ))}
      </div>

      <div className="flex gap-2 mb-4">
        <input
          type="text"
          placeholder="Новая задача..."
          className="flex-1 bg-zinc-800 text-white px-3 py-2 rounded"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
        />
        <Button onClick={handleAdd}><Plus className="w-4 h-4 mr-1" />Добавить</Button>
      </div>

      <div className="space-y-3">
        {filteredTasks.map(task => (
          <div key={task.id} className="flex items-center justify-between bg-zinc-800 px-4 py-2 rounded shadow">
            <input
              type="checkbox"
              checked={task.done}
              onChange={() => handleUpdate(task.id, task.done)}
              className="mr-2"
            />
            <input
              type="text"
              value={task.text}
              onChange={(e) => handleEdit(task.id, e.target.value)}
              className="flex-1 bg-transparent text-white outline-none"
            />
          </div>
        ))}
      </div>
    </div>
  )
}
