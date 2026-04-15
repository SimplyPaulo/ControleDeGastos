import { useState, useEffect } from 'react';
import { getSummaryByPeople, getSummaryByCategories } from '../services';
import type { SummaryResponse } from '../types';
import { formatCurrency } from './utils';

export const SummaryDashboard = () => {
  const [peopleSummary, setPeopleSummary] = useState<SummaryResponse | null>(null);
  const [categorySummary, setCategorySummary] = useState<SummaryResponse | null>(null);

  useEffect(() => {
    loadSummary();
  }, []);

  const loadSummary = async () => {
    try {
      const [people, categories] = await Promise.all([
        getSummaryByPeople(),
        getSummaryByCategories(),
      ]);
      setPeopleSummary(people);
      setCategorySummary(categories);
    } catch (error) {
      console.error('Erro ao buscar os resumos', error);
    }
  };

  const renderTable = (title: string, columnHeader: string, data: SummaryResponse | null) => {
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
              </tr>
            </thead>
            <tbody>
              {data.details.map((item) => (
                <tr key={item.id}>
                  <td>{item.name}</td>
                  <td className="badge-income">{formatCurrency(item.totalIncome)}</td>
                  <td className="badge-expense">{formatCurrency(item.totalExpense)}</td>
                  <td className="summary-balance">{formatCurrency(item.balance)}</td>
                </tr>
              ))}
              <tr className="row-total">
                <td>TOTAL GERAL</td>
                <td className="badge-income">{formatCurrency(data.overall.income)}</td>
                <td className="badge-expense">{formatCurrency(data.overall.expense)}</td>
                <td>{formatCurrency(data.overall.balance)}</td>
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
      {renderTable('Totais por Pessoa', 'Nome da Pessoa', peopleSummary)}
      {renderTable('Totais por Categoria', 'Descrição da Categoria', categorySummary)}
    </div>
  );
};