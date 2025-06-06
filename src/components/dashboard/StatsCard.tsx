import exp from 'constants';
import { useProjects } from '../../hooks/useProjects';
import styles from '../../styles/dashboard.module.css';

const StatsCard = () => {
    const { projects } = useProjects();
    
    // Hitung statistik
    const totalProjects = projects?.length || 0;
    const totalTasks = projects?.reduce((sum, project) => sum + (project.tasks?.length || 0), 0) || 0;
    const completedTasks = projects?.reduce((sum, project) => {
        return sum + (project.tasks?.filter(task => task.status === 'done').length || 0);
    }, 0) || 0;

    return (
        <div className={styles.statsGrid}>
            <div className={styles.statCard}>
                <h4>Total Projects</h4>
                <p>{totalProjects}</p>
            </div>
            <div className={styles.statCard}>
                <h4>Total Tasks</h4>
                <p>{totalTasks}</p>
            </div>
            <div className={styles.statCard}>
                <h4>Completed</h4>
                <p>{completedTasks}</p>
            </div>
            <div className={styles.statCard}>
                <h4>Completion Rate</h4>
                <p>{totalTasks > 0 ? `${Math.round((completedTasks / totalTasks) * 100)}%` : '0%'}</p>
            </div>
        </div>
    );
};

export default StatsCard;