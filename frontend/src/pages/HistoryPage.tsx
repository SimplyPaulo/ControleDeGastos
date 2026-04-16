import { TransactionList } from '../components/TransactionList';

export const HistoryPage = () => {
  return (
    <div>
      <h2 className="panel-title">Histórico Completo</h2>
      <div className="form-panel">
        <TransactionList />
      </div>
    </div>
  );
};
