// src/types/project.d.ts
interface BaseProject {
  id: string;
  name: string;
  description: string | null; // Konsisten gunakan null untuk nilai kosong
  status: 'active' | 'completed' | 'archived';
  created_at: string;
  updated_at: string;
}

export interface Project extends BaseProject {
  tasks_count?: number;
  members?: Array<{
    id: string;
    name: string;
    role: string;
    pivot: {
      project_id: string;
      user_id: string;
    };
  }>;
}

export interface ProjectFormData {
  name: string;
  description?: string; // Optional untuk form input
  status?: 'active' | 'completed' | 'archived';
}

