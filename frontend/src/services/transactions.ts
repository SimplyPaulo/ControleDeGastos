import api from './api';
import type { TransactionType } from '../types';

export interface CreateTransactionDTO {
  description: string;
  amount: number;
  type: TransactionType;
  categoryId: number;
  userId: number;
}

export const createTransaction = async (data: CreateTransactionDTO) => {
  const response = await api.post('/transactions', data);
  return response.data;
};

export const getTransactions = async () => {
  const response = await api.get('/transactions');
  return response.data;
};

export const deleteTransaction = async (id: number) => {
  await api.delete(`/transactions/${id}`);
};
