import { useState, useEffect } from 'react';
import { getSummaryByUser, getSummaryByCategories, deleteUser, deleteCategory } from '../services';
import type { SummaryResponse } from '../types';
import { formatCurrency } from './utils';
import { useNotify } from './useNotify';

export const SummaryDashboard = () => {
  const [userSummary, setUserSummary] = useState<SummaryResponse | null>(null);
  const [categorySummary, setCategorySummary] = useState<SummaryResponse | null>(null);
  const { notifySuccess, notifyError, confirmAction } = useNotify();

  useEffect(() => {
    loadSummary();
  }, []);

  const loadSummary = async () => {
    try {
      const [users, categories] = await Promise.all([
        getSummaryByUser(),
        getSummaryByCategories(),
      ]);
      setUserSummary(users);
      setCategorySummary(categories);
    } catch (error) {
      console.error('Erro ao buscar os resumos', error);
    }
  };

  const handleDeleteUser = async (id: number) => {
    const confirmed = await confirmAction(
      'Excluir usuário',
      'Tem certeza que deseja excluir este usuário? Todas as transações associadas a ele também serão removidas do banco de dados.'
    );
    if (!confirmed) return;
    
    try {
      await deleteUser(id);
      notifySuccess('Usuário excluído', 'O usuário e suas respectivas transações foram removidas com sucesso.');
      loadSummary();
    } catch {
      notifyError('Erro!', 'Ocorreu um erro ao excluir o usuário.');
    }
  };

  const handleDeleteCategory = async (id: number) => {
    const confirmed = await confirmAction(
      'Excluir categoria',
      'Tem certeza que deseja excluir esta categoria?'
    );
    if (!confirmed) return;
    
    try {
      await deleteCategory(id);
      notifySuccess('Categoria excluída', 'A categoria foi removida com sucesso.');
      loadSummary();
    } catch (error: any) {
      if (error?.response?.status === 400) {
        notifyError('Ação Negada', 'Esta categoria possui transações vinculadas e não pode ser excluída.');
      } else {
        notifyError('Erro!', 'Ocorreu um erro ao excluir a categoria.');
      }
    }
  };

  const renderTable = (title: string, columnHeader: string, data: SummaryResponse | null, onDelete?: (id: number) => void) => {
    if (!data) return <p>Carregando {title.toLowerCase()}...</p>;

    return (
      <div className="summary-block">
        <h3>{title}</h3>
        <div className="table-wrapper">
          <table className="app-table">
            <thead>
              <tr>
                <th>{columnHeader}</th>
                <th>Total Receitas</th>
                <th>Total Despesas</th>
                <th>Saldo Líquido</th>
                {onDelete && <th>Ações</th>}
              </tr>
            </thead>
            <tbody>
              {data.details.map((item) => (
                <tr key={item.id}>
                  <td>{item.name}</td>
                  <td className="badge-income">{formatCurrency(item.totalIncome)}</td>
                  <td className="badge-expense">{formatCurrency(item.totalExpense)}</td>
                  <td className="summary-balance">{formatCurrency(item.balance)}</td>
                  {onDelete && (
                    <td>
                      <button className="btn-delete" onClick={() => onDelete(item.id)} style={{ padding: '4px 8px', fontSize: '12px' }}>
                        Excluir
                      </button>
                    </td>
                  )}
                </tr>
              ))}
              <tr className="row-total">
                <td>TOTAL GERAL</td>
                <td className="badge-income">{formatCurrency(data.overall.income)}</td>
                <td className="badge-expense">{formatCurrency(data.overall.expense)}</td>
                <td>{formatCurrency(data.overall.balance)}</td>
                {onDelete && <td></td>}
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  return (
    <div>
      <button onClick={loadSummary} className="btn-refresh">
          Atualizar Totais
      </button>
      {renderTable('Totais por usuário', 'Nome do usuário', userSummary, handleDeleteUser)}
      {renderTable('Totais por categoria', 'Descrição da categoria', categorySummary, handleDeleteCategory)}
    </div>
  );
};