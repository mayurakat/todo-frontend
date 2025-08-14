import { login } from "@/lib/api";
import Layout from "../components/Layout";
import { useState } from "react";
import { FaUser, FaLock } from "react-icons/fa";
import { useRouter } from "next/router";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const r = useRouter();



  const handleLogin =async(e: React.FormEvent) => {
    e.preventDefault();
    // Call your API here
    await login(email, password);
    console.log("Login:", { email, password });
    r.push('/tasks'); // Redirect to tasks after successful login
  };

  return (
      <section className="flex justify-center items-center min-h-[70vh]">
        <form
          onSubmit={handleLogin}
          className="bg-techBlue/80 backdrop-blur-md p-6 md:p-8 rounded-lg shadow-lg w-full max-w-md"
        >
          <h2 className="text-2xl md:text-3xl font-bold text-neonGreen text-center mb-6">
            Login
          </h2>

          <div className="mb-4">
            <label className="block mb-1 text-sm">Username</label>
            <div className="flex items-center bg-techBlue/60 rounded-lg px-3">
              <FaUser className="text-gray-400 mr-2" />
              <input
                type="text"
                placeholder="Enter your username"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-2 bg-transparent focus:outline-none"
              />
            </div>
          </div>

          <div className="mb-6">
            <label className="block mb-1 text-sm">Password</label>
            <div className="flex items-center bg-techBlue/60 rounded-lg px-3">
              <FaLock className="text-gray-400 mr-2" />
              <input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-2 bg-transparent focus:outline-none"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-2 bg-neonGreen text-techBlue font-bold rounded-lg hover:scale-105 transition-transform"
          >
            Sign In
          </button>

          <p className="mt-4 text-center text-gray-400 text-sm">
            Don't have an account?{" "}
            <a href="/register" className="text-neonGreen hover:underline">
              Register
            </a>
          </p>
        </form>
      </section>
  );
}
