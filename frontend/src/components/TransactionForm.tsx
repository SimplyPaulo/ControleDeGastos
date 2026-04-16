import React, { useState, useEffect } from 'react';
import { getUser, getCategories, createTransaction } from '../services';
import type { User, Category, TransactionType } from '../types';
import { useNotify } from './useNotify';

export const TransactionForm = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedUser, setSelectedUser] = useState<number>(0);
  const [type, setType] = useState<TransactionType>(0);
  const [selectedCategory, setSelectedCategory] = useState<number>(0);
  const [amount, setAmount] = useState<number | ''>('');
  const [description, setDescription] = useState('');
  const { notifySuccess, notifyError } = useNotify();

  useEffect(() => {
    getUser().then(setUsers).catch(() => {});
    getCategories().then(setCategories).catch(() => {});
  }, []);

  const user = users.find(p => p.id === selectedUser);
  const isUnderage = user ? user.age < 18 : false;

  useEffect(() => {
    if (isUnderage) setType(0);
  }, [isUnderage]);

  const filteredCategories = categories.filter(c => {
    if (type === 0) return c.purpose === 0 || c.purpose === 2;
    if (type === 1) return c.purpose === 1 || c.purpose === 2;
    return true;
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await createTransaction({
        description,
        amount: Number(amount),
        type,
        categoryId: selectedCategory,
        userId: selectedUser,
      });
      notifySuccess('Transação salva!', 'A transação foi lançada com sucesso.');
      setAmount('');
      setDescription('');
    } catch (error: any) {
      notifyError('Erro ao salvar', error.response?.data || 'Não foi possível salvar a transação.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="app-form">
      <select onChange={e => setSelectedUser(Number(e.target.value))}>
        <option value={0}>Selecione o usuário</option>
        {users.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
      </select>

      <select
        value={type}
        onChange={e => setType(Number(e.target.value) as TransactionType)}
        disabled={isUnderage}
      >
        <option value={0}>Despesa</option>
        {!isUnderage && <option value={1}>Receita</option>}
      </select>

      <select onChange={e => setSelectedCategory(Number(e.target.value))}>
        <option value={0}>Selecione a categoria</option>
        {filteredCategories.map(c => <option key={c.id} value={c.id}>{c.description}</option>)}
      </select>

      <input
        type="number"
        value={amount}
        onChange={e => setAmount(Number(e.target.value))}
        placeholder="Valor"
        min="0.1"
        step="0.1"
        required
      />
      <input
        type="text"
        maxLength={400}
        value={description}
        onChange={e => setDescription(e.target.value)}
        placeholder="Descrição"
        required
      />

      <button type="submit">Salvar Transação</button>
    </form>
  );
};