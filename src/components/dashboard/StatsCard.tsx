import { useProjects } from '../../hooks/useProjects';
import styles from '../../styles/dashboard.module.css';

const StatsCard = () => {
    const { projects } = useProjects();
    
    // Calculate statistics
    const totalProjects = projects?.length || 0;
    const totalTasks = projects?.reduce((sum, project) => sum + (project.tasks?.length || 0), 0) || 0;
    const completedTasks = projects?.reduce((sum, project) => {
        return sum + (project.tasks?.filter(task => task.status === 'done').length || 0);
    }, 0) || 0;
    const completionRate = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

    return (
        <div className={styles.statsContainer}>
            <div className={styles.statCard}>
                <div className={styles.statContent}>
                    <h3 className={styles.statTitle}>Total Projects</h3>
                    <p className={styles.statValue}>{totalProjects}</p>
                    <div className={styles.statTrend}>
                        <span className={styles.trendText}>All Projects</span>
                    </div>
                </div>
                <div className={`${styles.statIcon} ${styles.projectsIcon}`}>
                    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M9 5H7C5.89543 5 5 5.89543 5 7V19C5 20.1046 5.89543 21 7 21H17C18.1046 21 19 20.1046 19 19V7C19 5.89543 18.1046 5 17 5H15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M9 5C9 3.89543 9.89543 3 11 3H13C14.1046 3 15 3.89543 15 5V7H9V5Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                </div>
            </div>
            
            <div className={styles.statCard}>
                <div className={styles.statContent}>
                    <h3 className={styles.statTitle}>Total Tasks</h3>
                    <p className={styles.statValue}>{totalTasks}</p>
                    <div className={styles.statTrend}>
                        <span className={styles.trendText}>All Tasks</span>
                    </div>
                </div>
                <div className={`${styles.statIcon} ${styles.tasksIcon}`}>
                    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M9 5H7C5.89543 5 5 5.89543 5 7V19C5 20.1046 5.89543 21 7 21H17C18.1046 21 19 20.1046 19 19V7C19 5.89543 18.1046 5 17 5H15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M12 12H15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M12 16H15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M9 12H9.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M9 16H9.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M9 5C9 3.89543 9.89543 3 11 3H13C14.1046 3 15 3.89543 15 5V7H9V5Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                </div>
            </div>
            
            <div className={styles.statCard}>
                <div className={styles.statContent}>
                    <h3 className={styles.statTitle}>Completed</h3>
                    <p className={styles.statValue}>{completedTasks}</p>
                    <div className={styles.statTrend}>
                        <span className={styles.trendText}>Tasks Done</span>
                    </div>
                </div>
                <div className={`${styles.statIcon} ${styles.completedIcon}`}>
                    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M9 11L12 14L22 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M21 12V19C21 20.1046 20.1046 21 19 21H5C3.89543 21 3 20.1046 3 19V5C3 3.89543 3.89543 3 5 3H16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                </div>
            </div>
            
            <div className={styles.statCard}>
                <div className={styles.statContent}>
                    <h3 className={styles.statTitle}>Completion Rate</h3>
                    <p className={styles.statValue}>{completionRate}%</p>
                    <div className={styles.statTrend}>
                        <span className={styles.trendText}>Overall Progress</span>
                    </div>
                </div>
                <div className={`${styles.statIcon} ${styles.rateIcon}`}>
                    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 2V22M17 5L9.5 16L5 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                </div>
            </div>
        </div>
    );
};

export default StatsCard;