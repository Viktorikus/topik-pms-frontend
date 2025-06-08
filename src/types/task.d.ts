interface Task {
  id: string;
  title: string;
  description: string | null;
  status: 'todo' | 'in_progress' | 'done';
  priority: 'low' | 'medium' | 'high';
  due_date: string | null;
  project_id: string;
  created_by: string;
  assigned_to: string | null;
  created_at: string;
  updated_at: string;
  comments_count?: number;
}

interface TaskFormData {
  title: string;
  description?: string;
  status?: Task['status'];
  priority?: Task['priority'];
  due_date?: string | null;
  project_id: string;
  assigned_to?: string | null;
}

interface Comment {
  id: string;
  content: string;
  attachment_url: string | null;
  user: {
    id: string;
    name: string;
    avatar_url: string | null;
  };
  created_at: string;
  updated_at: string;
}

interface TaskStatusUpdate {
  task_id: string;
  status: Task['status'];
}