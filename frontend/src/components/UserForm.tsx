import React, { useState } from 'react';
import { createUser } from '../services';
import { useNotify } from './useNotify';

export const UserForm = () => {
  const [name, setName] = useState('');
  const [age, setAge] = useState<number | ''>('');
  const { notifySuccess, notifyError } = useNotify();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await createUser(name, Number(age));
      notifySuccess('Usuário salvo!', `${name} foi cadastrado com sucesso.`);
      setName('');
      setAge('');
    } catch {
      notifyError('Erro ao salvar', 'Não foi possível cadastrar o usuário. Tente novamente.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="app-form">
      <input
        type="text"
        value={name}
        onChange={e => setName(e.target.value.replace(/[0-9]/g, ''))}
        placeholder="Nome do usuário"
        maxLength={200}
        required
      />
      <input
        type="number"
        value={age}
        onChange={e => setAge(Number(e.target.value))}
        placeholder="Idade"
        min="0"
        required
      />
      <button type="submit">Salvar</button>
    </form>
  );
};