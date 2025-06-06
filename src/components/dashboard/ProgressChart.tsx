import { useEffect, useRef } from 'react';
import { Chart, registerables } from 'chart.js';
import { useProjects } from '../../hooks/useProjects';
import styles from '../../styles/dashboard.module.css';

Chart.register(...registerables);

const ProgressChart = () => {
    const chartRef = useRef<HTMLCanvasElement>(null);
    const { projects } = useProjects(); // Ambil data proyek dari custom hook

    useEffect(() => {
        if (!chartRef.current || !projects) return;

        // Hitung status tugas
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

        const chart = new Chart(chartRef.current, {
            type: 'doughnut',
            data: {
                labels: ['To Do', 'In Progress', 'Done'],
                datasets: [{
                    data: [taskStatus.todo, taskStatus.inProgress, taskStatus.done],
                    backgroundColor: [
                        '#FF6384', // Merah untuk To Do
                        '#36A2EB', // Biru untuk In Progress
                        '#4BC0C0'  // Hijau untuk Done
                    ],
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: { position: 'bottom' },
                    tooltip: { callbacks: { label: (ctx) => `${ctx.label}: ${ctx.raw} tasks` } }
                }
            }
        });

        return () => chart.destroy();
    }, [projects]);

    return (
        <div className={styles.chartContainer}>
            <h3>Task Progress</h3>
            <canvas ref={chartRef} />
        </div>
    );
};

export default ProgressChart;