import React, { useEffect, useState } from 'react';
import Layout from '../../components/Layout';
import TaskForm from '../../components/TaskForm';
import { getTask, updateTask } from '../../lib/api';
import { useRouter } from 'next/router';
import { Task } from '../../lib/types';

export default function EditTask() {
  const router = useRouter();
  const { id } = router.query;
  const [task, setTask] = useState<Task | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    (async () => {
      try {
        const t = await getTask(id as string);
        setTask(t);
      } catch (e) { console.error(e); }
      setLoading(false);
    })();
  }, [id]);

  const handleSubmit = async (t: Task) => {
    await updateTask(id as string, t);
    router.push('/tasks');
  };

  if (loading) return <Layout><div>Loading...</div></Layout>;
  if (!task) return <Layout><div>Task not found</div></Layout>;

  return (
    <Layout>
      <div className="max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold mb-4">Edit Task</h1>
        <TaskForm initial={task} onSubmit={handleSubmit} submitLabel="Update" />
      </div>
    </Layout>
  );
}
