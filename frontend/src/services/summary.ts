import api from './api';
import type { SummaryResponse } from '../types';

export const getSummaryByPeople = async (): Promise<SummaryResponse> => {
  const response = await api.get('/summary/people');
  return response.data;
};

export const getSummaryByCategories = async (): Promise<SummaryResponse> => {
  const response = await api.get('/summary/categories');
  return response.data;
};
