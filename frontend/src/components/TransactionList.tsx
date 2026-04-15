import { useState, useEffect } from 'react';
import { getTransactions, deleteTransaction } from '../services';
import { useNotify } from './useNotify';
import { formatCurrency } from './utils';

interface Transaction {
  id: number;
  description: string;
  amount: number;
  type: number; // 0 = Despesa, 1 = Receita
  person: { name: string };
  category: { description: string };
}

export const TransactionList = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const { notifySuccess, notifyError, confirmAction } = useNotify();

  useEffect(() => {
    loadTransactions();
  }, []);

  const loadTransactions = async () => {
    try {
      const data = await getTransactions();
      setTransactions(data);
    } catch (error) {
      console.error('Erro ao buscar transações', error);
    }
  };

  const handleDelete = async (id: number) => {
    const confirmed = await confirmAction(
      'Excluir transação',
      'Tem certeza que deseja excluir esta transação? Esta ação não pode ser desfeita.'
    );
    if (!confirmed) return;

    try {
      await deleteTransaction(id);
      notifySuccess('Transação excluída', 'A transação foi removida com sucesso.');
      loadTransactions();
    } catch {
      notifyError('Erro ao excluir', 'Não foi possível excluir a transação. Tente novamente.');
    }
  };

  return (
    <div className="transaction-list">
      <h3>Histórico de Transações</h3>
      <button onClick={loadTransactions} className="btn-refresh">
        Atualizar Lista
      </button>

      <div className="table-wrapper">
        <table className="app-table">
          <thead>
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
                <td>
                  <span className={t.type === 0 ? 'badge-expense' : 'badge-income'}>
                    {t.type === 0 ? 'Despesa' : 'Receita'}
                  </span>
                </td>
                <td>{formatCurrency(t.amount)}</td>
                <td>
                  <button onClick={() => handleDelete(t.id)} className="btn-delete">
                    Excluir
                  </button>
                </td>
              </tr>
            ))}
            {transactions.length === 0 && (
              <tr>
                <td colSpan={6} className="table-empty">
                  Nenhuma transação cadastrada.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};