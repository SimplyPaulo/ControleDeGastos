import { useState, useEffect } from 'react';
import api from '../services/api';
import type { SummaryResponse } from '../types';

// Função auxiliar para formatar como Moeda (R$)
const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);
};

export const SummaryDashboard = () => {
  const [peopleSummary, setPeopleSummary] = useState<SummaryResponse | null>(null);
  const [categorySummary, setCategorySummary] = useState<SummaryResponse | null>(null);

  // Busca os dados assim que o componente carrega na tela
  useEffect(() => {
    loadSummary();
  }, []);

  const loadSummary = async () => {
    try {
      const resPeople = await api.get('/summary/people');
      setPeopleSummary(resPeople.data);

      const resCategory = await api.get('/summary/categories');
      setCategorySummary(resCategory.data);
    } catch (error) {
      console.error("Erro ao buscar os resumos", error);
    }
  };

  // Componente usado para renderizar a tabela, reaproveitando código para Pessoa e Categoria
  const renderTable = (title: string, columnHeader: string, data: SummaryResponse | null) => {
    if (!data) return <p>Carregando {title.toLowerCase()}...</p>;

    return (
      <div style={{ marginBottom: '40px' }}>
        <h3>{title}</h3>
        <table border={1} cellPadding={8} style={{ borderCollapse: 'collapse', width: '100%', maxWidth: '800px', textAlign: 'left' }}>
          <thead style={{ backgroundColor: '#f2f2f2' }}>
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
                <td style={{ color: 'green' }}>{formatCurrency(item.totalIncome)}</td>
                <td style={{ color: 'red' }}>{formatCurrency(item.totalExpense)}</td>
                <td style={{ fontWeight: 'bold' }}>{formatCurrency(item.balance)}</td>
              </tr>
            ))}
            {/* Requisito: Exibir o total geral ao final da listagem */}
            <tr style={{ backgroundColor: '#e6f7ff', fontWeight: 'bold' }}>
              <td>TOTAL GERAL</td>
              <td style={{ color: 'green' }}>{formatCurrency(data.overall.income)}</td>
              <td style={{ color: 'red' }}>{formatCurrency(data.overall.expense)}</td>
              <td>{formatCurrency(data.overall.balance)}</td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  };

  return (
    <div>
      <button onClick={loadSummary} style={{ marginBottom: '20px' }}>🔄 Atualizar Totais</button>
      {renderTable('Totais por Pessoa', 'Nome da Pessoa', peopleSummary)}
      {renderTable('Totais por Categoria (Opcional)', 'Descrição da Categoria', categorySummary)}
    </div>
  );
};