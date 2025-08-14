import React, { useEffect, useState } from 'react';
import Layout from '../../components/Layout';
import { getTasks, getCategories, deleteTask } from '../../lib/api';
import { Task } from '../../lib/types';
import TaskCard from '../../components/TaskCard';
import Link from 'next/link';

export default function TasksPage() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [cats, setCats] = useState<{id:number;name:string}[]>([]);
  const [filter, setFilter] = useState('');

  const load = async () => {
    try {
      const t = await getTasks();
      setTasks(t);
    } catch (e) { console.error(e); }
  };

  useEffect(() => { load(); (async()=>{ try{ const c = await getCategories(); setCats(c);}catch{} })(); }, []);

  const handleDelete = async (id?: number) => {
    if (!id) return;
    if (!confirm('Delete task?')) return;
    await deleteTask(id);
    load();
  };

  return (
    <Layout>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Tasks</h1>
        <div className="flex items-center gap-3">
          <select value={filter} onChange={e=>setFilter(e.target.value)} className="bg-transparent border border-white/10 rounded px-3 py-2">
            <option value="">All categories</option>
            {cats.map(c => <option key={c.id} value={c.name}>{c.name}</option>)}
          </select>
          <Link href="/tasks/new" className="px-4 py-2 rounded bg-gradient-to-r from-neonPurple to-accent text-black font-semibold">+ New</Link>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {tasks.filter(t => !filter || t.category === filter).map(t => (
          <TaskCard key={t.id} task={t} onDelete={handleDelete} />
        ))}
      </div>
    </Layout>
  );
}
