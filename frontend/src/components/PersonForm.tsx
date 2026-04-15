import React, { useState } from 'react';
import { createPerson } from '../services';
import { useNotify } from './useNotify';

export const PersonForm = () => {
  const [name, setName] = useState('');
  const [age, setAge] = useState<number | ''>('');
  const { notifySuccess, notifyError } = useNotify();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await createPerson(name, Number(age));
      notifySuccess('Usuário salvo!', `${name} foi cadastrado com sucesso.`);
      setName('');
      setAge('');
    } catch {
      notifyError('Erro ao salvar', 'Não foi possível cadastrar o usuário. Tente novamente.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="app-form">
      <h3>Cadastrar Usuário</h3>
      <input
        type="text"
        value={name}
        onChange={e => setName(e.target.value)}
        placeholder="Nome da pessoa"
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