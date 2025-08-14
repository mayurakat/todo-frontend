import { useState } from "react";
import { useRouter } from "next/router";
import { createCategory } from "@/lib/api"; // Make sure this API exists

export default function NewCategory() {
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await createCategory({ name });
      router.push("/tasks"); // or wherever you want to redirect
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="flex justify-center items-center min-h-[70vh]">
      <form onSubmit={handleSubmit} className="bg-techBlue/80 backdrop-blur-md p-6 md:p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl md:text-3xl font-bold text-neonGreen text-center mb-6">
          Add Category
        </h2>
        <div className="mb-4">
          <label className="block mb-1 text-sm">Category Name</label>
          <input
            type="text"
            required
            value={name}
            onChange={e => setName(e.target.value)}
            className="w-full p-2 bg-transparent border border-white/10 rounded"
            placeholder="Enter category name"
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="w-full py-2 bg-neonGreen text-techBlue font-bold rounded-lg hover:scale-105 transition-transform"
        >
          {loading ? "Saving..." : "Add Category"}
        </button>
      </form>
    </section>
  );
}