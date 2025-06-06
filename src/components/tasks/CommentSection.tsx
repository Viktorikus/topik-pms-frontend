import { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import styles from '../../styles/kanban.module.css';

interface Comment {
  id: string;
  content: string;
}

const CommentSection = ({ taskId }: { taskId: string }) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const { token } = useAuth();

  const handleSubmit = async (content: string) => {
    if (!token) return;
    
    // Contoh: Kirim komentar ke API
    await fetch(`/api/tasks/${taskId}/comments`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ content }),
    });
  };

  return (
    <div className={styles.commentSection}>
      {comments.map((comment) => (
        <div key={comment.id} className={styles.comment}>
          <p>{comment.content}</p>
        </div>
      ))}
      <form onSubmit={(e) => {
        e.preventDefault();
        const content = e.currentTarget.content.value;
        handleSubmit(content);
      }}>
        <textarea name="content" placeholder="Add a comment..." />
        <button type="submit">Post</button>
      </form>
    </div>
  );
};

export default CommentSection;