import { Project } from '../../types/project';
import styles from '../../styles/projects.module.css';

const ProjectCard = ({ 
  project,
  onClick
}: { 
  project: Project;
  onClick: () => void;
}) => {
  return (
    <div className={styles.projectCard} onClick={onClick}>
      <h3>{project.name}</h3>
      <p>{project.description || 'No description'}</p>
      <div className={styles.meta}>
        <span>Tasks: {project.tasksCount || 0}</span>
      </div>
    </div>
  );
};

export default ProjectCard;