import api from './api';
import type { SummaryResponse } from '../types';

export const getSummaryByUser = async (): Promise<SummaryResponse> => {
  const response = await api.get('/summary/users');
  return response.data;
};

export const getSummaryByCategories = async (): Promise<SummaryResponse> => {
  const response = await api.get('/summary/categories');
  return response.data;
};
