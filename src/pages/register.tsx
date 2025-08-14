import { register } from "@/lib/api";
import Layout from "../components/Layout";
import { useState } from "react";
import { FaUser, FaLock, FaEnvelope } from "react-icons/fa";
import { useRouter } from 'next/router';

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async(e: React.FormEvent) => {
    e.preventDefault();
    // Call your API here
    await register(email, name, password);
    const r = useRouter();
    r.push('/login'); // Redirect to login after successful registration
    
    console.log("Register:", { name, email, password });
  };

  return (
      <section className="flex justify-center items-center min-h-[70vh]">
        <form
          onSubmit={handleRegister}
          className="bg-techBlue/80 backdrop-blur-md p-6 md:p-8 rounded-lg shadow-lg w-full max-w-md"
        >
          <h2 className="text-2xl md:text-3xl font-bold text-neonGreen text-center mb-6">
            Create Account
          </h2>

          <div className="mb-4">
            <label className="block mb-1 text-sm">Full Name</label>
            <div className="flex items-center bg-techBlue/60 rounded-lg px-3">
              <FaUser className="text-gray-400 mr-2" />
              <input
                type="text"
                placeholder="Enter your full name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-2 bg-transparent focus:outline-none"
              />
            </div>
          </div>

          <div className="mb-4">
            <label className="block mb-1 text-sm">Email</label>
            <div className="flex items-center bg-techBlue/60 rounded-lg px-3">
              <FaEnvelope className="text-gray-400 mr-2" />
              <input
                type="email"
                placeholder="Enter your email"
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
                placeholder="Create a password"
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
            Register
          </button>

          <p className="mt-4 text-center text-gray-400 text-sm">
            Already have an account?{" "}
            <a href="/login" className="text-neonGreen hover:underline">
              Login
            </a>
          </p>
        </form>
      </section>
  );
}
