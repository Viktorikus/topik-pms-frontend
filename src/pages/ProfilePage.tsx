import { useAuth } from '../hooks/useAuth';
import styles from '../styles/profile.module.css';

const ProfilePage = () => {
  const { user, logout } = useAuth();

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.profileContainer}>
      <h2>Profile</h2>
      <div className={styles.profileInfo}>
        <p><strong>Name:</strong> {user.name}</p>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Role:</strong> {user.role}</p>
      </div>
      <button 
        onClick={logout}
        className={styles.logoutButton}
      >
        Logout
      </button>
    </div>
  );
};

export default ProfilePage;