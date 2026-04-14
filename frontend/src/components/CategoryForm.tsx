import React, { useState } from 'react';
import api from '../services/api';
import type { CategoryPurpose } from '../types';

export const CategoryForm = () => {
  const [description, setDescription] = useState('');
  const [purpose, setPurpose] = useState<CategoryPurpose>(0);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) =>  {
    e.preventDefault();
    try {
      await api.post('/categories', { description, purpose });
      alert('Categoria salva com sucesso!');
      setDescription('');
    } catch {
      alert('Erro ao salvar categoria');
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px', maxWidth: '400px', marginBottom: '30px' }}>
      <h3>Cadastrar Categoria</h3>
      {/* maxLength={400} de acordo com a regra de negócio */}
      <input type="text" value={description} onChange={e => setDescription(e.target.value)} placeholder="Nome da categoria (ex: Alimentação)" maxLength={400} required />
      <select value={purpose} onChange={e => setPurpose(Number(e.target.value) as CategoryPurpose)}>
        <option value={0}>Despesa</option>
        <option value={1}>Receita</option>
        <option value={2}>Ambas</option>
      </select>
      <button type="submit">Salvar Categoria</button>
    </form>
  );
};