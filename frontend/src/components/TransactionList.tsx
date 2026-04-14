import { useState, useEffect } from 'react';
import api from '../services/api';

// Tipagem para o React saber o que vem do Back-end
interface Transaction {
  id: number;
  description: string;
  amount: number;
  type: number; // 0 = Despesa, 1 = Receita
  person: { name: string };
  category: { description: string };
}

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);
};

export const TransactionList = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  useEffect(() => {
    loadTransactions();
  }, []);

  const loadTransactions = async () => {
    try {
      const response = await api.get('/transactions');
      setTransactions(response.data);
    } catch (error) {
      console.error("Erro ao buscar transações", error);
    }
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm("Tem certeza que deseja excluir esta transação?")) return;

    try {
      await api.delete(`/transactions/${id}`);
      alert("Excluído com sucesso!");
      loadTransactions(); // Recarrega a lista após excluir
    } catch (error) {
      alert("Erro ao excluir");
    }
  };

  return (
    <div style={{ marginTop: '30px' }}>
      <h3>Histórico de Transações</h3>
      <button onClick={loadTransactions} style={{ marginBottom: '10px' }}>🔄 Atualizar Lista</button>
      
      <table border={1} cellPadding={8} style={{ borderCollapse: 'collapse', width: '100%', textAlign: 'left' }}>
        <thead style={{ backgroundColor: '#f2f2f2' }}>
          <tr>
            <th>Descrição</th>
            <th>Pessoa</th>
            <th>Categoria</th>
            <th>Tipo</th>
            <th>Valor</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((t) => (
            <tr key={t.id}>
              <td>{t.description}</td>
              <td>{t.person?.name}</td>
              <td>{t.category?.description}</td>
              <td style={{ color: t.type === 0 ? 'red' : 'green', fontWeight: 'bold' }}>
                {t.type === 0 ? 'Despesa' : 'Receita'}
              </td>
              <td>{formatCurrency(t.amount)}</td>
              <td>
                <button 
                  onClick={() => handleDelete(t.id)} 
                  style={{ backgroundColor: '#ff4d4f', color: 'white', border: 'none', padding: '5px 10px', cursor: 'pointer', borderRadius: '4px' }}
                >
                  Excluir 🗑️
                </button>
              </td>
            </tr>
          ))}
          {transactions.length === 0 && (
            <tr><td colSpan={6} style={{ textAlign: 'center' }}>Nenhuma transação cadastrada.</td></tr>
          )}
        </tbody>
      </table>
    </div>
  );
};