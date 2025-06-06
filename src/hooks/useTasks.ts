import { useState, useEffect, useCallback } from 'react';
import { useAuth } from './useAuth';

interface Task {
  id: string;
  title: string;
  status: 'todo' | 'in_progress' | 'done';
  dueDate?: string;
}

export const useTasks = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const { token } = useAuth();

  const fetchTasks = useCallback(async () => {
    if (!token) return;
    
    const response = await fetch('/api/tasks', {
      headers: { Authorization: `Bearer ${token}` }
    });
    const data = await response.json();
    setTasks(data);
  }, [token]);

  const updateTaskStatus = async (taskId: string, newStatus: string) => {
    if (!token) return;
    
    await fetch(`/api/tasks/${taskId}/status`, {
      method: 'PATCH',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ status: newStatus }),
    });
    
    fetchTasks(); // Refresh data
  };

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  return { tasks, updateTaskStatus };
};