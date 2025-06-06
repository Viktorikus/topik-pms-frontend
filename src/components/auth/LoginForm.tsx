import { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import Button from '../common/Button';
import styles from '../../styles/auth.module.css';

const LoginForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login } = useAuth();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        // Contoh: Panggil API login
        const response = await fetch('/api/auth/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
        });
        const { token } = await response.json();
        login(token);
    };

    return (
        <form className={styles.authForm} onSubmit={handleSubmit}>
            <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
            />
            <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
            />
            <Button type="submit">Login</Button>
        </form>
    );
}

export default LoginForm;