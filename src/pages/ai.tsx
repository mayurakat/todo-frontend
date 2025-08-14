import React, { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import { getAISuggestions, getContext } from '../lib/api';
import { createTask } from '../lib/api';

export default function AIPage() {
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const ctx = await getContext();
        const res = await getAISuggestions({ daily_context: ctx });
        setSuggestions(res || []);
      } catch (e) { console.error(e); }
      setLoading(false);
    })();
  }, []);

  const handleCreateTask = async (s: any) => {
    try {
      await createTask({
        title: s.task,
        description: s.task,
        due_date: s.suggested_deadline || s.deadline,
        priority: s.priority,
        ai_suggested: true,
      });
      alert('Task created!');
    } catch (e) {
      alert('Failed to create task.');
      console.error(e);
    }
  };

  return (
    <Layout>
      <div className="max-w-3xl mx-auto">
        <h1 className="text-2xl font-bold mb-4">AI Suggestions</h1>
        {loading && <div>Loading...</div>}
        {!loading && suggestions.length === 0 && <div className="text-slate-400">No suggestions yet.</div>}
        <div className="space-y-3">
          {suggestions.map((s, i) => (
            <div key={i} className="p-4 glass rounded">
              <div className="flex justify-between">
              <div>
                <h3 className="font-semibold">{s.task}</h3>
                <div className="text-sm text-slate-300">{s.task}</div>
                {s.suggested_deadline && (
                <div className="mt-2 text-xs text-slate-400">
                  Deadline: {new Date(s.deadline).toLocaleDateString()}
                </div>
                )}
              </div>
              <div className="text-xs text-slate-400">{s.priority?.toUpperCase()}</div>
              </div>
              <button
              className="mt-3 px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
              onClick={() => { handleCreateTask(s)
              }}
              >
              Create Task +
              </button>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
}
