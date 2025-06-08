import axios from 'axios';

interface Task {
  id: string;
  title: string;
  description?: string;
  status: 'todo' | 'in_progress' | 'done';
  due_date?: string;
  project_id: string;
  assigned_to?: string;
}

interface Comment {
  id: string;
  content: string;
  attachment_url?: string;
  created_at: string;
}

export const createTask = async (taskData: {
  title: string;
  project_id: string;
  description?: string;
}): Promise<Task> => {
  const response = await axios.post('/api/tasks', taskData);
  return response.data;
};

export const getTasks = async (projectId?: string): Promise<Task[]> => {
  const url = projectId ? `/api/tasks?project_id=${projectId}` : '/api/tasks';
  const response = await axios.get(url);
  return response.data;
};

export const updateTaskStatus = async (
  id: string,
  status: 'todo' | 'in_progress' | 'done'
): Promise<Task> => {
  const response = await axios.patch(`/api/tasks/${id}/status`, { status });
  return response.data;
};

export const deleteTask = async (id: string): Promise<void> => {
  await axios.delete(`/api/tasks/${id}`);
};

// Komentar
export const getComments = async (taskId: string): Promise<Comment[]> => {
  const response = await axios.get(`/api/tasks/${taskId}/comments`);
  return response.data;
};

export const addComment = async (
  taskId: string,
  content: string,
  file?: File
): Promise<Comment> => {
  const formData = new FormData();
  formData.append('content', content);
  if (file) formData.append('attachment', file);

  const response = await axios.post(
    `/api/tasks/${taskId}/comments`,
    formData,
    { headers: { 'Content-Type': 'multipart/form-data' } }
  );
  return response.data;
};