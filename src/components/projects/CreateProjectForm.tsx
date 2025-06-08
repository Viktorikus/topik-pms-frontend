import { useState } from 'react';
import { ProjectFormData } from '../../types/project';
import Button from '../common/Button';

interface CreateProjectFormProps {
  onSubmit: (data: ProjectFormData) => Promise<void>;
  onSuccess: () => void;
}

const CreateProjectForm = ({ onSubmit, onSuccess }: CreateProjectFormProps) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await onSubmit({ name, description });
      onSuccess();
    } catch (err) {
      setError('Gagal membuat proyek. Silakan coba lagi.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {error && <p className="error">{error}</p>}
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Nama Proyek"
        required
      />
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Deskripsi (opsional)"
      />
      <Button type="submit">Buat Proyek</Button>
    </form>
  );
};

export default CreateProjectForm;