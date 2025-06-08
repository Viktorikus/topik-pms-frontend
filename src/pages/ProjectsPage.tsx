import { useState } from 'react';
import { useProjects } from '../contexts/ProjectContext';
import { useNavigate } from 'react-router-dom';
import ProjectCard from '../components/projects/ProjectCard';
import Modal from '../components/common/Modal';
import CreateProjectForm from '../components/projects/CreateProjectForm';
import styles from '../styles/projects.module.css';
import { ProjectFormData } from '../types/project';

const ProjectsPage = () => {
  const { 
    projects, 
    createNewProject,
    refreshProjects 
  } = useProjects();
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  const handleCreateProject = async (formData: ProjectFormData) => {
    try {
      await createNewProject(formData);
      refreshProjects();
      setIsModalOpen(false);
    } catch (error) {
      console.error('Gagal membuat proyek:', error);
    }
  };

  return (
    <div className={styles.projectsPage}>
      <div className={styles.header}>
        <h1>Proyek</h1>
        <button 
          onClick={() => setIsModalOpen(true)}
          className={styles.createButton}
        >
          Buat Proyek Baru
        </button>
      </div>

      <div className={styles.projectsGrid}>
        {projects.map(project => (
          <ProjectCard 
            key={project.id} 
            project={project}
            onClick={() => navigate(`/projects/${project.id}`)}
          />
        ))}
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Buat Proyek Baru"
      >
        <CreateProjectForm 
          onSubmit={handleCreateProject}
          onSuccess={() => {
            refreshProjects();
            setIsModalOpen(false);
          }} 
        />
      </Modal>
    </div>
  );
};

export default ProjectsPage;