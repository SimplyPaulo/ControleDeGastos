import 'antd/dist/reset.css';
import './Home.css';

import { TransactionForm, PersonForm, CategoryForm, SummaryDashboard, TransactionList } from '../components';
import { Typography } from 'antd';

const { Title } = Typography;

function Home() {
  return (
    <div className="home-container">
      <h1 className="home-header">Sistema de Controle de Gastos</h1>

      <div className="flex-container">
        <div className="flex-column">
          <PersonForm />
          <CategoryForm />
        </div>

        <div className="flex-column form-panel">
          <Title level={3} className="panel-title">Lançar Nova Transação</Title>
          <TransactionForm />
        </div>
      </div>

      <hr className="section-divider" />

      <TransactionList />

      <hr className="section-divider" />

      <div className="reports-section">
        <Title level={2} className="panel-title reports-title">Consultas e Totais</Title>
        <SummaryDashboard />
      </div>

    </div>
  );
}

export default Home;
