import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { Project, ProjectFormData } from '../types/project';
import { getProjects, createProject, updateProject, deleteProject } from '../api/projects';

interface ProjectContextType {
  projects: Project[];
  currentProject: Project | null;
  setCurrentProject: (project: Project | null) => void;
  refreshProjects: () => Promise<void>;
  createNewProject: (data: ProjectFormData) => Promise<Project>;
  updateExistingProject: (id: string, data: Partial<Project>) => Promise<Project>;
  removeProject: (id: string) => Promise<void>;
}

const ProjectContext = createContext<ProjectContextType | null>(null);

export const ProjectProvider = ({ children }: { children: ReactNode }) => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [currentProject, setCurrentProject] = useState<Project | null>(null);

  const refreshProjects = async () => {
    try {
      const data = await getProjects();
      setProjects(data);
    } catch (error) {
      console.error('Gagal memuat proyek:', error);
      setProjects([]);
    }
  };

  const createNewProject = async (data: ProjectFormData) => {
    const newProject = await createProject(data);
    await refreshProjects();
    return newProject;
  };

  const updateExistingProject = async (id: string, data: Partial<Project>) => {
    // Map Partial<Project> to Partial<ProjectFormData> and ensure description is not null
    const mappedData: Partial<ProjectFormData> = {
      ...data,
      description: data.description === null ? undefined : data.description
    };
    const updatedProject = await updateProject(id, mappedData);
    await refreshProjects();
    return updatedProject;
  };

  const removeProject = async (id: string) => {
    await deleteProject(id);
    await refreshProjects();
  };

  useEffect(() => {
    refreshProjects();
  }, []);

  return (
    <ProjectContext.Provider 
      value={{ 
        projects, 
        currentProject, 
        setCurrentProject, 
        refreshProjects,
        createNewProject,
        updateExistingProject,
        removeProject
      }}
    >
      {children}
    </ProjectContext.Provider>
  );
};

export const useProjects = () => {
  const context = useContext(ProjectContext);
  if (!context) {
    throw new Error('useProjects harus digunakan dalam ProjectProvider');
  }
  return context;
};