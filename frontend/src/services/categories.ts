import api from './api';
import type { CategoryPurpose } from '../types';

export const createCategory = async (description: string, purpose: CategoryPurpose) => {
  const response = await api.post('/categories', { description, purpose });
  return response.data;
};

export const getCategories = async () => {
  const response = await api.get('/categories');
  return response.data;
};

export const deleteCategory = async (id: number) => {
  const response = await api.delete(`/categories/${id}`);
  return response.data;
};
