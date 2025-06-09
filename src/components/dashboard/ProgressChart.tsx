import { useEffect, useRef } from 'react';
import { Chart, registerables } from 'chart.js';
import { useProjects } from '../../hooks/useProjects';
import styles from '../../styles/dashboard.module.css';

Chart.register(...registerables);

const ProgressChart = () => {
    const chartRef = useRef<HTMLCanvasElement>(null);
    const { projects } = useProjects();

    useEffect(() => {
        if (!chartRef.current || !projects) return;

        // Calculate task status
        const taskStatus = {
            todo: 0,
            inProgress: 0,
            done: 0,
        };

        projects.forEach(project => {
            project.tasks?.forEach(task => {
                if (task.status === 'done') taskStatus.done++;
                else if (task.status === 'in_progress') taskStatus.inProgress++;
                else taskStatus.todo++;
            });
        });

        const totalTasks = taskStatus.todo + taskStatus.inProgress + taskStatus.done;

        const chart = new Chart(chartRef.current, {
            type: 'doughnut',
            data: {
                labels: [
                    `To Do (${Math.round((taskStatus.todo / totalTasks) * 100)}%)`, 
                    `In Progress (${Math.round((taskStatus.inProgress / totalTasks) * 100)}%)`, 
                    `Done (${Math.round((taskStatus.done / totalTasks) * 100)}%)`
                ],
                datasets: [{
                    data: [taskStatus.todo, taskStatus.inProgress, taskStatus.done],
                    backgroundColor: [
                        '#EF4444', // Red for To Do
                        '#3B82F6', // Blue for In Progress
                        '#10B981'  // Green for Done
                    ],
                    borderColor: '#ffffff',
                    borderWidth: 2,
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                cutout: '70%',
                plugins: {
                    legend: { 
                        position: 'bottom',
                        labels: {
                            usePointStyle: true,
                            pointStyle: 'circle',
                            padding: 20,
                            font: {
                                family: 'Inter, sans-serif',
                                size: 12
                            }
                        }
                    },
                    tooltip: { 
                        callbacks: { 
                            label: (ctx) => {
                                const value = typeof ctx.raw === 'number' ? ctx.raw : Number(ctx.raw);
                                const percentage = Math.round((value / totalTasks) * 100);
                                return `${ctx.label}: ${value} tasks (${percentage}%)`;
                            } 
                        },
                        displayColors: false,
                        bodyFont: {
                            family: 'Inter, sans-serif',
                            size: 13
                        }
                    }
                },
                layout: {
                    padding: {
                        top: 20,
                        bottom: 20
                    }
                }
            }
        });

        return () => chart.destroy();
    }, [projects]);

    return (
        <div className={styles.chartCard}>
            <div className={styles.chartHeader}>
                <h3 className={styles.chartTitle}>Task Distribution</h3>
                <div className={styles.chartSummary}>
                    <span className={styles.summaryItem}>
                        <span className={styles.summaryDot} style={{backgroundColor: '#EF4444'}}></span>
                        To Do: {projects?.reduce((sum, project) => sum + (project.tasks?.filter(t => !['done', 'in_progress'].includes(t.status)).length || 0), 0)}
                    </span>
                    <span className={styles.summaryItem}>
                        <span className={styles.summaryDot} style={{backgroundColor: '#3B82F6'}}></span>
                        In Progress: {projects?.reduce((sum, project) => sum + (project.tasks?.filter(t => t.status === 'in_progress').length || 0), 0)}
                    </span>
                    <span className={styles.summaryItem}>
                        <span className={styles.summaryDot} style={{backgroundColor: '#10B981'}}></span>
                        Done: {projects?.reduce((sum, project) => sum + (project.tasks?.filter(t => t.status === 'done').length || 0), 0)}
                    </span>
                </div>
            </div>
            <div className={styles.chartWrapper}>
                <canvas ref={chartRef} />
            </div>
        </div>
    );
};

export default ProgressChart;