import React, { useEffect, useState } from 'react';
import { Task } from '../lib/types';
import { getCategories, getAISuggestions } from '../lib/api';
import { useRouter } from 'next/router';

type Props = {
  initial?: Task;
  onSubmit: (t: Task) => Promise<void>;
  submitLabel?: string;
};

export default function TaskForm({ initial, onSubmit, submitLabel = 'Save' }: Props) {
  const [task, setTask] = useState<Task>(initial ?? { title: '', description: '', category: '', priority: 'low', due_date: '' });
  const [cats, setCats] = useState<{ id:number; name:string }[]>([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    (async () => {
      try {
        const c = await getCategories();
        setCats(c);
      } catch (e) {}
    })();
  }, []);

  useEffect(() => { if (initial) setTask(initial); }, [initial]);

  const handleChange = (k: keyof Task) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setTask(prev => ({ ...prev, [k]: e.target.value } as Task));
  };

  const handleAI = async () => {
    try {
      const res = await getAISuggestions({ task, daily_context: [] });
      // Expecting { enhanced_task: {...} }
      if (res?.enhanced_task) setTask(prev => ({ ...prev, ...res.enhanced_task }));
    } catch (e) {
      console.error(e);
      alert('AI suggestion failed');
    }
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await onSubmit(task);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={submit} className="space-y-4 glass p-4 rounded-lg">
      <div>
        <label className="text-sm">Title</label>
        <input required value={task.title} onChange={handleChange('title')} className="w-full mt-1 p-2 rounded bg-transparent border border-white/10" />
      </div>

      <div>
        <label className="text-sm">Description</label>
        <textarea value={task.description} onChange={handleChange('description')} className="w-full mt-1 p-2 rounded bg-transparent border border-white/10" rows={4} />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <select value={task.category} onChange={handleChange('category')} className="p-2 rounded bg-transparent border border-white/10">
          <option value="">Category</option>
          {cats.map(c => <option key={c.id} value={c.name}>{c.name}</option>)}
        </select>
        <button
            type="button"
            className="px-2 py-1 rounded bg-neonGreen text-techBlue font-bold text-xs border"
            onClick={() => router.push("/categories/new")}
            title="Add Category"
          >
            + ADD
        </button>

        <select value={task.priority} onChange={handleChange('priority') as any} className="p-2 rounded bg-transparent border border-white/10">
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>

        <input type="date" value={task.due_date ? task.due_date.split('T')[0] : ''} onChange={handleChange('due_date') as any} className="p-2 rounded bg-transparent border border-white/10" />
      </div>

      <div className="flex flex-col sm:flex-row gap-3 justify-end">
        {/* <button type="button" onClick={handleAI} className="px-4 py-2 rounded bg-gradient-to-r from-neonPurple to-accent text-black font-semibold">AI Suggest</button> */}
        <button type="submit" disabled={loading} className="px-4 py-2 rounded bg-white/6">{submitLabel}</button>
      </div>
    </form>
  );
}
