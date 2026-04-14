import 'antd/dist/reset.css';

import { TransactionForm, PersonForm, CategoryForm, SummaryDashboard, TransactionList } from '../components';
import { Typography } from 'antd';

const { Title } = Typography;

function Home() {
  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif', maxWidth: '1200px', margin: '0 auto' }}>
      <h1 style={{ borderBottom: '2px solid #ccc', paddingBottom: '10px' }}>Sistema de Controle de Gastos</h1>

      {/* Seção de Cadastros */}
      <div style={{ display: 'flex', gap: '40px', flexWrap: 'wrap', marginBottom: '40px' }}>
        <div style={{ flex: 1, minWidth: '300px' }}>
          <PersonForm />
          <hr />
          <CategoryForm />
          <Title> Ant Design</Title>
        </div>

        <div style={{ flex: 1, minWidth: '300px', backgroundColor: '#fafafa', padding: '20px', borderRadius: '8px' }}>
          <Title level={3}>Lançar Nova Transação</Title>
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

export default Home;