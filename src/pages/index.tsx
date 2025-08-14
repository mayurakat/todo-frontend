import Layout from "../components/Layout";

export default function Home() {
  return (
      <section className="flex flex-col items-center justify-center text-center py-12 md:py-20">
        <h1 className="text-4xl md:text-6xl font-bold text-neonGreen leading-tight">
          Welcome to SmartTodo AI
        </h1>
        <p className="mt-4 text-gray-300 max-w-xl mx-auto px-4 md:px-0">
          Manage your tasks smarter with AI-powered prioritization, context-aware deadlines,
          and intelligent categorization — all in one place.
        </p>
        <div className="mt-8 flex flex-col md:flex-row gap-4">
          
          <button
            className="px-6 py-3 border border-neonGreen text-neonGreen rounded-lg hover:bg-neonGreen hover:text-techBlue transition"
            onClick={() => window.location.href = '/register'}
          >
            Get Started
          </button>
        </div>
      </section>
  );
}

// import { useEffect } from 'react';
// import { useRouter } from 'next/router';

// export default function Index() {
//   const r = useRouter();
//   useEffect(() => { r.replace('/tasks'); }, [r]);
//   return null;
// }

