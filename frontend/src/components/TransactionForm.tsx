import React, { useState, useEffect } from 'react';
import api from '../services/api';
import type { Person, Category, TransactionType } from '../types';

export const TransactionForm = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  
  const [selectedPerson, setSelectedPerson] = useState<number>(0);
  const [type, setType] = useState<TransactionType>(0);
  const [selectedCategory, setSelectedCategory] = useState<number>(0);
  const [amount, setAmount] = useState<number | ''>('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    api.get('/people').then(res => setPeople(res.data)).catch(() => {});
    api.get('/categories').then(res => setCategories(res.data)).catch(() => {});
  }, []);

  const person = people.find(p => p.id === selectedPerson);
  const isUnderage = person ? person.age < 18 : false;

  useEffect(() => {
    if (isUnderage) {
      setType(0); 
    }
  }, [isUnderage]);

  const filteredCategories = categories.filter(c => {
    if (type === 0) return c.purpose === 0 || c.purpose === 2;
    if (type === 1) return c.purpose === 1 || c.purpose === 2;
    return true;
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await api.post('/transactions', {
        description, 
        amount: Number(amount), 
        type, 
        categoryId: selectedCategory, 
        personId: selectedPerson
      });
      alert('Salvo com sucesso!');
      setAmount('');
      setDescription('');
    } catch (error: any) {
      alert(error.response?.data || 'Erro ao salvar');
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px', maxWidth: '400px' }}>
      <select onChange={e => setSelectedPerson(Number(e.target.value))}>
        <option value={0}>Selecione a pessoa</option>
        {people.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
      </select>

      <select value={type} onChange={e => setType(Number(e.target.value) as TransactionType)} disabled={isUnderage}>
        <option value={0}>Despesa</option>
        {!isUnderage && <option value={1}>Receita</option>}
      </select>

      <select onChange={e => setSelectedCategory(Number(e.target.value))}>
        <option value={0}>Selecione a categoria</option>
        {filteredCategories.map(c => <option key={c.id} value={c.id}>{c.description}</option>)}
      </select>

      <input type="number" value={amount} onChange={e => setAmount(Number(e.target.value))} placeholder="Valor" min="0.01" step="0.01" required />
      <input type="text" maxLength={400} value={description} onChange={e => setDescription(e.target.value)} placeholder="Descrição" required />

      <button type="submit">Salvar Transação</button>
    </form>
  );
};