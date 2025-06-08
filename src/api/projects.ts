import axios from 'axios';
import { Project, ProjectFormData } from '../types/project';

export const createProject = async (projectData: ProjectFormData): Promise<Project> => {
  const response = await axios.post('/api/projects', projectData);
  return response.data;
};

export const getProjects = async (): Promise<Project[]> => {
  const response = await axios.get('/api/projects');
  return response.data;
};

export const updateProject = async (
  id: string,
  projectData: Partial<ProjectFormData>
): Promise<Project> => {
  const response = await axios.put(`/api/projects/${id}`, projectData);
  return response.data;
};

export const deleteProject = async (id: string): Promise<void> => {
  await axios.delete(`/api/projects/${id}`);
};