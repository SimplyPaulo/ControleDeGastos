import api from './api';

export const createPerson = async (name: string, age: number) => {
  const response = await api.post('/people', { name, age: Number(age) });
  return response.data;
};

export const getPeople = async () => {
  const response = await api.get('/people');
  return response.data;
};
