import Link from 'next/link';
import React from 'react';
import { FaLightbulb, FaBars } from 'react-icons/fa';
import {logOut} from '../lib/api';
import { useRouter } from 'next/router';

export default function Navbar() {
  const router = useRouter();

  const logout = async () => {
    await logOut();
    router.push('/login'); // Redirect to login after logout
  };
  return (
    <header className="w-full glass border-b border-white/6">
      <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-neonPurple to-accent flex items-center justify-center">
            <FaLightbulb />
          </div>
          <div>
            <div className="font-bold">SmartTodo AI</div>
            <div className="text-xs text-slate-300">context-aware tasks</div>
          </div>
        </Link>

        <nav className="hidden sm:flex gap-3 items-center text-sm">
          <Link href="/tasks" className="px-3 py-2 rounded hover:bg-white/4">Tasks</Link>
          <Link href="/tasks/new" className="px-3 py-2 rounded hover:bg-white/4">New</Link>
          <Link href="/context" className="px-3 py-2 rounded hover:bg-white/4">Context</Link>
          <Link href="/ai" className="px-3 py-2 rounded hover:bg-white/4">AI</Link>
          {/* <Link href="#" className="px-3 py-2 rounded hover:bg-white/4">Lo</Link> */}
            <button
            type="button"
            className="w-full px-3 py-2 bg-neonGreen text-techBlue font-bold rounded-lg hover:scale-105 transition-transform border border-white/10 hover:bg-neonGreen/90"
            onClick={()=>logout()}
            >
            Logout
            </button>
        </nav>

        <div className="sm:hidden">
          <button className="p-2 rounded bg-white/6"><FaBars /></button>
        </div>
      </div>
    </header>
  );
}
