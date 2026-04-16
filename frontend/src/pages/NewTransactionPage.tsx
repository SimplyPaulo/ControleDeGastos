import { TransactionForm } from '../components/TransactionForm';

export const NewTransactionPage = () => {
  return (
    <div className="page-container-sm">
      <h2 className="panel-title">Lançar Transação</h2>
      <p className="page-description">Lance um novo débito ou crédito escolhendo o responsável e a categoria.</p>
      <div className="form-panel panel-padded">
        <TransactionForm />
      </div>
    </div>
  );
};
