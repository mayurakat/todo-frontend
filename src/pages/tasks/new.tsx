import React from 'react';
import Layout from '../../components/Layout';
import TaskForm from '../../components/TaskForm';
import { createTask } from '../../lib/api';
import { useRouter } from 'next/router';
import { Task } from '../../lib/types';

export default function NewTask() {
  const router = useRouter();

  const handleSubmit = async (t: Task) => {
    await createTask(t);
    router.push('/tasks');
  };

  return (
    <Layout>
      <div className="max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold mb-4">Create Task</h1>
        <TaskForm onSubmit={handleSubmit} />
      </div>
    </Layout>
  );
}
// Note: This file is for creating a new task. It uses a TaskForm component to handle the form submission.