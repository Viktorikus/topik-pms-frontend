import axios from 'axios';

interface AuthResponse {
  token: string;
  user: {
    id: string;
    name: string;
    email: string;
    role: string;
  };
}

export const login = async (email: string, password: string) => {
  const response = await axios.post('/api/auth/login', { email, password });
  
  // Pastikan response mengembalikan data user
  const { token, user } = response.data;
  
  return { token, user };
};

export const register = async (
  name: string,
  email: string,
  password: string,
  role: string
): Promise<AuthResponse> => {
  const response = await axios.post('/api/auth/register', {
    name,
    email,
    password,
    role
  });
  return response.data;
};

export const logout = async (): Promise<void> => {
  await axios.post('/api/auth/logout');
};

export const refreshToken = async (): Promise<{ token: string }> => {
  const response = await axios.post('/api/auth/refresh');
  return response.data;
};