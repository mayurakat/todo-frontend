import Link from 'next/link';
import React from 'react';
import { Task } from '../lib/types';
import dayjs from 'dayjs';
import { FaEdit, FaTrash, FaClock } from 'react-icons/fa';

type Props = { task: Task; onDeleted?: () => void; onDelete?: (id?: number) => void };

export default function TaskCard({ task, onDeleted, onDelete }: Props) {
  const priorityColor = task.priority === 'high' ? 'bg-red-500' : task.priority === 'medium' ? 'bg-yellow-500' : 'bg-green-400';
  return (
    <div className="p-4 glass rounded-2xl shadow-sm border border-white/6">
      <div className="flex justify-between">
        <div className="pr-3">
          <h3 className="text-lg font-semibold">{task.title}</h3>
          <p className="text-sm text-slate-300 mt-1 line-clamp-3">{task.description}</p>

          <div className="mt-3 flex flex-wrap gap-2 items-center">
            <span className={`text-xs px-2 py-1 rounded ${priorityColor} text-black`}>{(task.priority || 'low').toUpperCase()}</span>
            {task.category && <span className="text-xs px-2 py-1 rounded bg-white/6">{task.category}</span>}
            {task.due_date && (
              <div className="text-xs text-slate-300 flex items-center gap-2">
                <FaClock size={12} />
                {dayjs(task.due_date).format('MMM D')}
              </div>
            )}
          </div>
        </div>

        <div className="flex flex-col items-center gap-2">
          <Link href={`/tasks/${task.id}`} className="p-2 rounded hover:bg-white/6" aria-label="edit">
            <FaEdit />
          </Link>
          <button onClick={() => onDelete?.(task.id)} className="p-2 rounded hover:bg-white/6 text-red-400" aria-label="delete">
            <FaTrash />
          </button>
        </div>
      </div>
    </div>
  );
}
