import { UserForm } from '../components/UserForm';

export const UsersPage = () => {
  return (
    <div className="page-container-sm">
      <h2 className="panel-title">Cadastro de Usuários</h2>
      <p className="page-description">Cadastre novos perfis que poderão ser selecionados no login para lançar contas.</p>
      <div className="form-panel panel-padded">
        <UserForm />
      </div>
    </div>
  );
};
