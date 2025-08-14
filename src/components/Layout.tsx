import React, { ReactNode } from 'react';
import Navbar from './Navbar';

type Props = { children: ReactNode };

export default function Layout({ children }: Props) {
  return (
    <div className="min-h-screen flex flex-col bg-mesh">
      <Navbar />
      <main className="flex-grow max-w-5xl mx-auto px-4 py-6">
        {children}
      </main>
      <footer className="text-center text-xs text-slate-400 py-4">
        © {new Date().getFullYear()} SmartTodo AI
      </footer>
    </div>
  );
}
