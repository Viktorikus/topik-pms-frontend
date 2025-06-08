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
        try {
            const response = await fetch('/api/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
            });
            
            if (!response.ok) throw new Error('Login gagal');
            
            const { token, user } = await response.json(); // Pastikan backend mengembalikan data user
            login(token, user); // Kirim token dan data user
        } catch (error) {
            setError(error instanceof Error ? error.message : 'Login gagal');
        }
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

function setError(arg0: string) {
    throw new Error('Function not implemented.');
}
