import axios from 'axios';

export const getComments = (taskId: string) => {
  return axios.get(`/api/tasks/${taskId}/comments`);
};

export const addComment = (taskId: string, content: string, attachment?: File) => {
  const formData = new FormData();
  formData.append('content', content);
  if (attachment) formData.append('attachment', attachment);
  
  return axios.post(`/api/tasks/${taskId}/comments`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  });
};