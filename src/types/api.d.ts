// Auth
interface AuthResponse {
  token: string;
  user: {
    id: string;
    name: string;
    email: string;
    role: string;
  };
}

// Projects
export interface Project {
  [x: string]: number;
  id: string;
  name: string;
  description?: string;
  created_at: string;
  updated_at: string;
}

// Tasks
interface Task {
  id: string;
  title: string;
  description?: string;
  status: 'todo' | 'in_progress' | 'done';
  due_date?: string;
  project_id: string;
  assigned_to?: string;
}

// Comments
interface Comment {
  id: string;
  content: string;
  attachment_url?: string;
  created_at: string;
  user: {
    id: string;
    name: string;
  };
}
