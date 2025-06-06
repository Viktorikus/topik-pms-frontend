import CommentSection from './CommentSection';
import styles from '../../styles/kanban.module.css';

interface Task {
  id: string;
  title: string;
  status: 'todo' | 'in_progress' | 'done';
}

const TaskCard = ({ task }: { task: Task }) => {
  return (
    <div className={styles.taskCard}>
      <h3>{task.title}</h3>
      <CommentSection taskId={task.id} />
    </div>
  );
};

export default TaskCard;