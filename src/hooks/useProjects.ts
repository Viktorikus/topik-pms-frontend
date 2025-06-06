import { useState, useEffect } from 'react';
import { useAuth } from './useAuth';

interface Project {
    id: string;
    name: string;
    tasks?: {
        id: string;
        title: string;
        status: 'todo' | 'in_progress' | 'done';
    }[];
}

export const useProjects = () => {
    const [projects, setProjects] = useState<Project[]>([]);
    const { token } = useAuth();

    useEffect(() => {
        if (!token) return;

        const fetchProjects = async () => {
            const response = await fetch('/api/projects', {
                headers: { Authorization: `Bearer ${token}` }
            });
            const data = await response.json();
            setProjects(data);
        };

        fetchProjects();
    }, [token]);

    return { projects };
};