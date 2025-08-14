import React, { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import { getContext, createContext, getAISuggestions } from '../lib/api';
import { ContextItem } from '../lib/types';

export default function ContextPage() {
  const [ctx, setCtx] = useState<ContextItem[]>([]);
  const [text, setText] = useState('');
  const [contextType, setContextType] = useState<'message' | 'email' | 'note'>('message');
  const load = async () => { try { const c = await getContext(); setCtx(c); } catch (e) { console.error(e); } };

  useEffect(()=>{ load(); }, []);

  const add = async () => {
    if (!text.trim()) return;
    await createContext({ content: text, context_type:contextType });
    setText('');
    load();
  };

  const analyze = async () => {
    try {
      const res = await getAISuggestions({ daily_context: ctx });
      // For demo we simply alert — ideally open AI suggestions page or show results in UI
      alert('AI analyzed context — check AI suggestions page.');
      console.log(res);
    } catch (e) { console.error(e); alert('AI analysis failed'); }
  };

  return (
    <Layout>
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold">Daily Context</h1>
          {/* <button onClick={analyze} className="px-3 py-2 rounded bg-gradient-to-r from-neonPurple to-accent text-black">Analyze with AI</button> */}
        </div>

        <div className="mb-4">
          <textarea
            value={text}
            onChange={e => setText(e.target.value)}
            rows={4}
            className="w-full p-3 rounded glass border border-white/10"
            placeholder="Paste messages, emails or notes..."
          ></textarea>
          <div className="flex items-center justify-between mt-2">
            <select
              className="px-3 py-2 rounded border border-white/10 bg-white/10 text-black"
              value={contextType}
              onChange={e => setContextType(e.target.value as 'message' | 'email' | 'note')}
            >
              <option value="message">Message</option>
              <option value="email">Email</option>
              <option value="note">Note</option>
            </select>
            <button onClick={add} className="px-4 py-2 rounded bg-white/6">
              Add
            </button>
          </div>
        </div>

        <div className="space-y-3">
          {ctx.map(c => (
            <div key={c.id} className="p-3 glass rounded">
              <div className="text-xs text-slate-400">{new Date(c.created_at || '').toLocaleString()}</div>
              <div className="mt-1">{c.content}</div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
}
