export type Task = {
  id?: number;
  title: string;
  description?: string;
  category?: string;
  priority?: 'low' | 'medium' | 'high';
  due_date?: string | null; // ISO string
  created_at?: string;
  updated_at?: string;
  ai_suggested?: boolean;
};

export type ContextItem = {
  id?: number;
  content: string;
  context_type?: string;
  created_at?: string;
};
export type Category = {
  id?: number;
  name: string;
  color: string;
  created_at?: string;
};