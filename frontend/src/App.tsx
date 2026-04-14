import { TransactionForm } from './components/TransactionForm';
import { PersonForm } from './components/PersonForm';
import { CategoryForm } from './components/CategoryForm';
import { SummaryDashboard } from './components/SummaryDashboard';
import { TransactionList } from './components/TransactionList';

function App() {
  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif', maxWidth: '1200px', margin: '0 auto' }}>
      <h1 style={{ borderBottom: '2px solid #ccc', paddingBottom: '10px' }}>Sistema de Controle de Gastos</h1>
      
      {/* Seção de Cadastros */}
      <div style={{ display: 'flex', gap: '40px', flexWrap: 'wrap', marginBottom: '40px' }}>
        <div style={{ flex: 1, minWidth: '300px' }}>
          <PersonForm />
          <hr />
          <CategoryForm />
        </div>
        
        <div style={{ flex: 1, minWidth: '300px', backgroundColor: '#fafafa', padding: '20px', borderRadius: '8px' }}>
          <h3 style={{ marginTop: 0 }}>Lançar Nova Transação</h3>
          <TransactionForm />
        </div>
      </div>

      <hr />
      
      <TransactionList />

      <hr />

      {/* Seção de Relatórios / Totais */}
      <div style={{ marginTop: '40px' }}>
        <h2>Consultas e Totais</h2>
        <SummaryDashboard />
      </div>

    </div>
  );
}

export default App;