import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import styles from '../../styles/navbar.module.css';

const Navbar = () => {
  const { token, logout } = useAuth();

  return (
    <nav className={styles.navbar}>
      <div className={styles.logo}>
        <Link to="/">TaskPMS</Link>
      </div>
      <div className={styles.navLinks}>
        {token ? (
          <>
            <Link to="/projects">Projects</Link>
            <Link to="/tasks">Tasks</Link>
            <button onClick={logout} className={styles.logoutButton}>
              Logout
            </button>
          </>
        ) : (
          <Link to="/login">Login</Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;