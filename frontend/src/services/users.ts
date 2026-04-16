import api from './api';

export const createUser = async (name: string, age: number) => {
  const response = await api.post('/users', { name, age: Number(age) });
  return response.data;
};

export const getUser = async () => {
  const response = await api.get('/users');
  return response.data;
};

export const deleteUser = async (id: number) => {
  const response = await api.delete(`/users/${id}`);
  return response.data;
};
