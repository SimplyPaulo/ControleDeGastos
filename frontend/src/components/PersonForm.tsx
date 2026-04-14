import React, { useState } from 'react';
import api from '../services/api';

export const PersonForm = () => {
  const [name, setName] = useState('');
  const [age, setAge] = useState<number | ''>('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await api.post('/people', { name, age: Number(age) });
      alert('Pessoa salva com sucesso!');
      setName('');
      setAge('');
    } catch {
      alert('Erro ao salvar pessoa');
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px', maxWidth: '400px', marginBottom: '30px' }}>
      <h3>Cadastrar Pessoa</h3>
      {/* maxLength={200} impede o usuário de digitar mais do que o banco suporta */}
      <input type="text" value={name} onChange={e => setName(e.target.value)} placeholder="Nome da pessoa" maxLength={200} required />
      <input type="number" value={age} onChange={e => setAge(Number(e.target.value))} placeholder="Idade" min="0" required />
      <button type="submit">Salvar Pessoa</button>
    </form>
  );
};