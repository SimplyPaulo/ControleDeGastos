import React, { useState } from 'react';
import { createCategory } from '../services';
import type { CategoryPurpose } from '../types';
import { useNotify } from './useNotify';

export const CategoryForm = () => {
  const [description, setDescription] = useState('');
  const [purpose, setPurpose] = useState<CategoryPurpose>(0);
  const { notifySuccess, notifyError } = useNotify();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await createCategory(description, purpose);
      notifySuccess('Categoria salva!', `"${description}" foi cadastrada com sucesso.`);
      setDescription('');
    } catch {
      notifyError('Erro ao salvar', 'Não foi possível cadastrar a categoria. Tente novamente.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="app-form">
      <input
        type="text"
        value={description}
        onChange={e => setDescription(e.target.value)}
        placeholder="Nome da categoria (ex: Alimentação)"
        maxLength={400}
        required
      />
      <select
        value={purpose}
        onChange={e => setPurpose(Number(e.target.value) as CategoryPurpose)}
      >
        <option value={0}>Despesa</option>
        <option value={1}>Receita</option>
        <option value={2}>Ambas</option>
      </select>
      <button type="submit">Salvar</button>
    </form>
  );
};